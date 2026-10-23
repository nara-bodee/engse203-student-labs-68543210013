# Week 12 — Testing & Debugging Evidence

## R3 — คืน Seed Data และตรวจผลหลัง Reset

วันที่ 22 ตุลาคม 2026 ได้รับอนุมัติให้คืนเฉพาะ `api/data/campus.db` ด้วย script เดิม ไม่แก้ schema, setup script, source หรือ tests ข้อความ seed INCOMPLETE ใน R2 ด้านล่างเป็นสถานะก่อนแก้

ก่อนแก้ตรวจแบบ read-only: users 4, requests 4; ขาดเพียง REQ-002 ไม่มีแถวเกิน ข้อมูลทุกคอลัมน์ที่ระบุใน seed ของแถวที่เหลือตรง schema, FK/integrity ผ่าน โครงสร้างตรงกันหลังปรับ LF/CRLF เพื่อเปรียบเทียบ `created_at` เป็นค่า default เวลาเริ่มสร้าง จึงบันทึกแยกจากคอลัมน์ seed ที่ระบุค่าคงที่

ไม่พบ listener 3001/5173, ปิด connection ที่ใช้ตรวจทุกครั้ง และเปิด DB แบบ exclusive read ได้แล้วปิดก่อนสำรอง `DB_FILE` ไม่ได้ตั้งค่า; script ไม่โหลด `.env` และใช้ path `api/data/campus.db` จากตำแหน่ง script โดยตรง สำรองนอก repository และตรวจ SHA-256 ตรงก่อนรัน:

```powershell
# จาก labs/week-12/source/
npm run db:reset --prefix api
npm test --prefix api
npm test --prefix frontend
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass
```

ผลจริง: reset exit 0; users 4, requests 5, IDs REQ-001 ถึง REQ-005 ครบ; REQ-002 เป็น `in-progress`; คอลัมน์ seed ทุกแถวตรง schema; `PRAGMA integrity_check` = `ok`, `PRAGMA foreign_key_check` ไม่พบรายการผิด

API 29/29 (unit 15 + integration 14), Frontend 2/2 และ CP44–CP47 20/20 ผ่านทั้งหมด exit 0 Tests/checker ใช้ `:memory:` และไม่ใช้ Turso หลังทดสอบ DB ยังมี seed 5 แถวและ SHA-256 ไม่เปลี่ยนจากหลัง reset

- [ผลตรวจ seed ก่อน/หลังและ hash](seed-r3.json)
- [Output จาก reset/tests/checker จริง](r3-test-output.txt)
- DB เดิม SHA-256: `49996529718F54EECB7C64FD14E2272051D9A965771FEADF430CAFAAC9078654`
- DB หลัง reset/หลัง tests SHA-256: `079E62A568AF02D400D9EEDE69762B39459EF8F09EC8FCEDD19D527E5EE38914`

สาเหตุที่ tests เดิมผ่านแม้ไฟล์ DB ขาดข้อมูล: tests สร้างข้อมูลจาก schema ในหน่วยความจำ ไม่ได้ตรวจ binary ที่ส่งงาน ส่วน `db:setup` ไม่เปลี่ยน DB ที่มีอยู่แล้ว R3 ใช้ Codex ช่วยตรวจ/สำรอง/เรียก reset ตามคู่มือและบันทึกผล ไม่มีการเปลี่ยน logic หรือแก้ tag เก่า งานยังอยู่ใน local working tree รออนุมัติ Stage/Commit

## R2 — คืน Starter Configuration และทดสอบใหม่

วันที่ 22 ตุลาคม 2026 คืน `api/.env.example`, `frontend/.env.example`, `frontend/.env.production` จาก Instructor commit `3e080d3` ตรง Git blob ทั้ง 3 ไฟล์ Turso fields ว่าง และ production ใช้ `VITE_API_BASE_URL=` ว่าง ไม่ใช้ secret จริง ไม่แก้ `.gitignore` และยังไม่ Stage ไฟล์เหล่านี้จึงยัง ignored/untracked ต้อง force-add เฉพาะ path เมื่อได้รับอนุญาต

ผลใหม่บนสำเนาที่ติดตั้งด้วย `npm ci` จาก lockfile และไม่มี `.env`/dependencies เดิม: API 29/29, Frontend 2/2, In-Class CP44–CP47 20/20 และ frontend build ผ่าน Tests/checker ใช้ DB แยกจาก `campus.db` จริง ข้อความ MISSING ในส่วน R1 ด้านล่างเป็นสถานะก่อนคืน templates ไม่ใช่สถานะไฟล์ใน Working Tree หลัง R2

Development จาก `.env`/`.env.local` ที่ copy templates เปิด API 3001 และ Frontend 5173 ได้ HTTP 200 และ CORS ตรง origin แต่พบ **INCOMPLETE seed data เดิม**: สำเนาไฟล์ `api/data/campus.db` ที่ Git ติดตามมี REQ-001/003/004/005 รวม 4 รายการ ขาด REQ-002 (in-progress) ขณะที่ `schema.sql` สร้าง 5 รายการ Tests ผ่านเพราะใช้ schema ในหน่วยความจำ และ `db:setup` ไม่เขียนทับ DB ที่มีอยู่แล้ว

In-Class Guide ระบุให้คืน DB เป็นค่าเริ่มต้นก่อนส่งเมื่อมีการเพิ่ม/ลบระหว่าง debug R2 เก็บหลักฐานจากสำเนาและรายงานเพื่อขออนุมัติแก้ข้อมูลแยกภายหลัง ไม่ reset หรือแก้ฐานข้อมูลจริง และไม่แก้ source/tests เพื่อกลบความต่างนี้

## References & AI Assistance — R1

นรบดี บุญเลิศ · 68543210013-7 ใช้ Codex ในรอบ R1 เพื่ออ่าน source/requirements, รัน tests, coverage และ checker แล้วเทียบกับรายงานเดิม ไม่เปลี่ยน source/tests ของ LAB12 และไม่อ้างว่ารอบนี้พิสูจน์ลำดับการเขียน test ก่อน implementation ในอดีต

อ้างอิง [Instructor LAB12](https://github.com/se-rmutl/engse203-lab/tree/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-12-testing-debugging) ผลวันที่ 22 ตุลาคม 2026: API 29/29, Frontend 2/2, CP44–CP47 20/20; API coverage statements 73.64%, lines 75.52%, branches 64.36%, functions 54.28% เกณฑ์ statements >=85% เป็น Challenge จึงไม่เพิ่ม tests เพื่อไล่คะแนนใน R1

**MISSING จาก Starter:** ตรวจแล้วไม่มี `api/.env.example`, `frontend/.env.example` และ `frontend/.env.production` ทั้งในเครื่องและ Git โดย guide ระบุให้คัดลอก `api/.env.example` ก่อนใช้ dev script ข้อบังคับ CP44–CP47/tests ที่ตั้ง DB ในหน่วยความจำยังผ่าน แต่ไม่ถือว่าวิธีเตรียม development ครบแล้ว ต้องพิจารณา config templates ใน R2 ไม่เติม config หรือแก้ `.gitignore` ใน R1

## Checkpoint Results

- CP44–CP47: PASS 20/20
- Backend Unit Tests: PASS 15/15
- Backend Integration Tests: PASS 14/14
- Frontend Tests: PASS 2/2
- Total Tests: PASS 31/31

## Test Commands

รันจาก labs/week-12/source/

- npm test
- node --disable-warning=ExperimentalWarning check-week12.mjs --inclass

## Debugging

- BUG #0: แก้ Validation ขอบเขต 10 ตัวอักษร
- BUG #1: แก้ Request ID ซ้ำหลังลบรายการ
- BUG #2: แก้ Dashboard นับ in-progress ผิด
- BUG #3: แก้ PUT คำร้องที่ไม่มีอยู่ให้ตอบ 404

## Related Documents

- [TEST_CASES.md](../source/TEST_CASES.md)
- [DEBUG_LOG.md](../source/DEBUG_LOG.md)
- [BUG_REPORTS.md](../source/BUG_REPORTS.md)

หมายเหตุ: ผลทดสอบเป็นส่วน In-Class
