# ENGSE203 LAB 03 — Responsive Web UI, Event and Form

ผู้จัดทำ: นรบดี บุญเลิศ · รหัสนักศึกษา 68543210013-7

Campus Service Request ฝึก Semantic HTML, responsive CSS, DOM events และการตรวจฟอร์ม รายการที่ส่งอยู่ใน DOM ของหน้าเว็บ ไม่มี Backend หรือฐานข้อมูล และหายเมื่อ reload

## ติดตั้งและรัน

ใช้ Node.js >=22.12.0 จากโฟลเดอร์ `labs/week-03/source/`:

```powershell
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

`check` ตรวจ syntax ของ `src/app.js`; `build` สร้าง `dist/` ด้วย Vite ส่วนพฤติกรรมของฟอร์มต้องตรวจใน Browser เพิ่มเติม การ publish ใช้ `npm run import:publish -- week-03 labs/week-03/source/dist` และ `npm run build:pages` จาก Repository root

## โครงสร้างและการไหลของข้อมูล

```text
index.html         semantic elements, labels และ aria-describedby
src/app.js         อ่าน FormData, validation, preview และ submit
src/style.css      mobile-first layout, focus และ error styles
vite.config.js     base './' สำหรับ static publishing
../evidence/       ภาพและผล check/build ที่เก็บไว้เดิม
```

เมื่อพิมพ์ `input` listener เรียก `readForm()` แล้วส่งข้อมูลให้ `renderPreview()` แสดงด้วย `textContent` เมื่อ submit จะ `preventDefault()` และเรียก `validate()` / `renderErrors()` ถ้าไม่ผ่านจะแสดงข้อความและ focus ช่องแรกที่ผิด โดยไม่เพิ่มรายการหรือ reset ฟอร์ม ถ้าผ่าน `addSubmittedRequest()` จะเพิ่มรายการ แล้วแสดง success และ reset ฟอร์มกับ preview การทำงานนี้อยู่ใน Browser จึงไม่มี HTTP Request/Response ไปยัง API

## Responsive Design และ Accessibility

ใช้ `header`, `main`, `section`, `aside`, `form`; label เชื่อมกับ id และทุกช่องมี name ข้อความ error เชื่อมด้วย `aria-describedby` และปรับ `aria-invalid` เมื่อ submit

CSS เริ่มจากหนึ่งคอลัมน์ และเปลี่ยนเป็นสองคอลัมน์ที่ `min-width: 48rem` ใช้ `minmax()` ป้องกันคอลัมน์ขยายเกินพื้นที่ และมี `:focus-visible` สำหรับคีย์บอร์ด

## Form Validation

ตรวจชื่อและรายละเอียดหลัง `trim()` ว่าไม่ว่าง และตรวจว่าเลือกประเภทคำร้องแล้ว ประเภทที่มีใน source คือ Frontend Developer, Backend Developer, Full-Stack Developer และ UX/UI Designer ไม่เติมกฎความยาวของ Week 12–13 ให้ Week 03

## ผลตรวจ R1 — 22 ตุลาคม 2026

| รายการ | ผลที่รันจริง |
|---|---|
| `npm run check` | PASS, exit 0 |
| `npm run build` | PASS, exit 0 |
| Pages: submit ว่าง | error 3 ช่อง ไม่เพิ่มรายการ และ focus ชื่อ |
| Pages: พิมพ์ข้อมูล | Live Preview เปลี่ยนตามค่าที่กรอก |
| Pages: submit ถูกต้อง | เพิ่ม Audit Student / Frontend Developer หนึ่งรายการ แสดง success และล้างฟอร์ม |
| 375px | หนึ่งคอลัมน์, scrollWidth 360 <= viewport 375 |
| 1280px | สองคอลัมน์, scrollWidth 1280 เท่ากับ viewport |
| Console ระหว่างทดสอบฟอร์ม | ไม่พบ error/warning |
| Zoom 200% และ keyboard walkthrough ครบทุกช่อง | UNVERIFIED ในรอบ R1 |

ทดสอบ Browser บน Pages ของ submission เดิม Source HTML/CSS/JS ไม่ได้แก้ใน R1 ภาพด้านล่างเป็น evidence เดิม

## Screenshot Evidence

- [Desktop 1280px](../evidence/desktop-1280.png)
- [Mobile 375px](../evidence/mobile-375.png)
- [Invalid form](../evidence/invalid-state.png)
- [Valid form](../evidence/valid-state.png)
- [ผล syntax check เดิม](../evidence/check-output.txt)
- [ผล build เดิม](../evidence/build-output.txt)

## ปัญหาที่พบและแนวทางแก้

ใน R1 พบว่า README ยังเป็นคำแนะนำ Starter จึงเติมเอกสารจาก source/evidence และผลตรวจจริง ไม่พบเหตุให้แก้ HTML/CSS/JavaScript ในขอบเขตการตรวจนี้ ผล syntax/build เพียงอย่างเดียวไม่ได้ยืนยัน accessibility ทุกกรณี

## URLs

- [Student Repository](https://github.com/nara-bodee/engse203-student-labs-68543210013)
- [Pages LAB 03](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-03/)
- [Merged PR #3](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/3)
- Submission tag เดิม: `lab-03-submission-v1` (R1 ไม่เปลี่ยน tag)

## References & AI Assistance

- [ใบงานและ Grading Checklist อาจารย์](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-03-responsive-ui)
- AI: Codex ช่วย audit source, รัน check/build, ตรวจ Browser และเรียบเรียง README ใน R1 โดยอ้างอิงงานจริง ไม่ได้ยืนยันว่า AI เป็นผู้เขียน source เดิมทั้งหมด นักศึกษาควรตรวจคำอธิบายและทดลองอธิบาย `readForm`, `validate`, `renderErrors` และ submit flow ด้วยตนเองก่อนส่ง revision
