# Week01 — ตรวจภาพ Terminal ที่ผู้ใช้เพิ่ม

24 ตุลาคม 2026 (Asia/Bangkok) · PR #21

ผู้ใช้เพิ่ม2ภาพในprimarycheckoutและขอให้ตรวจใหม่ Codexอ่านภาพจริงจากไฟล์ ไม่สร้างภาพ/แต่ง/cropเพิ่ม คัดลอกเข้าrevisionworktreeด้วยชื่อมาตรฐานโดยรักษาbytesต้นฉบับ ต้นฉบับผู้ใช้ยังอยู่ที่เดิม

| ภาพผู้ใช้ | ไฟล์ในPR | ข้อความที่เห็น |
|---|---|---|
| npm run start.png | [terminal-run.png](terminal-run.png) | npmstart→node src/hello.js; Hello นรบดี บุญเลิศ (68543210013-7), OSwin32, Nodev24.19.0 |
| npm run check.png | [terminal-check.png](terminal-check.png) | npmcheck→node scripts/check-lab01.mjs; LAB01 file structure check: PASS |

SHA256start: `17902e648f537a231ca89dded3eccc4f17a9582a966b88e7bec552535cb27f08`

SHA256check: `ae1eb251a97b6af517b021acc211294e77a6b205149e1a9f717930168ffa64ea`

ชื่อ/รหัสตรงmetadataและsource ผลภาพตรงกับการรันCLIใหม่ในrevisionworktree: start/check exit0ทั้งสอง ไม่พบsecret/token/passwordในข้อความที่มองเห็น ไม่อ้างOCR/EXIFauditหรือพิสูจน์ประวัติการถ่ายภาพนอกเหนือจากสิ่งที่เห็นและคำแจ้งผู้ใช้

คู่มือLAB01กำหนดscreenshotผลnpmrunstart ไม่ได้กำหนดชื่อไฟล์ภาพตายตัว ภาพstartมีผลที่กำหนดครบและภาพcheckยืนยันPASSเพิ่ม จึงปิดช่องว่างscreenshotได้โดยไม่ขอให้ผู้ใช้รวมภาพ/ถ่ายซ้ำ ข้อมูลversionsnpm/Gitมีtextlogsเดิม ภาพนี้ไม่แสดงคำสั่งversionsnpm/GitหรือVSCodeRemoteWSL2 จึงคงข้อจำกัดhistoricalWSL2UNVERIFIEDและไม่อ้างว่าครบหลักฐานenvironmentทุกประเด็น

PRปรับเฉพาะWeek01evidence/metadata/Pages ไม่มีการแก้hello.jsหรือinstructorcheckerเพิ่ม คำว่าMISSINGในรายงานเก่าเป็นผลก่อนภาพใหม่นี้ ไม่ใช้เป็นสถานะปัจจุบัน
