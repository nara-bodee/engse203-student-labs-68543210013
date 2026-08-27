# week-05 — React Routing Data Fetching Mini App

## วิธีรัน

```bash
cd labs/week-05/source
npm ci
npm run dev
```

## วิธีตรวจ

```bash
npm run check -- --session=1
npm run build
```

ผลล่าสุดของคาบ 5A: `npm run check -- --session=1` ผ่าน 104/104 และ `npm run build` ผ่าน

## โครงสร้าง route

`main.jsx` ครอบแอปด้วย `HashRouter` เพื่อให้ static hosting เปิด URL แบบ `#` ได้ จากนั้น `App.jsx` ใช้ `Routes` โดยมี `AppLayout` เป็นกรอบกลาง และให้หน้าลูกแสดงใน `<Outlet />`

- `#/` แสดง `DashboardPage`
- `#/requests/new` แสดง `NewRequestPage`
- `#/requests/:requestId` แสดง `RequestDetailPage`
- `#/about` แสดง `AboutPage`
- URL อื่นแสดง `NotFoundPage`

## Data flow คาบ 5A

หน้า Dashboard และ Detail ไม่เรียก `fetch()` เอง แต่เรียกผ่าน `requestService.js` เท่านั้น `DashboardPage` ใช้ `useEffect` โหลดข้อมูลใหม่เมื่อ `scenario` หรือ `reloadKey` เปลี่ยน ส่วน `summary` และ `filteredRequests` คำนวณจาก `requests` ระหว่าง render เพื่อไม่เก็บข้อมูลซ้ำใน state

## หลักฐาน

หลักฐานอยู่ใน `evidence/` และภาพหน้าจอเก็บใน `evidence/images/`
