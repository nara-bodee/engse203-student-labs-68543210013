# ENGSE203 LAB10 — Node + SQLite (CP26–CP34)

นรบดี บุญเลิศ · 68543210013-7

React → HTTP → Express Route/Controller → requestService → SQLite Service ใช้ JOIN เพื่อส่ง `requesterName` และชื่อ field แบบ API เดิม ใช้ parameterized query แทนต่อ SQL จาก input POST สร้าง user อัตโนมัติหากยังไม่มีชื่อ ดู [API_CONTRACT.md](API_CONTRACT.md)

## ติดตั้งและรัน

ใช้ Node >=22.12.0 จาก `labs/week-10/source/`:

```powershell
npm ci --prefix api
npm ci --prefix frontend
# Terminal 1: API
npm start --prefix api
# Terminal 2
npm run dev --prefix frontend
```

API เริ่มที่ 3001; Frontend 5173 ปรับด้วย `PORT`, `CORS_ORIGIN`, `NODE_ENV` และ `VITE_API_BASE_URL` ตาม `.env.example` Service อ้าง DB จากตำแหน่ง source และเปลี่ยนที่เก็บได้ด้วย `DB_FILE` ไม่ต้อง reset ฐานข้อมูลที่มีอยู่

## ทดสอบโดยไม่เปลี่ยน DB จริง

```powershell
$env:DB_FILE = ':memory:'
npm test --prefix api
npm test --prefix api
node --disable-warning=ExperimentalWarning check-week10.mjs
node --disable-warning=ExperimentalWarning check-week07.mjs
npm run build --prefix frontend
Remove-Item Env:DB_FILE
```

R1: API 7/7 ทั้งสองรอบ, Week10 20/20 In-Class + 8/8 Take-Home = 28/28 required (Challenge 0/3), Week07 regression 36/36, frontend build ผ่าน SQL injection case ผ่าน

**MISSING ใน submission:** `frontend/.env.example` มีในเครื่องแต่ถูก ignore และไม่ได้ Git-track แม้ `api/.env.example` track แล้ว ส่วนที่ใช้ค่า default ยังทำงานได้ แต่ไฟล์ตั้งค่าตัวอย่างไม่ครบ Starter ต้องพิจารณาใน R2; R1 ไม่เปลี่ยน `.gitignore` หรือ config templates

Frontend `npm run check` ยังเป็น LAB05 checker และได้ 116/136 เพราะคาดหวัง localStorage/Node import ของโค้ดก่อนย้ายไป API เป็นผลที่ไม่ผ่านจริงของคำสั่งนั้น ไม่ได้แก้ checker หรือทำให้ผลดูผ่าน ข้อบังคับ Week10 ใช้ checker ประจำ Week10/Week07 และ tests ฐานข้อมูลข้างต้น

HTTP: GET/PUT 200, POST 201, DELETE 204, validation/constraint ที่แปลเป็นข้อผิดพลาดผู้ใช้ 400 และไม่พบ resource 404

## Evidence / Submission / AI

- [Security Tests](../evidence/SECURITY_TEST.md), [AI_USAGE.md](AI_USAGE.md), [API Contract](API_CONTRACT.md)
- [Pages Evidence Report](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-10/) ไม่ใช่ API hosting
- [Merged PR #13](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/13), tag เดิม `lab-10-submission-v1`
- [Instructor LAB10](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-10-node-database)
- Codex ช่วย audit, รัน tests/checkers/build และเติม README ที่ขาดใน R1 โดยไม่เปลี่ยน implementation อ่าน AI disclosure เดิมประกอบ

## R2 — คืน Template และทดสอบซ้ำ

คืน `frontend/.env.example` ตรง Git blob ของ Instructor Starter commit `3e080d3` แล้ว แต่ยัง ignored/untracked ต้อง force-add เฉพาะ path นี้เมื่อได้รับอนุญาตใน Phase ถัดไป ไม่แก้ `.gitignore` หรือใช้ค่าจาก `.env` จริง

บนสำเนาที่ติดตั้ง dependencies ใหม่จาก lockfile: API 7/7, required 28/28 (In-Class 20/20 + Take-Home 8/8), optional 0/3, Week07 regression 36/36 และ frontend build ผ่าน โดยใช้ฐานข้อมูลในหน่วยความจำสำหรับ tests/checkers Source, tests และฐานข้อมูลต้นฉบับไม่เปลี่ยน

ทดลอง development ที่พอร์ต API 3001 และ Frontend 5173 โดย copy `.env`/`.env.local` จาก templates บนสำเนา เปิด Browser เห็นคำร้อง 8 รายการและ CORS ตรง origin สำเนานี้ติดตั้งใหม่ด้วย lockfile ไม่อาศัย node_modules หรือ secret files ของ Working Tree เดิม
