# ENGSE203 LAB06 — Express API

ผู้จัดทำ: นรบดี บุญเลิศ · 68543210013-7

Source หลักอยู่ใน `labs/week-06/src/` และ `package.json`, `scripts/`, `data/` อยู่ที่ `labs/week-06/` ตรงกับโครงสร้างใน Take-Home Guide ของอาจารย์ ไม่ต้องย้าย source เข้าโฟลเดอร์นี้

## วิธีรันจาก Student Repository root

```powershell
npm ci --prefix labs/week-06
npm run start --prefix labs/week-06
```

API ใช้พอร์ตจาก `PORT` หรือค่าเริ่มต้น 3001 ดู [server.js](../src/server.js) เส้นทางหลักคือ `GET/POST /api/requests`, `GET/DELETE /api/requests/:id` และ `PUT /api/requests/:id` สำหรับเปลี่ยนสถานะ

คำสั่งตรวจตามอาจารย์:

```powershell
npm run check --prefix labs/week-06 -- --inclass
npm run check --prefix labs/week-06
```

Service บันทึกการเพิ่ม/ลบลง `data/requests.json` ดังนั้น checker อาจเปลี่ยนไฟล์นี้ รอบ R1 จึงคัดลอกไฟล์ LAB ไป directory ชั่วคราว ติดตั้งตาม lockfile และรัน checker บนสำเนา ได้ In-Class 23/23, Take-Home 2/2, Challenge 3/3 รวม 28/28 โดยไม่รันทับข้อมูลต้นฉบับ

## การไหลของข้อมูล

Client ส่ง HTTP ไป Route → Controller อ่าน parameter/body → Service ตรวจข้อมูลและจัดการรายการ → Controller ส่ง JSON/status กลับ เช่น GET 200, POST 201, DELETE 204, validation 400 และไม่พบรายการ 404 `logger` เป็น middleware ก่อน routes ไม่ต้องมี Frontend สำหรับทดสอบ LAB นี้

## Evidence และ AI Disclosure

- [API_TEST.md](../evidence/API_TEST.md)
- [Postman Collection](../evidence/Campus_Service_API.postman_collection.json)
- [GET 200](../evidence/images/postman-get-200.png)
- [POST 201](../evidence/images/postman-post-201.png)
- [Terminal Logger](../evidence/images/terminal-logger.png)
- [AI_USAGE.md](../AI_USAGE.md)

## References

- [Instructor Take-Home Guide](https://github.com/se-rmutl/engse203-lab/blob/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-06-express-api-foundation/lab06/LAB06_TAKEHOME_GUIDE_TH.md)
- R1 ใช้ Codex ตรวจโครงสร้าง รัน checker บนสำเนา แก้ชื่อ `README,md` และอธิบายคำสั่งตามโครงสร้างเดิม ไม่เปลี่ยน API logic
