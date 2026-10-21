# API Test Evidence

คำสั่งที่ใช้ทดสอบ:

```bash
npm test
```

ผลการทดสอบ:

```text
GET /api/requests 200 3.605 ms - 1030

▶ GET /api/requests
  ✔ คืนรายการทั้งหมด พร้อม status 200 (22.5583ms)
✔ GET /api/requests (27.0219ms)

GET /api/requests/REQ-001 200 0.454 ms - 321

▶ GET /api/requests/:id
  ✔ พบคำร้อง → คืน status 200 (6.1694ms)

GET /api/requests/REQ-999 404 0.482 ms - 65
  ✔ ไม่พบคำร้อง → คืน status 404 (7.7757ms)

✔ GET /api/requests/:id (14.3222ms)

POST /api/requests 201 12.971 ms - 331

▶ POST /api/requests
  ✔ ข้อมูลถูกต้อง → คืน status 201 และ status เป็น pending (17.2149ms)

POST /api/requests 400 0.365 ms - 355
  ✔ ข้อมูลไม่ครบ → คืน status 400 (3.8581ms)

✔ POST /api/requests (21.4243ms)

GET /api/requests 200 0.218 ms - 1362

▶ CORS
  ✔ ตอบ origin ที่อนุญาต (4.2369ms)

✔ CORS (4.4958ms)

ℹ tests 6
ℹ suites 4
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 332.1886
```

## สรุปผล

- Automated tests ทั้งหมด: 6 เคส
- ผ่าน: 6 เคส
- ไม่ผ่าน: 0 เคส
- ครอบคลุม GET, POST, 404, validation และ CORS