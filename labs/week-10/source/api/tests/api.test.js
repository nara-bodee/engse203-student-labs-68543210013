import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => { await loadSeed(); app = createApp(); });

/**
 * TODO W10-TEST (🏠 CP33) · เขียน test อย่างน้อย 6 เคส ที่ยิงเข้าฐานข้อมูลจริง
 *   1. GET /api/requests → 200 และได้ array
 *   2. คืน requesterName ไม่ใช่ requester_id
 *   3. GET /:id พบ → 200 · ไม่พบ → 404
 *   4. POST ถูกต้อง → 201
 *   5. POST ไม่ครบ → 400
 *   6. ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
 */
describe('GET /api/requests', () => {
  test('คืน array พร้อม status 200', async () => {
    const r = await request(app).get('/api/requests');

    assert.equal(r.status, 200);
    assert.ok(Array.isArray(r.body));
  });

  test('คืน requesterName ไม่ใช่ requester_id', async () => {
    const r = await request(app).get('/api/requests');

    assert.equal(r.status, 200);
    assert.ok(r.body.length > 0);
    assert.ok('requesterName' in r.body[0]);
    assert.ok(!('requester_id' in r.body[0]));
  });

  test('SQL injection ผ่าน status ไม่หลุด', async () => {
    const r = await request(app)
      .get('/api/requests')
      .query({ status: "x' OR '1'='1" });

    assert.equal(r.status, 200);
    assert.equal(r.body.length, 0);
  });
});

describe('GET /api/requests/:id', () => {
  test('id ที่มีจริงคืน 200', async () => {
    const list = await request(app).get('/api/requests');
    const id = list.body[0].id;

    const r = await request(app).get(`/api/requests/${id}`);

    assert.equal(r.status, 200);
    assert.equal(r.body.id, id);
  });

  test('id ที่ไม่มีคืน 404', async () => {
    const r = await request(app).get('/api/requests/REQ-NOT-FOUND');

    assert.equal(r.status, 404);
  });
});

describe('POST /api/requests', () => {
  test('ข้อมูลถูกต้องสร้างคำร้องและคืน 201', async () => {
    // ใช้ชื่อผู้ใช้ที่มีอยู่แล้ว เพื่อไม่สร้าง user ขยะจาก test
    const list = await request(app).get('/api/requests');
    const requesterName = list.body[0].requesterName;

    const r = await request(app)
      .post('/api/requests')
      .send({
        requesterName,
        requestType: 'อื่น ๆ',
        location: 'ห้องทดสอบ',
        details: 'ทดสอบการสร้างคำร้องผ่าน supertest',
        priority: 'normal',
      });

    assert.equal(r.status, 201);
    assert.ok(r.body.id);
    assert.equal(r.body.requesterName, requesterName);

    // ลบข้อมูลที่ test สร้าง เพื่อให้รันซ้ำได้โดยไม่สะสมข้อมูล
    const deleted = await request(app)
      .delete(`/api/requests/${r.body.id}`);

    assert.equal(deleted.status, 204);
  });

  test('ข้อมูลไม่ครบคืน 400', async () => {
    const r = await request(app)
      .post('/api/requests')
      .send({
        requesterName: 'มีน',
      });

    assert.equal(r.status, 400);
  });
});
