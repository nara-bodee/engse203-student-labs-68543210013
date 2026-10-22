import { describe, test, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../../src/utils/password.js';

// hash ของ "staff1234" ที่อยู่ใน schema.sql — โค้ดเราต้องตรวจ hash นี้ผ่าน
const SEED_HASH = 'scrypt$5e1f0c3a9b7d2e4f6a8c0b1d3e5f7a9c$2f81bcd58254b475f16ddaf1e278338fa0990ed132f8b206d0a88cb4108b6b4f90df05c0d97166e2a108ab36bf3d81f7884165fff13d4ec42a67cfa36771bc38';

describe('hashPassword', () => {
  test('รูปแบบ scrypt$salt$hash', () => {
    expect(hashPassword('secret-1')).toMatch(/^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);
  });
  test('รหัสผ่านเดียวกัน hash 2 ครั้ง ได้ไม่เหมือนกัน (salt สุ่ม)', () => {
    expect(hashPassword('secret-1')).not.toBe(hashPassword('secret-1'));
  });
  test('hash ไม่มีรหัสผ่านตัวจริงปนอยู่', () => {
    expect(hashPassword('secret-1')).not.toContain('secret-1');
  });
});

describe('verifyPassword', () => {
  test('รหัสผ่านถูก → true', () => {
    expect(verifyPassword('secret-1', hashPassword('secret-1'))).toBe(true);
  });
  test('รหัสผ่านผิด → false', () => {
    expect(verifyPassword('secret-2', hashPassword('secret-1'))).toBe(false);
  });
  test('ตรวจ hash ของบัญชีเจ้าหน้าที่ใน schema.sql ได้', () => {
    expect(verifyPassword('staff1234', SEED_HASH)).toBe(true);
  });
  test.each([undefined, '', 'plain-text', 'md5$abc$def'])('hash ผิดรูปแบบ %j → false (ไม่พัง)', (stored) => {
    expect(verifyPassword('staff1234', stored)).toBe(false);
  });
});

describe('verifyPassword — malformed hash regression', () => {
  const [, salt, hash] = SEED_HASH.split('$');

  test.each([
    ['กรณีเดิม: Hex ใช้ไม่ได้', 'scrypt$abc$zz'],
    ['กรณีเดิม: Hex ไม่ครบ byte', 'scrypt$abc$0'],
    ['hash มีอักขระที่ไม่ใช่ Hex', `scrypt$${salt}$${'z'.repeat(128)}`],
    ['hash มีจำนวนตัวอักษรเป็นเลขคี่', `scrypt$${salt}$${hash.slice(0, -1)}`],
    ['hash สั้นกว่า 128 ตัวอักษร', `scrypt$${salt}$${hash.slice(0, -2)}`],
    ['hash ยาวกว่า 128 ตัวอักษร', `scrypt$${salt}$${hash}00`],
    ['hash มี newline ต่อท้าย', `scrypt$${salt}$${hash}\n`],
    ['salt มีอักขระที่ไม่ใช่ Hex', `scrypt$${'z'.repeat(32)}$${hash}`],
    ['salt สั้นกว่า 32 ตัวอักษร', `scrypt$${salt.slice(0, -1)}$${hash}`],
    ['salt ยาวกว่า 32 ตัวอักษร', `scrypt$${salt}00$${hash}`],
    ['scheme ไม่ใช่ scrypt', `sha256$${salt}$${hash}`],
    ['จำนวนส่วนขาดไปหนึ่งส่วน', `scrypt$${salt}`],
    ['ไม่มี salt', `scrypt$$${hash}`],
    ['ไม่มี hash', `scrypt$${salt}$`],
    ['มีส่วนเกินหลัง hash', `${SEED_HASH}$extra`],
  ])('%s → false โดยไม่โยน error', (_name, stored) => {
    expect(verifyPassword('staff1234', stored)).toBe(false);
  });
});
