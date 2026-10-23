# ENGSE203 LAB 4 - Student Evidence README

## ผู้จัดทำ

- ชื่อ-นามสกุล: นรบดี บุญเลิศ
- รหัสนักศึกษา: 68543210013-7
- Section: SEC2

## URLs

- Repository: https://github.com/nara-bodee/engse203-student-labs-68543210013
- Pull Request: https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/7 (merged)
- GitHub Pages: https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-04/
- Submission Tag: `lab-04-submission-v2` (ตรวจว่าเป็น ancestor ของ main แล้วใน R1)

## Component Tree

```text
App (owns requests and statusFilter state)
├── AppHeader
├── SummaryPanel (receives summary props)
├── RequestForm (owns formData/errors/feedback state, sends onAddRequest callback)
├── FilterBar (receives value props, sends onFilterChange callback)
└── RequestList (receives filtered requests props, sends onDeleteRequest callback)
    └── RequestCard (receives request props, sends selected request id)
```

## Setup และ Run

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```


```powershell
$env:PATH='C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
pnpm run check
pnpm run build
```

## State / Props / Callback Explanation

`App` เป็นเจ้าของ state หลักสองตัวคือ `requests` และ `statusFilter` แล้วคำนวณ `summary` และ `filteredRequests` จาก state จริงก่อนส่งลงไปยัง child components ผ่าน props. `RequestForm` เป็น controlled form และถือ state ของฟอร์มเอง ได้แก่ `formData`, `errors`, และ `feedback`; เมื่อ submit ผ่าน validation จะส่งข้อมูลใหม่กลับขึ้นไปที่ `App` ผ่าน `onAddRequest`. การลบคำร้องส่ง `request.id` จาก `RequestCard` ผ่าน `RequestList` กลับขึ้นไปที่ `App` ด้วย `onDeleteRequest` แล้วอัปเดตรายการด้วย `filter()` แบบ immutable.

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดง initial requests และ summary ถูกต้อง | Pass | `../evidence/desktop-1280.png` |
| TC-02 Controlled input | ฟิลด์ในฟอร์มผูกกับ React state และเปลี่ยนค่าตาม input | Pass | code review + `RequestForm.jsx` |
| TC-03 Invalid | R1: submit ฟอร์มว่างแล้วแสดง error ใกล้ field และรายการยังเป็น 3 | Pass | [Validation v2 R1](../evidence/validation-v2-r1.jpg) |
| TC-04 Valid add | submit valid data เพิ่ม pending request, summary update, form reset | Pass | code review + local app behavior |
| TC-05 Filter | ตัวกรอง `pending`, `in-progress`, `completed` ใช้ state และ callback | Pass | code review + `FilterBar.jsx` |
| TC-06 All | ตัวกรอง `all` แสดงรายการทั้งหมด | Pass | `../evidence/desktop-1280.png` |
| TC-07 Empty | ไม่มีรายการแล้วแสดง empty state | Pass | `../evidence/empty-state.png` |
| TC-08 Delete | ลบด้วย `request.id` และอัปเดต state ด้วย `filter()` | Pass | code review + `RequestCard.jsx` |
| TC-09 Mobile | หน้าจอ 375px responsive | Pass | `../evidence/mobile-375.png` |
| TC-10 Keyboard | มี label, focus-visible, aria-invalid และ role status | Pass | code review + CSS review |
| TC-11 Build | pnpm build สำเร็จและสร้าง `dist/` | Pass | `pnpm run build` |
| TC-12 Pages | R1: HTTP 200, React แสดง 3 รายการ; กรองรอดำเนินการเหลือ REQ-001; Console ไม่มี error/warning | Pass (smoke test; ยังไม่ได้ทวนทุก TC ใน Private window) | [Pages LAB04](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-04/) |

## Screenshots

- Desktop: `../evidence/desktop-1280.png`
- Mobile 375px: `../evidence/mobile-375.png`
- Validation ปัจจุบัน (R1): [validation-v2-r1.jpg](../evidence/validation-v2-r1.jpg) จับจาก Pages จริงวันที่ 22 ตุลาคม 2026 หลัง submit ฟอร์มว่าง เห็น priority เป็น dropdown ตาม PR #7
- ภาพเดิม `../evidence/validation.png` และภาพอื่นที่ยังแสดง priority แบบ radio เป็นหลักฐานก่อน revision v2 ไม่ใช้ยืนยันหน้าตา dropdown ปัจจุบัน เก็บไฟล์เดิมไว้เพื่อรักษาประวัติ
- Empty state เดิม: `../evidence/empty-state.png`

## Week 03 -> Week 04 Reflection

Week 03 ใช้ DOM mutation และ event listener เพื่ออ่านค่า input แล้วแก้ DOM โดยตรง ทำให้ logic กระจายตาม element ต่าง ๆ. Week 04 เปลี่ยนเป็น React state-driven UI โดยเก็บข้อมูลไว้ใน state และให้ React render หน้าจอจาก state นั้น. แนวทางนี้ทำให้ summary, filter, form validation และ list rendering เชื่อมกันชัดเจนผ่าน props/callback แทนการ query DOM เอง. เมื่อ state เปลี่ยน UI จะอัปเดตตาม component tree อย่างเป็นระบบ.

## AI / External Resource Disclosure

- AI tool used: Codex
- Used for: ตรวจ zip LAB04, เปลี่ยนข้อมูลเจ้าของงานเป็น `meenz / 68543210013-7`, ลบ placeholder ที่ยังไม่สมบูรณ์, รัน pnpm check/build, และสร้าง evidence screenshots
- My adaptation: ใช้ implementation จาก zip ที่ให้มาเป็นฐาน แล้วปรับ README/evidence ให้ตรงกับ Week 04 starter contract และข้อมูลของผู้ส่งงาน
