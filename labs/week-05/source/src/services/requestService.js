/**
 * requestService.js — ชั้นเข้าถึงข้อมูล
 *
 * กติกาที่ checker ตรวจจริง:
 *   - fetch() ต้องอยู่ในไฟล์นี้เท่านั้น
 *   - หน้าและ component เรียกเฉพาะฟังก์ชันที่ export จากไฟล์นี้
 *
 * TODO ในไฟล์นี้แบ่งเป็น 2 ระยะ
 *   5A-x  ทำในคาบแรก  (อ่านข้อมูล)
 *   5B-x  ทำในคาบสอง  (เขียนข้อมูล)
 * ทำเฉพาะ TODO ของคาบปัจจุบัน อย่าข้ามไปทำของคาบหน้า
 */

// TODO 5B-1: เปิดใช้บรรทัดล่างนี้เมื่อถึงคาบ 5B
// import { clearStoredRequests, readStoredRequests, writeStoredRequests } from './requestStorage.js';

const LAB_DELAY_MS = 420;

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForLabDelay() {
  await delay(globalThis.__ENGSE203_SKIP_DELAY__ ? 0 : LAB_DELAY_MS);
}

async function fetchSeedRequests() {
  const baseUrl = import.meta.env?.BASE_URL ?? '/';
  const response = await fetch(`${baseUrl}data/initialRequests.json`);
  if (!response.ok) throw new Error('ไม่สามารถโหลดข้อมูลตัวอย่างได้');
  return structuredClone(await response.json());
}

export async function getRequests(options = {}) {
  await waitForLabDelay();

  if (options.scenario === 'error') {
    throw new Error('LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ');
  }
  if (options.scenario === 'empty') {
    return [];
  }

  return fetchSeedRequests();
}

export async function getRequestById(requestId) {
  const requests = await getRequests();
  return requests.find((request) => request.id === requestId) ?? null;
}

/* ─────────── คาบ 5B ─────────── */

// async function loadNormalRequests(onRecovery) {
//   throw new Error('TODO 5B-2: loadNormalRequests');
// }

export async function addRequest(requestInput) {
  void requestInput;
  throw new Error('TODO 5B-4: addRequest');
}

export async function deleteRequest(requestId) {
  void requestId;
  throw new Error('TODO 5B-5: deleteRequest');
}

export async function resetRequests() {
  throw new Error('TODO 5B-6: resetRequests');
}
