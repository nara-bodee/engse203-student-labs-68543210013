# AI Usage — LAB07 REST Validation

## ข้อมูลผู้จัดทำ

- ชื่อ: นรบดี บุญเลิศ
- รหัสนักศึกษา: 68543210013-7
- รายวิชา: ENGSE203
- Lab: Week 07 — REST Validation

---

## เครื่องมือ AI ที่ใช้

ใช้ ChatGPT เพื่อช่วยอธิบายแนวคิด ตรวจสอบโค้ด และให้คำแนะนำระหว่างการทำ LAB07

ผู้จัดทำเป็นผู้แก้ไขไฟล์ รันโปรแกรม ทดสอบระบบ และตรวจสอบผลลัพธ์ด้วยตนเอง

---

## สิ่งที่ถาม AI

### 1. CORS และ Environment Configuration

ถามเกี่ยวกับ:
- สาเหตุของ CORS error
- การใช้ `cors` middleware
- การใช้ `PORT`, `CORS_ORIGIN` และ `NODE_ENV`
- การอ่านค่าจาก environment ผ่าน `config.js`

นำคำแนะนำไปใช้กับ:
- `api/src/config.js`
- `api/src/app.js`
- `api/src/server.js`

ตรวจสอบผลจริงผ่าน Browser DevTools และ `check-week07.mjs`

### 2. API Client และ Request Service

ถามเกี่ยวกับ:
- `apiFetch()`
- `fetch()`
- `try/catch`
- `response.ok`
- `ApiError`
- `JSON.stringify()`
- `encodeURIComponent()`
- การจัดการ `404`
- GET, POST, PUT และ DELETE

นำคำแนะนำไปใช้กับ:
- `frontend/src/services/apiClient.js`
- `frontend/src/services/requestService.js`

### 3. Loading และ Error State

ถามเกี่ยวกับการจัดการ loading และ error state ใน React

ผู้จัดทำทดสอบโดยเปิด Frontend พร้อม API จากนั้นปิด API และ Refresh หน้า Dashboard เพื่อตรวจสอบว่าแอปแสดงข้อความ error ได้ถูกต้อง

### 4. PUT เปลี่ยนสถานะ

ใช้ AI ช่วยอธิบายการสร้าง `updateRequestStatus()` เพื่อส่ง HTTP PUT และส่ง `status` เป็น JSON ไปยัง API

ผู้จัดทำทดสอบทั้งกรณีเปลี่ยนสถานะสำเร็จและ status ไม่ถูกต้อง และตรวจสอบด้วย `check-week07.mjs`

### 5. Morgan และ Error Handling

ถามเกี่ยวกับ:
- การใช้ `morgan`
- ความแตกต่างของ log ระหว่าง development และ production
- การซ่อน stack trace เมื่อ `NODE_ENV=production`

นำคำแนะนำไปใช้กับ `api/src/app.js` และ `api/src/middleware/errorHandler.js`

### 6. API Contract

ใช้ AI ช่วยตรวจสอบและกรอก `API_CONTRACT.md` โดยยังคงรูปแบบของ template เดิม

ส่วนที่ใช้คำแนะนำจาก AI ได้แก่:
- ภาพรวมระบบ
- PUT endpoint
- DELETE endpoint
- status code
- รูปแบบ error
- การตรวจความครบถ้วนของเอกสาร

ผู้จัดทำตรวจสอบเอกสารเทียบกับพฤติกรรมของ API และ checker

### 7. Automated Test

ใช้ AI ช่วยแนะนำการเขียน test ตามโครงสร้าง starter โดยใช้:
- `describe()`
- `test()`
- `request(app)`
- `assert`

เขียนทั้งหมด 6 test ครอบคลุม:
1. GET รายการทั้งหมด
2. GET ID ที่มีอยู่
3. GET ID ที่ไม่มี
4. POST ข้อมูลถูกต้อง
5. POST ข้อมูลไม่ครบ
6. CORS header

ผู้จัดทำรัน `npm test` ด้วยตนเอง

ผลที่ได้:
- tests: 6
- pass: 6
- fail: 0

### 8. Evidence

ใช้ AI ช่วยตรวจสอบ screenshot และ `API_TEST.md`

ผู้จัดทำเป็นผู้เปิด DevTools ถ่ายภาพ และตรวจสอบผลจริงจากระบบ

---

## สิ่งที่ผู้จัดทำทำและตรวจสอบเอง

ผู้จัดทำเป็นผู้:
- แก้ไข source code ในโปรเจกต์
- เปิด API และ Frontend
- ทดสอบหน้าเว็บ
- ตรวจสอบ Network และ CORS ผ่าน DevTools
- ทดสอบ PUT และ Error State
- รัน `npm test`
- รัน `node check-week07.mjs`
- ถ่าย screenshot หลักฐาน
- ตรวจสอบเอกสารก่อนส่ง
- จัดการ Git, commit และ push

---

## การตรวจสอบผลจาก AI

ไม่ได้ใช้คำตอบจาก AI โดยไม่ตรวจสอบ

คำแนะนำที่นำมาใช้ถูกตรวจสอบจากผลการรันจริง ได้แก่:

- `node check-week07.mjs`
- `npm test`
- HTTP status code
- Browser DevTools
- Network Response Headers
- การใช้งานเว็บจริง

ผลสุดท้ายของ LAB07:

- In-Class CP09–CP12: ผ่าน 25/25
- Take-Home CP13–CP16: ผ่าน 8/8
- Automated Test: ผ่าน 6/6