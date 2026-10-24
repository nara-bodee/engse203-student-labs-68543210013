# ENGSE203 LAB09 — SQL Fundamentals (CP17–CP25)

นรบดี บุญเลิศ · 68543210013-7

ไฟล์หลัก: `campus.db` คือฐานข้อมูลที่ส่ง, `schema.sql` ใช้สร้างโครงสร้างและ seed, `queries.sql` มี SELECT 8 ข้อ, [DATA_MODEL.md](DATA_MODEL.md) อธิบาย CP24 พร้อมหลักฐาน constraints CP25

## ตรวจอย่างปลอดภัยด้วย PowerShell

ใช้ Node >=22.12.0 ที่มี `node:sqlite` จาก Student Repository root ไม่ต้องติดตั้ง dependency เพิ่ม คัดลอกก่อนเพราะ checker มี INSERT/DELETE ทดสอบ:

```powershell
$auditCopy = Join-Path ([System.IO.Path]::GetTempPath()) ('engse203-lab09-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $auditCopy
Copy-Item -Path labs/week-09/source/* -Destination $auditCopy
node --disable-warning=ExperimentalWarning "$auditCopy/check-week09.mjs" --inclass
node --disable-warning=ExperimentalWarning "$auditCopy/check-week09.mjs"
```

R1: 11/11 In-Class + 16/16 Take-Home; Challenge 0/3 เป็น OPTIONAL รวม 27/30 ไม่ถือว่า checker รับรองเนื้อหา CP24 ทั้งหมด ต้องอ่าน DATA_MODEL ประกอบ รัน SELECT ทั้ง 8 ข้อและทดสอบ constraints 5 แบบบนสำเนาแล้วถูกปฏิเสธครบ ดู [ผลดิบ](../evidence/sql-audit-r1.json)

- [Pages Evidence Report](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-09/)
- [Merged PR #12](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/12), tag เดิม `lab-09-submission-v1`
- [Instructor LAB09](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-09-sql-fundamentals)

## References & AI Assistance

R1 ใช้ Codex ตรวจ schema จริง รัน SQL บนสำเนา เติม DATA_MODEL และ README ไม่แก้ต้นฉบับ SQL/DB ไม่อ้างว่าเป็นหลักฐานการเขียนด้วยตนเองในชั้นเรียน นักศึกษาต้องทบทวน query และเหตุผลของ constraints ก่อนส่ง revision
