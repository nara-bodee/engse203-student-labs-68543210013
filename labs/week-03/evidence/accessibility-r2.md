# LAB03 Accessibility — R2 Verification

> ผลล่าสุด: ตรวจ Browser Zoom 200% จริงสำเร็จในรอบ follow-up ดู [ผลและภาพจริง](zoom200-verification.md) ข้อ UNVERIFIED ด้านล่างเป็นประวัติของแต่ละรอบก่อนหน้า

นรบดี บุญเลิศ · 68543210013-7 · 22 ตุลาคม 2026

ตรวจบน [Pages LAB03](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-03/) โดยใช้ Browser keyboard API จริง ไม่แก้ HTML/CSS/JavaScript

| การทดสอบ | ผลที่ตรวจจาก DOM หลังส่ง key | สถานะ |
|---|---|---|
| Enter ที่ Submit เมื่อฟอร์มว่าง | errors 3 ช่อง, รายการ 0, focus ไป requester-name | PASS |
| Tab จาก requester-name | focus request-type | PASS |
| Tab จาก request-type | focus request-details | PASS |
| Tab จาก request-details | focus Submit button | PASS |
| Shift+Tab จาก Submit | focus กลับ request-details | PASS |
| Focus visibility | ทุก control ที่ Tab ถึงมี `:focus-visible` และ outline `rgb(247,201,72) solid 3px` | PASS |
| Keyboard submit ข้อมูลถูกต้อง | พิมพ์ R2 Keyboard, ArrowDown เลือก Frontend Developer, กรอกรายละเอียด, Tab และ Enter; แสดง success, เพิ่มหนึ่งรายการ, ล้างฟอร์ม | PASS |
| Browser Zoom 200% | Control+plus ไม่เปลี่ยนค่าที่อ่านได้: DPR=1, innerWidth=1280; ไม่มีหลักฐานว่าถึง 200% | UNVERIFIED |

[ภาพ Browser หลัง keyboard submit](keyboard-r2.jpg) เป็นภาพจริงจากรอบ R2 เก็บหลังตรวจ DOM ซ้ำ การจับภาพครั้งแรกไม่สำเร็จ จึงอ่าน DOM แล้วยืนยันผลก่อนจับภาพใหม่ ไม่มีการสร้างภาพจำลอง

สำหรับ Zoom ให้ผู้เรียนเลือก 200% จากเมนู Browser จริง แล้วตรวจว่าข้อความ/ช่องกรอก/ปุ่มยังใช้ได้ ไม่ทับกันและไม่มี horizontal scroll ที่ทำให้ใช้งานไม่ได้ ผล responsive viewport 375px ของ R1 ไม่ใช้แทนการตรวจ Zoom 200%

ใช้ Codex ช่วยส่ง key อ่าน focus/outline/DOM และบันทึกผล ไม่ถือว่าผ่าน screen-reader audit หรือ accessibility ทุกเกณฑ์จากการทดสอบนี้

## R3 — Zoom 200% ยัง UNVERIFIED

วันที่ 22 ตุลาคม 2026 ตรวจพบ Edge จริง แต่ระบบควบคุม Browser หยุดก่อนเริ่มตรวจ เพราะยืนยัน URL ปัจจุบันเพื่อบังคับนโยบายไม่ได้ จึงไม่ได้วัด layout ที่ 200% และไม่มีภาพ Zoom จาก R3 ไม่อ้าง PASS หรือรายงานว่าเป็น CSS defect ไม่แก้ source/CSS/JS

ให้ตรวจด้วย Microsoft Edge จาก build ของ source ปัจจุบัน:

```powershell
Set-Location 'D:\SEYear2\ENGSE203\engse203-student-labs-68543210013\labs\week-03\source'
npm run build
npm run preview -- --host 127.0.0.1 --port 5173 --strictPort
```

1. เปิด `http://127.0.0.1:5173/` ใน Edge หน้าต่าง desktop แล้วเปิดเมนู `...` ปรับ Zoom เป็น **200%** ตรวจตัวเลขที่เมนูจริง ไม่ใช้ DevTools viewport หรือ CSS zoom แทน
2. เลื่อนลงตามแนวตั้ง ตรวจหัวข้อ/label/ช่องกรอก/ปุ่ม/รายการคำร้องไม่ทับกันหรือถูกตัดจนใช้งานไม่ได้ และไม่ต้องเลื่อนแนวนอนเพื่ออ่านหรือใช้งานส่วนสำคัญ
3. ใช้ Tab/Shift+Tab ไปครบทุก control เห็น focus ชัด กด Enter ที่ Submit ขณะฟอร์มว่าง ตรวจ validation ทั้ง 3 ช่องอ่านได้และ focus กลับชื่อผู้แจ้ง
4. กรอกชื่อ เลือกประเภทด้วยลูกศร กรอกรายละเอียดที่ถูกต้อง กด Submit ด้วย keyboard ตรวจ success/รายการใหม่ และตรวจ layout อีกครั้ง
5. ใช้ Snipping Tool เก็บภาพจริงที่เห็นตัวเลข 200% และภาพ validation/form ที่ใช้งานได้ พร้อมจดขนาดหน้าต่าง/ผลแต่ละข้อ แล้วคืน Zoom เดิมและหยุด preview ด้วย Ctrl+C

จนกว่าจะตรวจครบ ให้สถานะ Zoom เป็น **UNVERIFIED** ผล keyboard PASS จาก R2 เป็นการตรวจคนละเงื่อนไขและไม่ใช้แทน Zoom


## R6 — Zoom 200% ยัง UNVERIFIED

วันที่ 23 ตุลาคม 2026 พบ Microsoft Edge จริง แต่ Computer Use ยุติการทำงานก่อนทดสอบ Zoom เพราะยืนยัน URL ปัจจุบันเพื่อบังคับใช้นโยบายไม่ได้ จึงหยุดควบคุม Windows Browser ในรอบนี้ ไม่มีหลักฐานว่าถึง200% และไม่มีการตรวจ layout, horizontal overflow, form interaction, focus หรือ error messages ภายใต้ Zoom200 สำเร็จ ไม่แก้ CSS และไม่ใช้ responsive375px หรือผล keyboard100% แทน

ให้ใช้ขั้นตอน Manual Verification ของ R3 ด้านบน ตรวจตัวเลข200%จากเมนูจริง ถ่ายภาพทั้งขณะฟอร์มว่างแสดง3errors และหลังส่งฟอร์มสำเร็จ ตรวจ Tab/Shift+Tab/focus-visible ช่องกรอก/ปุ่มไม่ทับกัน และเลื่อนแนวตั้งได้โดยไม่ต้องเลื่อนแนวนอนเพื่อใช้ส่วนสำคัญ จดขนาดหน้าต่างและผลแต่ละข้อ คืน Zoom เดิมหลังตรวจ จนกว่าจะทำจริงครบให้คง UNVERIFIED
