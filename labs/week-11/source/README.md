# Campus Service — Full-Stack (Week 11)

> 🏠 TODO W11-README (CP40) — เขียน README นี้ใหม่ให้ครบ:
> สถาปัตยกรรม 3 ชั้น · วิธีรัน dev/production · env vars · การตัดสินใจออกแบบ

ระบบ Campus Service Request เป็นระบบ Full-Stack สำหรับจัดการคำร้องภายในมหาวิทยาลัย พัฒนาด้วย React + Vite สำหรับ Frontend, Node.js + Express สำหรับ API และ SQLite สำหรับฐานข้อมูล

## สถาปัตยกรรม 3 ชั้น

```text
┌─────────┐  HTTP   ┌──────────┐  SQL   ┌─────────┐
│ React   │ ──────► │ Express  │ ─────► │ SQLite  │
└─────────┘  JSON   └──────────┘  rows  └─────────┘
```

| ชั้น | หน้าที่ | โฟลเดอร์ |
|---|---|---|
| Frontend | แสดงหน้าจอและรับข้อมูลจากผู้ใช้ | `frontend/` |
| API | รับ request, ตรวจสอบข้อมูล และเรียก service | `api/src/` |
| Database | จัดเก็บข้อมูลผู้ใช้และคำร้อง | `api/data/` |

Frontend จะเรียก API ผ่าน HTTP และรับข้อมูลกลับมาเป็น JSON ส่วน API จะติดต่อฐานข้อมูล SQLite เพื่ออ่านและแก้ไขข้อมูล

## วิธีรัน Development

เปิด Terminal ที่ 1 สำหรับ API:

```bash
cd api
npm install
npm run db:setup
npm run dev
```

API ทำงานที่:

```text
http://localhost:3001
```

เปิด Terminal ที่ 2 สำหรับ Frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend ทำงานที่:

```text
http://localhost:5173
```

## วิธีรัน Production

จากโฟลเดอร์ `source` ให้ build ระบบด้วย:

```bash
npm run build
```

จากนั้นรัน API ใน production mode:

```bash
NODE_ENV=production npm start
```

สำหรับ Windows PowerShell ใช้:

```powershell
$env:NODE_ENV="production"; npm start
```

ใน production Express จะเสิร์ฟ Frontend ที่ build แล้วและ API ผ่านพอร์ตเดียวกัน

## Environment Variables

| ตัวแปร | ค่าเริ่มต้น | หน้าที่ |
|---|---|---|
| `NODE_ENV` | `development` | กำหนดโหมด development หรือ production |
| `PORT` | `3001` | พอร์ตของ API |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ที่อนุญาตให้เรียก API |
| `DB_FILE` | `api/data/campus.db` | ตำแหน่งไฟล์ฐานข้อมูล SQLite |
| `STATIC_DIR` | `frontend/dist` | ตำแหน่งไฟล์ Frontend ที่ build แล้ว |
| `VITE_API_BASE_URL` | `http://localhost:3001` ใน development / ค่าว่างใน production | กำหนด URL ที่ Frontend ใช้เรียก API |

## การตัดสินใจออกแบบ

ระบบแบ่งเป็น 3 ชั้นเพื่อแยกหน้าที่ของ Frontend, API และ Database ออกจากกัน ทำให้แต่ละส่วนแก้ไขและทดสอบได้ง่ายขึ้นโดยไม่กระทบส่วนอื่นมากเกินไป

เลือกใช้ SQLite เพราะข้อมูลของระบบมีโครงสร้างชัดเจนและมีความสัมพันธ์ระหว่างผู้ใช้กับคำร้อง อีกทั้งระบบ LAB มีขนาดเล็กจึงไม่จำเป็นต้องเปิด Database Server แยก ทำให้ติดตั้งและทดสอบได้ง่าย