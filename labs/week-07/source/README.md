# ENGSE203 LAB07 — REST API & Validation (CP09–CP16)

นรบดี บุญเลิศ · 68543210013-7

React เรียก Express ผ่าน HTTP/CORS โดย `apiClient.js` อ่าน `VITE_API_BASE_URL` แล้ว Service ส่ง GET/POST/PUT/DELETE ไปยัง API Route → Controller → Service ข้อมูล Week 07 อยู่ในหน่วยความจำและโหลด seed เมื่อเริ่ม server ใหม่ ไม่มี SQLite ใน LAB นี้

## ติดตั้งและรัน

ใช้ Node >=22.12.0 จาก `labs/week-07/source/`:

```powershell
npm ci --prefix api
npm ci --prefix frontend
# Terminal 1
npm start --prefix api
# Terminal 2 (จาก directory เดียวกัน)
npm run dev --prefix frontend
```

ค่าเริ่มต้น API=`http://localhost:3001`, Frontend=`http://localhost:5173` ปรับ API ด้วย `PORT`, `CORS_ORIGIN`, `NODE_ENV`; Frontend ด้วย `VITE_API_BASE_URL` ใน environment ของ Vite ดูตัวอย่าง `api/.env.example`, `frontend/.env.example` ห้าม commit `.env` ที่มีค่าลับ

## ตรวจตามข้อกำหนด

```powershell
npm test --prefix api
node check-week07.mjs --inclass
node check-week07.mjs
npm run build --prefix frontend
```

R1: API 6/6; In-Class 25/25, Take-Home 8/8, Optional Challenge 1/3 รวม 34/36; build ผ่าน สิ่งที่ยังไม่ได้ทำคือ optional `AppError` และ `asyncHandler`

ตรวจ Browser จริงที่ `localhost:5187` คู่กับ API 3001 และ CORS origin ตรงกัน โหลดคำร้อง 3 รายการได้ เมื่อหยุด API แล้ว reload เห็นข้อความติดต่อเซิร์ฟเวอร์ไม่ได้ ไม่มีการแก้ logic ภาพ Terminal API ที่รายการตรวจ R1 ขอเพิ่มยัง **MISSING**; ภาพ 3 รายการของ Take-Home Guide (Network/CORS, app, error) มีอยู่แล้ว

Checker ใน repo เป็นรุ่นก่อนที่อาจารย์เพิ่ม fallback ให้หา supertest จาก `api/node_modules` ได้ด้วย กฎ checkpoint ไม่ต่างกัน R1 ทดลอง checker รุ่นปัจจุบันบนสำเนาเฉพาะไฟล์ Git + README รอบ R1 ได้ **33/36** (In-Class 24/25, Take-Home 8/8, Challenge 1/3) ขาด `api/.env.example` ส่วนผล 34/36 ด้านบนเป็นการรันบนเครื่องเดิมที่มีไฟล์นี้อยู่แล้ว

**MISSING ใน submission:** `api/.env.example` และ `frontend/.env.example` อยู่ในเครื่องแต่ไม่ได้ Git-track เพราะ root `.gitignore` มี `**/.env.*` จึงยังไม่รับรองว่า fresh clone ครบตาม guide แม้โปรแกรมใช้ค่า default แล้วทำงานได้ R1 ไม่เปลี่ยน `.gitignore` หรือ config templates และไม่เปลี่ยน checker ต้องพิจารณาแยกใน R2

`npm run check --prefix frontend` ยังเป็น LAB05 checker ที่คาดหวัง localStorage และ Node import โดยไม่มี Vite env จึงได้ 116/136 / exit 1 และอ่าน `VITE_API_BASE_URL` ไม่ได้ ไม่ใช้ผลนี้อ้างว่า CP09–CP16 ล้มเหลว และไม่ได้แก้ checker เพื่อให้ผ่าน

การตอบ HTTP: GET/PUT 200, POST 201, DELETE 204, input ผิด 400, resource ไม่พบ 404 API client แปลง network failure เป็น `ApiError` status 0 ให้ UI แสดงข้อความแทนหน้าขาว

## เอกสารและหลักฐาน

- [API Contract](API_CONTRACT.md), [API test results](../evidence/API_TEST.md), [AI Usage เดิม](AI_USAGE.md)
- ภาพ Network/CORS, app-with-api และ error-state ใน [evidence](../evidence/)
- [Pages Evidence Report](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-07/) เป็นหน้ารายงาน ไม่ใช่ Express deployment
- [Merged PR #11](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/11), tag เดิม `lab-07-submission-v1`

## References & AI Assistance

- [Instructor LAB07](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-07-rest-validation)
- Codex ช่วย audit, รัน tests/checkers/build และเติม README ที่ขาดใน R1 ไม่เปลี่ยน API หรือ Frontend logic; อ่าน disclosure เดิมใน AI_USAGE.md ประกอบ

## R2 — Templates และ Fresh-copy Verification

คืน `api/.env.example` และ `frontend/.env.example` จาก Starter commit `3e080d366483fe9b4a903d9f4dd318b5de4cd5dd` และเทียบ Git blob hash ตรงทั้งสองไฟล์ ไม่อ่านค่าจาก `.env` จริง ปัจจุบันไฟล์ยังถูก ignore/ยังไม่ Git-track ตามข้อห้าม Stage ใน R2 ต้องใช้ `git add -f -- <path>` เฉพาะสองไฟล์นี้ใน Phase ที่ได้รับอนุญาต

ติดตั้งใหม่ด้วย `npm ci` จาก lockfile บนสำเนาที่ไม่คัดลอก `node_modules` หรือ `.env` เดิม ได้ API 6/6, In-Class 25/25, Take-Home 8/8, Optional 1/3 รวม 34/36 ทั้ง checker เดิมและรุ่นปัจจุบันของอาจารย์ ส่วนที่เพิ่มจาก fresh-copy R1 33/36 คือข้อ STRUCT ที่ตรวจ `api/.env.example` ไม่ทำ Optional AppError/asyncHandler เพิ่ม

Development บนสำเนาใช้ `.env`/`.env.local` ที่คัดลอกจาก templates เท่านั้น ผ่าน API 3001/Frontend 5173 และ CORS ตรง origin เปิด Dashboard ได้ 3 รายการ ไม่แก้ logic/checkers หรือ `.gitignore`

### Manual Terminal API Screenshot — MISSING

จาก Student Repository root:

```powershell
if (-not (Test-Path labs/week-07/source/api/.env)) {
  Copy-Item labs/week-07/source/api/.env.example labs/week-07/source/api/.env
}
npm run dev --prefix labs/week-07/source/api
# อีก Terminal เพื่อให้ logger มี request จริง
Invoke-RestMethod http://localhost:3001/api/requests
```

ใช้ Snipping Tool จับ Terminal แรกให้เห็นข้อความ API พร้อมที่พอร์ต 3001, CORS origin และ log `GET /api/requests 200` บันทึกเป็น `labs/week-07/evidence/images/terminal-api-r2.png` ยังไม่มีภาพนี้ใน R2 และไม่ใช้ภาพจำลองแทน

## R3 — Manual Terminal Screenshot ยัง MISSING

ตรวจแล้วไม่มี `labs/week-07/evidence/images/terminal-api.png` ภาพ Network/CORS, app และ error เดิมยังอยู่ครบ ให้รัน API และ `Invoke-RestMethod` ด้วยคำสั่งด้านบน แล้วใช้ Snipping Tool > New จับ Terminal แรกจากการทำงานจริง บันทึกเป็น `labs/week-07/evidence/images/terminal-api.png` (ใช้แทนชื่อที่แนะนำใน R2)

ให้เห็น server พร้อมรับ request, พอร์ต/CORS และ `GET /api/requests 200` โดยไม่เปิดไฟล์ `.env` หรือแสดง secret หากพอร์ตถูกใช้อยู่ ให้ตรวจ server เจ้าของพอร์ตก่อน ไม่ปิด process อื่นโดยเดา หลังจับภาพจึงหยุด API ด้วย Ctrl+C ปัจจุบันคง MISSING และยังไม่เพิ่มลิงก์ภาพจนกว่าจะมีไฟล์จริงที่ตรวจแล้ว
