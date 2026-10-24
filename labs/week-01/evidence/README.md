# Week 01 Evidence

## อัปเดต24ตุลาคม2026 — ภาพผลการรันได้รับแล้ว

ผู้ใช้เพิ่มภาพ `npm run start.png` และ `npm run check.png` ตรวจแล้วเห็นHelloชื่อ/รหัส/Nodev24.19.0และผลcheckPASS คัดลอกbytesเดิมเป็น [terminal-run.png](terminal-run.png) และ [terminal-check.png](terminal-check.png) ไม่แก้เนื้อหาภาพ ช่องว่างscreenshotผลstart/checkปิดแล้ว ดู [ผลตรวจหลักฐาน](TERMINAL_EVIDENCE_REVIEW.md)

ข้อความMISSINGในR1–R3ด้านล่างเป็นประวัติก่อนรับภาพ ส่วนหลักฐานWSL2ในอดีตยังUNVERIFIED ภาพใหม่แสดงOSwin32และไม่ใช้ยืนยันWSL2

Evidence files:

- `run-output.txt` - verified output from running `hello.js` with Node v24.14.0.

## R1 audit — 22 ตุลาคม 2026

- [ผลเวอร์ชันและ start/check รอบ R1](audit-r1-output.txt): Node v24.19.0, npm 12.2.0, Git 2.54.0.windows.1 บน Windows/PowerShell
- ก่อนแก้: `start` ผ่าน แต่ `npm run check` exit 1 เพราะไม่มี script
- หลังแก้: `start` และ `check` exit 0; checker คัดลอกจาก Instructor Starter ที่ commit `3e080d366483fe9b4a903d9f4dd318b5de4cd5dd` และเทียบ SHA256 ตรงกัน
- Screenshot ผล `npm run start`: **MISSING** ตาม LAB01 README อาจารย์ ยังต้องใช้ภาพ Terminal จริง ไฟล์ข้อความไม่แทน screenshot
- Remote WSL2 ตามข้อกำหนด Windows: **UNVERIFIED** รอบนี้ใช้ PowerShell ตามคำสั่งผู้เรียน ไม่อ้างว่าเป็น WSL2 หรือ macOS

## Reflection เรื่อง Git

Branch แยกงานระหว่างพัฒนากับ main, commit บันทึกการเปลี่ยนแปลงเป็นช่วง ๆ และ PR เปิดให้ตรวจ diff/ผลทดสอบก่อน merge ตัวอย่างจริงคือ PR #1 ของ Week 01 ที่ merge แล้ว ส่วน R1 อยู่บน `fix/labs-01-13-requirements-audit` และยังไม่ commit/push การมี tag ยืนยันเวอร์ชันที่ส่ง แต่ไม่ได้รับรองว่า requirement ทุกข้อครบ

ปัญหาใน R1 คือ script/checker ไม่ครบ Starter แก้โดยเติมไฟล์เดิมของอาจารย์และ script `check` ใช้ Codex ช่วยเปรียบเทียบ starter, รันทดสอบ และบันทึก evidence ไม่เปลี่ยน `hello.js` นักศึกษาควรทบทวน reflection ด้วยตนเองก่อนส่ง revision

## R2 — Manual Terminal Evidence ที่ยังขาด

สถานะ Screenshot: **MISSING** ยังไม่ได้สร้างไฟล์ภาพ ให้ผู้เรียนเปิด PowerShell ที่ Student Repository root แล้วรัน:

```powershell
node --version
npm --version
git --version
npm run start --prefix labs/week-01/source
npm run check --prefix labs/week-01/source
```

ใช้ Snipping Tool จับ Terminal จริงให้เห็นคำสั่ง เวอร์ชัน บรรทัด `Hello ... (68543210013-7)` และ `LAB 01 file structure check: PASS` บันทึกเป็น `labs/week-01/evidence/terminal-start-r2.png` ไม่เปิดไฟล์ environment หรือค่า secret ในภาพ ผลข้อความของ R1 ด้านบนยังเป็นหลักฐานเดิมและไม่แทน screenshot

## R3 — Screenshot ยัง MISSING

ตรวจไฟล์จริงแล้ว ยังไม่มีภาพ Terminal ที่แสดง `npm run start` ตามคำขอ R3 ให้ใช้ PowerShell รันคำสั่งด้านบนด้วยตนเอง เปิด Snipping Tool > New จับภาพคำสั่งและ output จริง บันทึกชื่อที่ใช้สำหรับรอบนี้เป็น `labs/week-01/evidence/terminal-run.png` (ใช้แทนชื่อที่แนะนำใน R2)

ยังไม่เพิ่มลิงก์ภาพที่ไม่มีอยู่ เมื่อผู้เรียนเพิ่มภาพจริงและตรวจว่าแสดงคำสั่ง/output ครบแล้ว จึงอัปเดตลิงก์และสถานะ ไม่ใช้ไฟล์ข้อความหรือภาพสร้างจากข้อความแทน Screenshot
