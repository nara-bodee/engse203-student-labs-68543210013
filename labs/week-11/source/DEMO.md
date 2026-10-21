# หลักฐานการสาธิต (A4)

## ช่วง A — สาธิตระบบ

ลิงก์วิดีโอ: https://livermutlac-my.sharepoint.com/:v:/g/personal/narabodee_live_rmutl_ac_th/IQBHvYk89D1zQryTojYuKVoJAV2D1H-qXXrjCxqqaeOJNPE?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=B7AdPK

- [x] เปิดระบบครบ 3 ชั้น
- [x] แสดงรายการคำร้อง
- [x] เพิ่มคำร้อง
- [x] เปลี่ยนสถานะคำร้อง
- [x] ลบคำร้อง
- [x] ตรวจ GET /api/health
- [x] ปิดและเปิด Server ใหม่ แล้วข้อมูลยังอยู่
- [x] ทดสอบ Production แบบพอร์ตเดียว

## ช่วง B — อธิบาย Source Code

ลิงก์วิดีโอ: https://livermutlac-my.sharepoint.com/:v:/g/personal/narabodee_live_rmutl_ac_th/IQDuzN1zs1OVQ59ieoFMsB9cAe6M08cVOw24grbCibiSXbI?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=GEuC5P

- [x] อธิบาย Frontend เรียก API
- [x] อธิบายการทำงาน Route → Controller → Service
- [x] อธิบาย Service ติดต่อ SQLite
- [x] อธิบาย config และ Environment Variables
- [x] อธิบาย Health Check
- [x] อธิบาย Development กับ Production ต่างกันอย่างไร

## หมายเหตุ

Frontend ใช้ React + Vite
Backend ใช้ Node.js + Express
Database ใช้ SQLite

## Live Demo — Render (Challenge)

URL: https://campus-service-68543210013.onrender.com/

- [x] Deploy ระบบขึ้น Render
- [x] Frontend ตอบ HTTP 200
- [x] GET /api/health ตอบ 200
- [x] Environment เป็น production
- [x] SQLite เชื่อมต่อสำเร็จ
- [x] GET /api/requests ตอบ 200