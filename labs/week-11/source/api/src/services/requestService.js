import { AppError } from '../middleware/errorHandler.js';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Week 10 — เปลี่ยน service จากอ่านไฟล์ JSON เป็นฐานข้อมูล SQLite
 *
 * ตอนนี้ยังเป็นเวอร์ชัน Week 07 (อ่านไฟล์ JSON) อยู่
 * งานของสัปดาห์นี้คือเปลี่ยนให้ใช้ node:sqlite
 *
 * ⚠ กฎเหล็ก: signature ของทุกฟังก์ชันต้องเหมือนเดิมทุกตัว
 *   → controller และ frontend จะได้ไม่ต้องแก้เลย
 */

// ── ของเดิม Week 07 (อ่านไฟล์ JSON) — จะถูกแทนที่ ──
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');

const DB_FILE =
  process.env.DB_FILE ??
  path.join(API_ROOT, 'data', 'campus.db');

const SCHEMA_FILE =
  path.join(API_ROOT, 'data', 'schema.sql');

let db;

export async function loadSeed() {
  /**
   * TODO W10-1 (CP26) · เปิดฐานข้อมูลด้วย node:sqlite
   *   import { DatabaseSync } from 'node:sqlite'
   *   - เปิดไฟล์ campus.db (จากสัปดาห์ที่ 9)
   *   - สั่ง PRAGMA foreign_keys = ON  ⚠ สำคัญมาก
   *   - ถ้ายังไม่มีตาราง ให้สร้างจาก schema.sql
   *
   * TODO W10-2 (CP27) · ⚠ path ต้องอ้างจากตำแหน่งไฟล์นี้ ไม่ใช่จากที่รันคำสั่ง
   *   ใช้ fileURLToPath(import.meta.url) — ไม่งั้น dev กับ checker หาไฟล์คนละที่
   */
  db = new DatabaseSync(DB_FILE);

  db.exec('PRAGMA foreign_keys = ON');

  const ready = db
    .prepare(
      "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'"
    )
    .get().c;

  if (!ready) {
    db.exec(readFileSync(SCHEMA_FILE, 'utf8'));
  }
}

/** สถานะฐานข้อมูล — ใช้โดย health check */
export function getDbStatus() {
  try {
    if (!db) {
      return {
        connected: false,
        reason: 'ยังไม่ได้เปิดฐานข้อมูล',
      };
    }

    const n = db
      .prepare("SELECT COUNT(*) c FROM sqlite_master WHERE type='table'")
      .get().c;

    return {
      connected: true,
      driver: 'sqlite',
      tables: n,
    };
  } catch (e) {
    return {
      connected: false,
      reason: e.message,
    };
  }
}

export function findAll({ status } = {}) {
  /**
   * TODO W10-3 (CP28) · เปลี่ยนเป็น SELECT จากฐานข้อมูล
   *   - ใช้ JOIN กับตาราง users เพื่อคืน requesterName (ไม่ใช่ requester_id)
   *   - ตั้งชื่อคอลัมน์ด้วย AS ให้ตรงกับที่ frontend ใช้
   *   - ถ้ามี status ให้เติม WHERE r.status = ?
   *   คำใบ้: คัดลอก query จาก queries.sql ที่ทำสัปดาห์ที่แล้วมาปรับ
   */
  const baseSql = `
    SELECT
      r.id,
      u.name AS requesterName,
      r.request_type AS requestType,
      r.location,
      r.details,
      r.priority,
      r.status
    FROM requests r
    JOIN users u ON r.requester_id = u.id
  `;

  if (status) {
    return db
      .prepare(`${baseSql} WHERE r.status = ?`)
      .all(status);
  }

  return db.prepare(baseSql).all();
}

export function findById(id) {
  /** TODO W10-4 (CP28) · SELECT ... WHERE r.id = ?  · ไม่พบให้คืน null */
  const row = db
  .prepare(`
    SELECT
      r.id,
      u.name AS requesterName,
      r.request_type AS requestType,
      r.location,
      r.details,
      r.priority,
      r.status
    FROM requests r
    JOIN users u ON r.requester_id = u.id
    WHERE r.id = ?
  `)
  .get(id);

return row ?? null;
}

/** แปลงชื่อผู้แจ้งเป็น id — ถ้ายังไม่มีในระบบก็สร้างให้ */
function resolveUserId(name) {
  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);

  if (found) return found.id;

  const slug = Date.now().toString(36);

  return db
    .prepare(
      'INSERT INTO users (name, department, email) VALUES (?, ?, ?)'
    )
    .run(
      name,
      'ไม่ระบุ',
      `user-${slug}@rmutl.ac.th`
    ).lastInsertRowid;
}

function nextId() {
  const row = db
    .prepare(
      "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
    )
    .get();

  const n = row
    ? Number(String(row.id).replace('REQ-', '')) + 1
    : 1;

  return `REQ-${String(n).padStart(3, '0')}`;
}

function toAppError(err) {
  const message = err.message ?? '';

  if (message.includes('FOREIGN KEY')) {
    return new AppError('อ้างถึงข้อมูลที่ไม่มีอยู่จริง', 400);
  }

  if (message.includes('CHECK')) {
    return new AppError('ค่าที่ส่งมาไม่อยู่ในรายการที่กำหนด', 400);
  }

  if (message.includes('UNIQUE')) {
    return new AppError('ข้อมูลนี้มีอยู่แล้วในระบบ', 409);
  }

  if (message.includes('NOT NULL')) {
    return new AppError('ข้อมูลที่จำเป็นไม่ครบ', 400);
  }

  return err;
}

export function create(input) {
  /**
   * TODO W10-5 (CP29) · INSERT ลงฐานข้อมูล
   *   ⚠ frontend ส่ง requesterName (ชื่อ) มา แต่ตารางเก็บ requester_id (ตัวเลข)
   *   → ต้องหา id ของชื่อนั้นก่อน ถ้ายังไม่มีในระบบให้สร้าง user ใหม่
   *   นี่คือ "หน้าที่ของ service" ที่พูดถึงในบทที่ 9 ของสัปดาห์ที่แล้ว
   */
  const id = nextId();

  try {
    db.prepare(
      `INSERT INTO requests
        (id, requester_id, request_type, location, details, priority)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      resolveUserId(input.requesterName.trim()),
      input.requestType,
      input.location.trim(),
      input.details.trim(),
      input.priority ?? 'normal'
    );
  } catch (err) {
    throw toAppError(err);
  }

  return findById(id);
}

export function updateStatus(id, status) {
  /** TODO W10-6 (CP30) · UPDATE requests SET status = ? WHERE id = ? · ไม่พบคืน null */
  try {
    const result = db
      .prepare('UPDATE requests SET status = ? WHERE id = ?')
      .run(status, id);

    if (result.changes === 0) {
      return null;
    }

    return findById(id);
  } catch (err) {
    throw toAppError(err);
  }
}

export function remove(id) {
  /** TODO W10-7 (CP30) · DELETE FROM requests WHERE id = ? · ไม่พบคืน null */
  const found = findById(id);

  if (!found) {
    return null;
  }

  db.prepare('DELETE FROM requests WHERE id = ?').run(id);

  return found;
}
