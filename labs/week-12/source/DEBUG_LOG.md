# บันทึกการไล่ปัญหา (Debug Log)

🏫 **TODO W12-LOG (CP45 · CP47)** — แต่ละ bug ตอบ 6 ข้อ · เขียนสั้น ๆ แต่ต้องชัด

> BUG #0 ไม่มีผู้ใช้แจ้ง — คุณจะเจอเองตอนเขียน unit test ค่าขอบใน CP45
> BUG #1–#3 มาจาก `BUG_REPORTS.md`

---

## BUG #0 · รายละเอียด 10 ตัวอักษรไม่ผ่าน

- **อาการ:** กรอกรายละเอียด 10 ตัวอักษรพอดี แต่ระบบไม่ยอมรับ
- **วิธีทำซ้ำ:** ทดสอบรายละเอียด 9, 10 และ 11 ตัวอักษร
- **เครื่องมือ:** Vitest Unit Test และตรวจเงื่อนไขใน Validator
- **สาเหตุ (ไฟล์:บรรทัด):** api/src/validators/requestValidator.js:37 — เงื่อนไขเดิมใช้ <= 10 ทำให้ 10 ตัวอักษรถูกปฏิเสธ
- **วิธีแก้:** เปลี่ยนเป็นตรวจความยาว < MIN_DETAILS เพื่อให้ตั้งแต่ 10 ตัวอักษรผ่าน
- **test ที่กัน:** requestValidator.test.js — 10 ตัวอักษรผ่าน และ 9 ตัวอักษรไม่ผ่าน

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ได้ 500

- **อาการ:** ลบ REQ-002 แล้วเพิ่มคำร้องใหม่ ระบบตอบ 500
- **วิธีทำซ้ำ:** DELETE REQ-002 แล้ว POST คำร้องใหม่
- **เครื่องมือ:** Vitest Integration Test และตรวจ SQL ใน Service
- **สาเหตุ (ไฟล์:บรรทัด):** api/src/services/requestService.js:101 — nextId() ใช้ COUNT(\*) + 1 ทำให้สร้างรหัสซ้ำกับรายการเดิม
- **วิธีแก้:** ใช้ MAX ของหมายเลข ID + 1 แทนการนับจำนวนแถว
- **test ที่กัน:** requests.api.test.js — BUG #1 ลบรายการกลางแล้วเพิ่มใหม่ → 201

## BUG #2 · Dashboard นับกำลังดำเนินการเป็น 0

- **อาการ:** มีคำร้อง in-progress แต่ Dashboard แสดง 0
- **วิธีทำซ้ำ:** ส่งข้อมูลที่มี in-progress 2 รายการเข้า summarizeRequests()
- **เครื่องมือ:** Vitest Frontend Test และตรวจค่าของ status ในโค้ด
- **สาเหตุ (ไฟล์:บรรทัด):** frontend/src/utils/requestSummary.js:12 — ใช้ 'in progress' แต่ API ส่ง 'in-progress'
- **วิธีแก้:** เปลี่ยนข้อความที่ใช้เปรียบเทียบให้เป็น 'in-progress'
- **test ที่กัน:** requestSummary.test.js — BUG #2 นับ in-progress ได้ถูกต้อง

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีได้ 500

- **อาการ:** PUT คำร้องที่ไม่มีอยู่แล้ว ระบบตอบ 500 แทน 404
- **วิธีทำซ้ำ:** PUT /api/requests/REQ-999 พร้อม status completed
- **เครื่องมือ:** Vitest Integration Test และตรวจ Controller
- **สาเหตุ (ไฟล์:บรรทัด):** api/src/controllers/requestController.js:29-33 — เมื่อไม่พบคำร้อง Service คืน null และโค้ดเดิมพยายามอ่าน property ของ null
- **วิธีแก้:** ตรวจ if (!updated) แล้วตอบ 404 ก่อนใช้ updated.id
- **test ที่กัน:** requests.api.test.js — คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)
