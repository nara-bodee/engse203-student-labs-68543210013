import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * รวมค่าตั้งค่าทั้งหมดไว้ที่เดียว — ที่อื่นห้ามอ่าน process.env ตรง ๆ
 * ทำให้รู้ได้ทันทีว่าแอปนี้ต้องการค่าอะไรบ้าง
 */
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '..');

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',

  port: Number(process.env.PORT ?? 3001),

  corsOrigin:
    process.env.CORS_ORIGIN ?? 'http://localhost:5173',

  dbFile:
    process.env.DB_FILE ??
    path.join(API_ROOT, 'data', 'campus.db'),

  schemaFile:
    path.join(API_ROOT, 'data', 'schema.sql'),

  staticDir:
    process.env.STATIC_DIR ??
    path.join(API_ROOT, '..', 'frontend', 'dist'),
};