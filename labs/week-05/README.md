# week-05 — React Routing Data Fetching Mini App

## วิธีรัน

```bash
cd labs/week-05/source
npm ci
npm run dev
```

## วิธีตรวจ

```bash
cd labs/week-05/source
npm run check
npm run build
```

ผลล่าสุดของคาบ 5B: `npm run check` ผ่าน 133/133 และ `npm run build` ผ่าน

## โครงสร้าง route

`main.jsx` ครอบแอปด้วย `HashRouter` เพื่อให้ static hosting เปิด URL แบบ `#` ได้ จากนั้น `App.jsx` ใช้ `Routes` โดยมี `AppLayout` เป็นกรอบกลาง และให้หน้าลูกแสดงใน `<Outlet />`

- `#/` แสดง `DashboardPage`
- `#/requests/new` แสดง `NewRequestPage`
- `#/requests/:requestId` แสดง `RequestDetailPage`
- `#/about` แสดง `AboutPage`
- URL อื่นแสดง `NotFoundPage`

## Data flow

หน้า Dashboard, New Request และ Detail ไม่เรียก `fetch()` หรือ `localStorage` เอง แต่เรียกผ่าน `requestService.js` เท่านั้น `requestStorage.js` เป็นไฟล์เดียวที่แตะ browser storage และเก็บข้อมูลด้วย envelope ที่มี `schemaVersion`, `updatedAt`, และ `requests`

`DashboardPage` ใช้ `useEffect` โหลดข้อมูลใหม่เมื่อ `scenario` หรือ `reloadKey` เปลี่ยน และส่ง `onRecovery` ลงไปให้ service แจ้งกลับเมื่อพบข้อมูลเสียหาย ส่วน `summary` และ `filteredRequests` คำนวณจาก `requests` ระหว่าง render เพื่อไม่เก็บข้อมูลซ้ำใน state

Effect ใน `DashboardPage` และ `RequestDetailPage` มี cleanup guard ด้วยตัวแปร `ignore` เพื่อไม่ใช้ผลลัพธ์ที่กลับมาหลังผู้ใช้ออกจากหน้าหรือ dependency เปลี่ยนไปแล้ว

## หลักฐาน

หลักฐานอยู่ใน `evidence/` และภาพหน้าจอเก็บใน `evidence/images/` ส่วน publish output อยู่ใน `publish/`
