# Security Test — SQL Injection

## 1. เงื่อนไขที่เป็นจริงเสมอ

Request:

`GET /api/requests?status=x' OR '1'='1`

ผลที่ได้:

`[]`

สรุป: ไม่สามารถดึงข้อมูลทั้งหมดออกมาได้ เพราะ query ใช้ parameterized query ด้วย `?`

---

## 2. พยายามลบตาราง requests

Request:

`GET /api/requests?status='; DROP TABLE requests; --`

ผลที่ได้:

`[]`

หลังจากทดสอบแล้ว `GET /api/requests` ยังสามารถเรียกข้อมูลได้ตามปกติ แสดงว่าตาราง `requests` ยังอยู่

---

## 3. พยายามต่อเงื่อนไข status

Request:

`GET /api/requests?status=pending' OR status='completed`

ผลที่ได้:

`[]`

สรุป: ค่าจากผู้ใช้ถูกมองเป็นข้อมูล ไม่ได้ถูกนำไปต่อเป็นคำสั่ง SQL