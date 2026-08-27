# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Codex AI Assistant | วางแผนและทำ LAB05A ตาม CHECKPOINT_CARDS 5A | Route matrix, Dashboard read path, Service read path, Request Detail | รัน `npm run check -- --session=1` ได้ 104/104 และ `npm run build` ผ่าน | ยอมรับโค้ดที่ตรงกับ starter checker และคู่มือ LAB05A |
| Codex AI Assistant | ทำ LAB05B persistence/recovery ตาม CHECKPOINT_CARDS 5B | `requestStorage.js`, `requestService.js`, New Request, Reset, cleanup guard | รัน `npm run check` ได้ 133/133 และ `npm run build` ผ่าน | ยอมรับโค้ดที่ไม่เพิ่ม library และไม่ใช้ความรู้นอก Week01-05 |
| Edge Headless Screenshot | เก็บภาพ evidence จากแอป local ที่รันจริง | ภาพใน `images/` สำหรับ form validation, persistence, reset, detail และ storage | ตรวจว่าไฟล์ PNG ถูกสร้างใน `evidence/images` และ checker ยังผ่าน 133/133 | ใช้เป็นหลักฐานประกอบ TEST_REPORT |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
