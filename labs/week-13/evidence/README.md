# Week 13 — Authentication & Security Evidence

ชื่อคาบตามคู่มือ LAB13: ความปลอดภัยพื้นฐานและความพร้อมก่อนใช้งาน

ผลด้านล่างมาจากการรันจริงใน Phase 3D วันที่ 22 ตุลาคม 2026 บน Source Commit `2430c0ccf88a0bf0e4c3292630233da658e785f9` และตรวจว่าเนื้อหาที่ Commit ตรงกับไฟล์ที่ทดสอบ ไม่มีการแก้ Source ในขั้นเตรียมส่งนี้

## Checkpoint Results

- CP48–CP52: PASS 23/23 (In-Class)
- API Unit/Integration Tests: PASS 82/82
- Frontend Tests: PASS 3/3
- Week 12 Regression: PASS 20/20
- Production Configuration Probes: PASS 8/8

## Test Commands

รันจาก `labs/week-13/source/` โดยใช้ `DB_FILE=:memory:` และตัดค่าการเชื่อมต่อ Turso ออกจาก Process ที่ทดสอบ ไม่ใช้ฐานข้อมูลจริง

```powershell
npm test --prefix api
npm test --prefix frontend
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass
```

Production Configuration Probes รันด้วย Script ชั่วคราวภายนอก Repository ตามคำสั่งที่ใช้จริงในเครื่องนี้:

```powershell
node "$env:LOCALAPPDATA\Temp\engse203-week13-fixes-oO3R1U\production-config-check.mjs"
```

Script นี้ไม่ใช่ไฟล์ส่งงานและอาจถูกล้างจากโฟลเดอร์ Temp ภายหลัง ใช้ Child Process แยกเพื่อ Import Config โดยไม่เปิด HTTP Server และไม่แสดงค่า Secret โดยตรวจ 8 กรณี:

| Environment | JWT_SECRET | ผลที่ยืนยันได้ |
|---|---|---|
| production | ไม่มีตัวแปร | หยุดด้วย Exit Code 1 |
| production | ค่าว่าง | หยุดด้วย Exit Code 1 |
| production | ช่องว่างล้วน | หยุดด้วย Exit Code 1 |
| production | ค่าทดสอบสุ่มชั่วคราว | โหลด Config ได้และใช้ค่าที่กำหนด |
| development | ไม่มีตัวแปร / ค่าว่าง (2 กรณี) | โหลด Config ได้ |
| test | ไม่มีตัวแปร / ค่าว่าง (2 กรณี) | โหลด Config ได้ |

## Security Summary

- CP48: ตรวจชนิดข้อมูลและความยาวข้อความ; Body เกิน 10 KB ได้ JSON HTTP 413 — Checker PASS 4/4
- CP49: ใช้ scrypt กับ Salt สุ่ม 16 Bytes และ Key 64 Bytes; ตรวจ Scheme, Salt Hex 32 ตัว, Hash Hex 128 ตัว และจำนวนส่วนก่อนคำนวณ แล้วเทียบด้วย timingSafeEqual — Checker PASS 5/5
- CP49 Regression: เพิ่ม malformed hash 15 กรณี รวม `scrypt$abc$zz`, `scrypt$abc$0`, Hex/ความยาวผิด, Salt ผิด, Scheme ผิด, ส่วนขาด/เกิน และ Newline; Password Tests PASS 25/25 รวม Seed Hash เดิม
- CP50: JWT Login สำเร็จได้ HTTP 200; Payload มี role/exp ไม่มีรหัสผ่าน; Login ผิดและอีเมลไม่มีได้ HTTP 401 ข้อความเดียวกัน — Checker PASS 4/4
- CP51: ไม่มี Token/Token ปลอมได้ HTTP 401; Role ไม่ผ่านได้ HTTP 403; Staff PUT ได้ 200 และ DELETE ได้ 204; GET/POST ยังเปิดทั่วไป — Checker PASS 6/6
- CP52: Production ไม่มี Secret/ค่าว่าง/ช่องว่างล้วนต้อง Fail Fast; `.env.example` มีค่าว่าง; Production Error Response ไม่แสดง Stack Trace — Checker PASS 4/4

Malformed Hash Tests ถูกเพิ่มก่อนแก้ Implementation และพบข้อผิดพลาดจริง 6 กรณี ก่อนแก้ให้ผ่านทั้งหมด ฐานข้อมูลและ Lockfile ไม่เปลี่ยนจากการทดสอบ

## Related Source and Tests

- [Source README](../source/README.md)
- [Request Validator](../source/api/src/validators/requestValidator.js)
- [Password Verification](../source/api/src/utils/password.js)
- [Password Unit Tests](../source/api/tests/unit/password.test.js)
- [Authentication/Authorization Integration Tests](../source/api/tests/integration/auth.api.test.js)
- [Production Configuration](../source/api/src/config.js)
- [Environment Template](../source/api/.env.example)
- [Error Handler](../source/api/src/middleware/errorHandler.js)
- [Week 13 Checker](../source/check-week13.mjs)
- [Week 12 Regression Checker](../source/check-week12.mjs)

## Submission Status

- [PR #20: Week 13: Authentication & Security (CP48–CP52)](https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/20) **Merged แล้ว** เมื่อ 22 ตุลาคม 2026; Merge Commit `03d6447053db4bd185ec640688da1e6b1707f9be`
- Tag `lab-13-submission-v1` **สร้างและมีบน Remote แล้ว** ชี้ Merge Commit ข้างต้น ตรวจซ้ำใน R2 โดยไม่เปลี่ยน tag หรือ metadata
- GitHub Pages **Deployed แล้ว**: [workflow run 39787449218](https://github.com/nara-bodee/engse203-student-labs-68543210013/actions/runs/39787449218) สำเร็จสำหรับ commit นี้ และ [LAB13 Evidence Report](https://nara-bodee.github.io/engse203-student-labs-68543210013/labs/week-13/) ตอบ HTTP 200 ใน R2
- การตรวจใน Incognito ครบทุกกรณียังไม่ได้ยืนยันใน R2; ไม่ได้สร้าง Screenshot เพิ่มของ Week 13

ผลข้างต้นเป็นผล Tests/Checkers ของ Source ไม่ได้หมายความว่า Root Repository Verification ผ่านทั้งหมด

## Pages Build and Repository Verification

รันจาก Root Repository ใน Phase 4A:

```powershell
npm run build:pages
npm run verify:lab -- week-13
```

- Pages Build: PASS — 12 LABs; Week 13 แสดงเป็น Evidence Report (`hasPublish: false`)
- Repository Verification: 3 PASS, 0 WARN, 17 ERROR; Exit Code 1 — ยังไม่ผ่านทั้งหมด
- PASS: student-config, Node Version และ Week 13 structure/metadata/pages
- ERROR จาก LAB เก่า 14 รายการ; Week 13 อีก 3 รายการ คือ `api/node_modules`, `frontend/node_modules` และ `frontend/.env.production`
- สาเหตุ: Root Verifier สแกนไฟล์บนดิสก์ทุก LAB โดยไม่แยก Git-tracked/ignored files; `.env.production` ของ Frontend ใน Week 11 และ Week 13 เป็นไฟล์ที่ Git ติดตามอยู่
- ไม่ได้แก้ Root Verifier หรือลบ Environment Files, Dependencies หรือฐานข้อมูลเพื่อให้ผลตรวจผ่าน

## R2 Reverification — 22 ตุลาคม 2026

ส่วนนี้เป็นผลรันใหม่ใน R2 ไม่แทนที่ผล Phase 3D/4A ด้านบน:

- API Tests 82/82, Frontend 3/3, Week13 In-Class 23/23, Week12 Regression 20/20 ผ่านจากคำสั่งทดสอบข้างต้น
- Config probes แบบแยก process 8/8: production ไม่มี/ว่าง/ช่องว่างถูกปฏิเสธ; production ตั้งค่าทดสอบผ่าน; development/test/default ที่ไม่มีตัวแปรผ่าน; production ค่าทดสอบมีช่องว่างรอบค่าที่ไม่ว่างผ่าน ค่าใน probes ใช้เพื่อทดสอบเท่านั้น ไม่ใช้ secret จริงและไม่แสดง secret
- ตรวจ PR/Pages จาก GitHub และ tag refs จาก Git; source/tests/metadata ของ Week 13 คงเดิม
- Root Verifier รอบ R2: `npm run verify` = 14 PASS, 0 WARN, 22 ERROR และ `verify:lab -- week-13` = 3 PASS, 1 WARN, 22 ERROR; exit 1 ทั้งคู่ เพิ่มจาก R1 อีก 1 error เพราะไฟล์ Starter `week-12/source/frontend/.env.production` ที่คืนใน R2 ถูกสแกนชื่อไฟล์ด้วย เป็น known filename policy ไม่มี structural/metadata defect เพิ่ม ไม่ใช้ผล tests กล่าวว่าระบบ verifier ผ่าน

## References & AI Assistance

ดู [Source README](../source/README.md#references--ai-assistance) สำหรับ disclosure และ [Instructor LAB13](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-13-quality-security) ใช้ Codex ช่วยทดสอบ แก้ข้อบกพร่องตามขอบเขต Phase 3C และเตรียมเอกสารตามประวัติการทำงาน ใน R2 แก้เฉพาะเอกสารนี้กับ README ไม่แก้ source/tests หรือสร้าง submission ใหม่
