# AI_USAGE.md

## การใช้ AI ใน LAB Week 11

### ถามอะไร

ใช้ AI ช่วยอธิบายและตรวจแนวทางการทำ LAB Week 11 เช่น

- การตั้งค่า `config.js` และ Environment Variables
- การทำ `/api/health`
- การเพิ่ม `getDbStatus()`
- การตั้งค่า logging และ error handling
- การทำ production mode ให้ Express เสิร์ฟ Frontend และ API ผ่านพอร์ตเดียว
- การตรวจ `.env.production`
- การตรวจ `.gitignore`
- การตรวจ README และ `DATABASE_CHOICES.md`
- การช่วยวิเคราะห์ error ที่เกิดระหว่างรันโปรแกรมและ checker

### ใช้คำตอบส่วนไหน

นำคำอธิบายและตัวอย่างโค้ดจาก AI มาใช้เป็นแนวทางในการแก้ไฟล์ที่เกี่ยวข้อง เช่น

- `api/src/config.js`
- `api/src/routes/healthRoutes.js`
- `api/src/services/requestService.js`
- `api/src/app.js`
- `frontend/.env.production`
- `README.md`
- `DATABASE_CHOICES.md`

รวมถึงใช้ AI ช่วยตรวจผลจาก `check-week11.mjs` และอธิบายสาเหตุของ error ที่พบ

### แก้เองตรงไหน

ตรวจและแก้ไฟล์ในโปรเจกต์ด้วยตัวเองตามโครงสร้างของ LAB และ Guide ของอาจารย์ รันระบบจริงทั้ง Development และ Production และใช้ `check-week11.mjs` ตรวจผลหลังแก้ไข

เมื่อพบว่าคำแนะนำบางส่วนไม่ตรงกับ Guide ของอาจารย์ ได้ตรวจจากเอกสารของอาจารย์แล้วปรับโค้ดให้ตรงกับงาน เช่น การใช้ `config.isProd`, `path`, `existsSync`, `.env.production` และการไม่ทำส่วน Challenge ที่ไม่ได้บังคับ