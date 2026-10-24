# ENGSE203 LAB 13 — Authentication & Security (CP48–CP52)

ผู้จัดทำ: นรบดี บุญเลิศ · รหัสนักศึกษา 68543210013-7

LAB13: ความปลอดภัยพื้นฐานและความพร้อมก่อนใช้งาน ต่อจากงาน Full-Stack และการทดสอบของ Week 11–12 เพิ่ม validation, password hashing, JWT, authentication/authorization และการตรวจ production secret

ระบบรับคำร้องขอใช้บริการภายในมหาวิทยาลัย · **React + Express API + SQLite** ทำงานครบวงจร

## สถาปัตยกรรม 3 ชั้น

```
┌─────────────┐   HTTP    ┌──────────────┐   SQL    ┌───────────┐
│  React      │ ────────► │  Express API │ ───────► │  SQLite   │
│  (frontend) │ ◄──────── │  (api)       │ ◄─────── │  campus.db│
└─────────────┘   JSON    └──────────────┘   rows   └───────────┘
   พอร์ต 5173              พอร์ต 3001              ไฟล์ในเครื่อง
```

| ชั้น | หน้าที่ | โฟลเดอร์ |
|---|---|---|
| Frontend | หน้าจอผู้ใช้ · เรียก API | `frontend/` |
| API | route · controller · service | `api/src/` |
| Database | เก็บข้อมูลถาวร | `api/data/campus.db` |

## วิธีรัน (development)

ใช้ Node.js >=22.12.0 และ PowerShell จาก `labs/week-13/source/`:

```powershell
npm ci --prefix api
npm ci --prefix frontend
if (-not (Test-Path api/.env)) {
  Copy-Item api/.env.example api/.env
}
if (-not (Test-Path frontend/.env.local)) {
  Copy-Item frontend/.env.example frontend/.env.local
}
# เฉพาะกรณียังไม่มี DB; ไม่ reset ฐานข้อมูลที่มีอยู่
if (-not (Test-Path api/data/campus.db)) {
  npm run db:setup --prefix api
}
npm run dev --prefix api       # API http://localhost:3001

# อีก Terminal ที่ labs/week-13/source/
npm run dev --prefix frontend  # React http://localhost:5173
```

## วิธีรัน (production)

ตัวอย่างจำลองในเครื่อง โดยใช้ Terminal แยกจาก development และไม่พิมพ์ค่า secret:

```powershell
$env:NODE_ENV = 'production'
npm run build
$env:PORT = '10000'
# secret สุ่มเฉพาะ process สำหรับทดลองในเครื่อง ไม่เขียนลงไฟล์หรือ Git
$env:JWT_SECRET = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
npm start                     # http://localhost:10000
```

เมื่อนำขึ้น deployment ให้ตั้ง `JWT_SECRET` ใน Environment ส่วนตัวของ service Production ที่ไม่มีค่า/ค่าว่าง/ช่องว่างล้วนจะ fail fast คำสั่ง build เดิมอาจติดตั้ง API โดยข้าม devDependencies เมื่อจบการจำลองและกลับมาทดสอบ ให้ใช้ Terminal development และ `npm ci --include=dev --prefix api` เพื่อคืนเครื่องมือทดสอบ

| ไฟล์ | ทำให้ production ทำงานอย่างไร |
|---|---|
| `frontend/.env.production` | `VITE_API_BASE_URL=` ว่าง → frontend เรียก `/api/...` บนโดเมนเดียวกัน |
| `api/src/app.js` | production เสิร์ฟ `frontend/dist` · path ที่ไม่ใช่ `/api` ได้ index.html |
| `package.json` | `build` ใช้ `--include=dev` เพราะ cloud ตั้ง NODE_ENV=production ตั้งแต่ build |

## Submission / Pages

- [LAB13 Pages Evidence Report](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-13/)
- [PR #20 — merged](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/20)
- Merge commit: `03d6447053db4bd185ec640688da1e6b1707f9be`
- Submission tag เดิม: `lab-13-submission-v1` ชี้ merge commit นี้ ไม่ได้เปลี่ยน tag ใน R1/R2
- [Pages deployment สำเร็จ](https://github.com/nara-bodee/engse203-student-labs-68543210013/actions/runs/39787449218) สำหรับ merge commit นี้; R2 ตรวจหน้า report ตอบ HTTP 200

Pages แสดงรายงานหลักฐานของ LAB13 ส่วน URL ของ Production API สำหรับ Week 13 ยังไม่ได้ตรวจยืนยัน ไม่ใช้ Render ของ Week 11 เป็นหลักฐานว่า authentication ของ Week 13 ถูก deploy แล้ว

## ตรวจสุขภาพระบบ

```powershell
Invoke-RestMethod http://localhost:3001/api/health
# { "status": "ok", "env": "...", "database": { "connected": true, ... } }
```

## Environment Variables

| ตัวแปร | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| `NODE_ENV` | development | สภาพแวดล้อม |
| `PORT` | 3001 | พอร์ต API |
| `CORS_ORIGIN` | http://localhost:5173 | ที่อยู่ frontend ที่อนุญาต |
| `DB_FILE` | api/data/campus.db | ไฟล์ฐานข้อมูล |
| `JWT_SECRET` | (dev: ค่าสำหรับพัฒนา) | secret สำหรับเซ็น JWT · production ไม่ตั้ง = ไม่ยอม start |

## API Endpoints

ดู `API_CONTRACT.md` ประกอบ source ของ Week 13: `GET/POST/PUT/DELETE /api/requests`, `GET /api/health` และ `POST /api/auth/login`

Client ส่ง email/password ไป login → Route/Service ตรวจรหัสผ่านด้วย `verifyPassword()` → ตอบ 200 พร้อม JWT ที่มี role/exp ไม่มีรหัสผ่าน สำหรับ PUT/DELETE จะผ่าน `authenticate` เพื่อตรวจ Bearer token และลายเซ็นก่อน แล้ว `requireRole('staff')` ตรวจบทบาท ถ้าไม่มี/ปลอม token ได้ 401 ถ้าเป็นบทบาทอื่นได้ 403 เมื่อผ่านจึงเรียก Controller → Service → SQLite และตอบ PUT 200 / DELETE 204 ส่วน GET/POST คำร้องยังเปิดให้ใช้งานทั่วไปตามโจทย์

## การตัดสินใจด้านการออกแบบ

- **แยก 3 ชั้นชัดเจน** — เปลี่ยนแหล่งข้อมูลได้โดยกระทบชั้นเดียว (พิสูจน์มา 4 ครั้งใน Week 05–10)
- **เลือก SQLite** — ข้อมูลมีโครงและความสัมพันธ์ชัด · ดู `DATABASE_CHOICES.md`
- **config รวมศูนย์** — ไม่ hardcode · แยก dev/production ด้วย `NODE_ENV`

## การทดสอบ LAB13 และ Regression จาก Week 12

```powershell
npm test --prefix api
npm test --prefix frontend
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass
# หากต้องการดู coverage
npm run coverage --prefix api
```

| โฟลเดอร์ | ชนิด test | ทดสอบอะไร |
|---|---|---|
| `api/tests/unit/` | unit | pure function เช่น `validators/requestValidator.js` — ไม่ต้องเปิด server |
| `api/tests/integration/` | integration | ยิง HTTP จริงผ่านทุกชั้น ด้วย supertest บนฐานข้อมูลในหน่วยความจำ (`DB_FILE=:memory:`) |
| `frontend/src/**/*.test.js` | unit | pure function ฝั่ง React เช่น `utils/requestSummary.js` |

หลักฐานการไล่ปัญหา: `BUG_REPORTS.md` (อาการที่ผู้ใช้แจ้ง) · `DEBUG_LOG.md` (สาเหตุและวิธีแก้) · `TEST_CASES.md` (ตารางกรณีทดสอบ)

Vitest config และ checkers ใช้ `DB_FILE=:memory:` เพื่อแยกจาก `api/data/campus.db` ผลที่รันใหม่ใน R2 วันที่ 22 ตุลาคม 2026: API 82/82, Frontend 3/3, CP48–CP52 23/23, Week12 regression 20/20 และ Production config probes แบบ child process 8/8 ไม่เปลี่ยน source/tests/metadata หรือฐานข้อมูลจริง ผลนี้ไม่ใช่ผลรับรอง Root Repository Verifier; ดู [Evidence](../evidence/README.md) สำหรับผลเดิมและรอบ R2 ที่แยกกัน


## ความปลอดภัย (สัปดาห์ 13)

| Checkpoint | Requirement / HTTP | ไฟล์ |
|---|---|---|
| CP48 | ชื่อ 100/101, details 1000/1001, location 100/101; body เกิน 10 KB → JSON 413 | `api/src/validators/requestValidator.js` · `api/src/app.js` และ boundary tests |
| CP49 | scrypt salt สุ่ม 16 bytes, key 64 bytes, strict format ก่อน Buffer.from, timingSafeEqual; malformed hash คืน false | `api/src/utils/password.js` · `api/tests/unit/password.test.js` |
| CP50 | login ถูก → 200 + JWT role/exp; รหัสผิด/อีเมลไม่มี → 401 ข้อความเดียวกัน | `api/src/services/authService.js` · `POST /api/auth/login` |
| CP51 | GET/POST ทั่วไป; PUT/DELETE ใช้ authenticate + staff role; 401/403 ตามสาเหตุ | `api/src/middleware/auth.js` · `api/src/routes/requestRoutes.js` · integration tests |
| CP52 | secret จาก env; production ไม่มี/ว่าง/ช่องว่างต้องไม่ start; error ไม่ส่ง stack | `api/src/config.js` · `api/.env.example` · errorHandler |

**บัญชีเจ้าหน้าที่สำหรับพัฒนา** — `staff@rmutl.ac.th` / `staff1234` (อยู่ใน schema.sql เป็น hash)
⚠ ก่อนใช้งานจริง: สร้างบัญชีใหม่ด้วย `npm run create-staff --prefix api -- <อีเมล> <รหัสผ่าน>` และตั้ง `JWT_SECRET` ใน Environment ของ Render

ตัวอย่างกับข้อมูลสำหรับทดสอบ โดยเก็บ token ในตัวแปร ไม่พิมพ์ลง log:

```powershell
$login = Invoke-RestMethod -Uri http://localhost:3001/api/auth/login -Method Post `
  -ContentType 'application/json' `
  -Body (@{email='staff@rmutl.ac.th'; password='staff1234'} | ConvertTo-Json)
$authHeaders = @{Authorization="Bearer $($login.token)"}
Invoke-RestMethod -Uri http://localhost:3001/api/requests/REQ-001 -Method Put `
  -Headers $authHeaders -ContentType 'application/json' `
  -Body (@{status='completed'} | ConvertTo-Json)
```

## References & AI Assistance

- [Instructor LAB13 — pinned commit 3e080d3](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-13-quality-security/lab13)
- ใช้ Codex ช่วยตรวจ requirement/Git history, วิเคราะห์ข้อผิดพลาด hash/config ใน Phase 3C, ทำ security fixes และ tests ตาม diff ที่ commit `2430c0c`, รัน verification และเตรียมเอกสารส่งงานตามประวัติการทำงานนี้
- ใน R1/R2 ใช้ Codex audit และรันทดสอบซ้ำ; R2 ปรับเฉพาะ README และสถานะ evidence ของ Week 13 ไม่มีการแก้ implementation/tests หรืออ้างว่าการ audit พิสูจน์ความเข้าใจของนักศึกษาได้ทั้งหมด นักศึกษาควรอธิบาย salt/hash, JWT, middleware และ 401/403 จาก source จริงด้วยตนเองก่อนส่ง revision
