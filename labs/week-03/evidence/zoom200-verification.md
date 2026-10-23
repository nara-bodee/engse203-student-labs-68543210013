# LAB03 — ตรวจ Browser Zoom 200% จริง

23 ตุลาคม 2026 · worktree `fix/week-03-v2` · Draft PR #23

รัน `npm ci --ignore-scripts`, `npm run check` (syntax check), `npm run build` ผ่าน จากนั้นเปิด Vite ของ worktree นี้ที่ `http://localhost:5533/` ใน Microsoft Edge จริง ใช้ Browser Zoom จริงจนเมนูแสดง **200%** ไม่ใช้ CSS zoom หรือ responsive viewport แทน ขนาดภาพหน้าต่าง 967×1032 logical pixels ผลมีขอบเขตเฉพาะหน้าต่างและข้อมูลที่ทดสอบ ไม่ใช่การรับรอง WCAG ทุกเกณฑ์

| ตรวจจริงที่ 200% | ผล |
|---|---|
| ยืนยันตัวเลข Zoom ใน Browser menu | PASS — เมนูแสดง 200% |
| Layout | PASS — header wrap, form/preview เรียงคอลัมน์เดียว ไม่ทับกัน; เลื่อนแนวตั้งถึงด้านล่างได้ |
| Horizontal overflow / text wrapping | PASS — ที่ขนาดหน้าต่างนี้ไม่พบ horizontal scrollbar หรือต้องเลื่อนแนวนอน; label, controls, ข้อความไทย/อังกฤษและรายการใหม่ wrap อยู่ใน panel |
| Tab | PASS — Name → Type → Details → Submit; แต่ละช่อง/ปุ่มมีกรอบ focus สีเหลืองชัดเจนและ Browser scroll ให้เห็น control |
| Shift+Tab | PASS — Submit → Details |
| Empty submit ด้วย Enter | PASS — มี errors 3 ช่อง, error ใกล้ช่องอ่านได้, focus กลับ Name และไม่มีรายการใหม่ |
| กรอกด้วย Keyboard | PASS — ชื่อ `Zoom 200 Keyboard`, ArrowDown เลือก Frontend Developer, ข้อความรายละเอียดไทย/อังกฤษ แล้ว Tab/Enter |
| Valid submit | PASS — `Request submitted successfully.`, รายการใหม่แสดงข้อมูลที่กรอก, reset form/preview และล้าง errors |

ภาพจริงที่บันทึกจาก Windows Browser โดยไม่แต่งเนื้อหา:

- [ตัวเลข 200% ในเมนู Browser](zoom200-browser-menu.jpg)
- [Header และฟอร์มเป็นคอลัมน์เดียว](zoom200-layout.jpg)
- [กรอบ Focus บน Submit จาก Tab](zoom200-keyboard-submit.jpg)
- [Validation 3 ช่องและ Focus กลับช่องชื่อ](zoom200-validation.jpg)
- [รายการที่ส่งสำเร็จและข้อความยาว wrap](zoom200-result.jpg)

Accessibility tree ระบุ `Zoom: 200%`, errors ทั้งสาม และ success/list ใหม่ อย่างไรก็ตาม structured `focused_element` ของเครื่องมือ Windows ค้างที่ address bar จึงใช้ภาพ caret/focus outline และผลการกด keyboard จริงยืนยัน focus ไม่อ้างค่าจาก structured focus ที่ค้างเป็นหลักฐาน

ใช้ Codex ควบคุม Edge ผ่าน Computer Use, อ่าน accessibility tree และบันทึกภาพจริง ไม่มีการแก้ HTML/CSS/JS/checker/dependencies เวอร์ชันเดิม ผล UNVERIFIED ใน [R2/R3/R6](accessibility-r2.md) เป็นประวัติรอบก่อนและถูกปิดช่องว่าง Zoom ด้วยรอบนี้ PR คง Draft เพื่อรอ review ไม่ merge หรือเปลี่ยน submission tag ในรอบนี้
