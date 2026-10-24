# Week07 — Revision verification follow-up

23 ตุลาคม 2026 · worktree `fix/week-07-v2` · Draft PR #26

> อัปเดต24ตุลาคม: ผู้ใช้เพิ่มภาพTerminalและNetworkแล้ว ตรวจครบตาม [SCREENSHOT_EVIDENCE_REVIEW.md](SCREENSHOT_EVIDENCE_REVIEW.md) ข้อความMISSINGด้านล่างเป็นประวัติก่อนภาพใหม่

## ผลทดสอบที่รันใหม่จริง

| คำสั่ง | ผล |
|---|---|
| `node labs/week-07/source/check-week07.mjs` | Required 33/33 (25+8), Optional 1/3; รวม 34/36 |
| `npm test --prefix labs/week-07/source/api` | 6/6 PASS |
| `npm run test:cp13 --prefix labs/week-07/source/frontend` | 8/8 PASS |
| `npm run build --prefix labs/week-07/source/frontend` | PASS |
| `npm run check --prefix labs/week-07/source/frontend` | **116/136, exit 1 — ไม่ผ่าน** |

Raw output จริง: [revision-test-output.txt](revision-test-output.txt)

ใช้ `npm ci --ignore-scripts` จาก lockfiles API/frontend เดิม ไม่มี version/lockfile เปลี่ยน Checker รอบแรกได้ Required 27/33 เพราะ import `supertest` จาก source root ไม่พบ (exit 0 จึงต้องอ่านรายข้อ) จัด dependency สำหรับ checker ใน worktree โดยไม่แก้ checker/package manifests: `npm install --no-save --package-lock=false --ignore-scripts supertest@7.2.2` ที่ repository root ของ worktree ใช้เวอร์ชันเดียวกับ API lockfile แล้วรันใหม่ได้ 33/33 ผลก่อนเตรียม dependency ไม่ใช่ application regression

การอ่าน lockfile ด้วย PowerShell ครั้งแรกขาด `-AsHashtable` จึง resolve version ไม่ได้และติดตั้ง supertest ล่าสุดชั่วคราว จากนั้นแก้การอ่าน ติดตั้ง 7.2.2 ตาม lockfile และยืนยันผล checker ใหม่กับเวอร์ชันที่ถูกต้องแล้ว ไม่มี manifest/lockfile ถูกแก้เพื่อเหตุนี้

Legacy failures ทั้ง 20 ข้อตรงกับ R5B: 11 LAB05-specific (LocalStorage/ข้อห้าม direct fetch/direct Node import ไม่มี Vite env) และ 9 Week07-relevant static/import failures หลาย runtime cases ไม่ได้ execute เพราะ import ล้มเหลว ไม่เปลี่ยน service กลับ LocalStorage ไม่แก้ checker และไม่อ้างว่า legacy ผ่าน ผล service probe เดิมใช้ mocked responses ไม่แทน Browser E2E

Locked API install ยังรายงาน vulnerability เดิม 8 (3 moderate/2 high/3 critical) เป็น known issue แยกจาก functional tests ไม่ใช้ audit fix/update เพื่อทำให้ checker ผ่านใน Week07

## Cleanup และ CP13 ยังอยู่ครบ

ตรวจ [cleanup-integrity.json](cleanup-integrity.json): A ลบครบ 49 paths ตรง manifest เดิม, B ทั้ง 49 counterparts ยังอยู่, approved files เดิม 10 ไฟล์ hash ตรง snapshot รวม CP13 fix/regression/evidence เดิม และ A กู้คืนได้จาก commit `03d6447053db4bd185ec640688da1e6b1707f9be` ไม่ลบ source B หรือแก้ source/tests เพิ่ม

Handler อยู่ใน component scope ตาม fix เดิม: กดปุ่ม → `updateRequestStatus` → PUT → API ตอบ JSON → `setRequest(updated)`; กรณี error แสดงข้อความและคง request เดิม การทดสอบ regression ยืนยัน logic นี้ แต่ไม่ใช้แทน browser timing/double-click test

## HTTP request/response และข้อจำกัด Browser

[cp13-http-followup.json](cp13-http-followup.json) เป็นผล HTTP จริงจาก Node fetch ไปยัง app/service ของ worktree ที่ bind localhost และใช้ seed ในหน่วยความจำ:

- PUT `/api/requests/REQ-001`, body `{"status":"in-progress"}` → 200, response id/status ตรง; GET ต่อมาเป็น in-progress
- PUT body `{"status":"completed"}` → 200, response status completed; GET ต่อมาเป็น completed
- PUT status ผิด → 400 และ GET ยังคง completed

**นี่ไม่ใช่ Browser Network-panel capture** ไม่ได้อ้างว่าการทดสอบ HTTP จาก Node ตรวจ CORS/UI persistence แทน Browser ได้ หลักฐาน Browser R5C เดิม (In Progress/Completed/refresh/offline) ยังคงอยู่ใน [CP13 regression report](CP13_REGRESSION_R5A.md)

Computer Use หยุดก่อนตรวจหน้า Week07 เพราะยืนยัน browser URL ไม่ได้ จึงหยุดควบคุม UI ไม่สร้างภาพจำลอง Test servers ของ agent ปิดแล้ว ไม่แก้ฐานข้อมูลจริง

## หลักฐานที่ผู้ใช้ยังต้องทำ

**MISSING:** `images/terminal-api.png`, Browser Network Headers/Payload/Response screenshots; browser inflight/repeat timing ยัง **UNVERIFIED** ไม่มี link ภาพที่ยังไม่มีอยู่ PR คง Draft ไม่ merge/tag

ตรวจพอร์ต 5317/5517 ว่าง แล้วเปิด PowerShell สามหน้าต่างจาก worktree นี้:

```powershell
# หน้าต่าง API
Set-Location 'D:\SEYear2\ENGSE203\revision-worktrees\week-07-v2'
$env:PORT='5317'
$env:CORS_ORIGIN='http://localhost:5517'
$env:NODE_ENV='development'
npm start --prefix labs/week-07/source/api
```

```powershell
# หน้าต่าง Frontend
Set-Location 'D:\SEYear2\ENGSE203\revision-worktrees\week-07-v2'
$env:VITE_API_BASE_URL='http://localhost:5317'
npm run dev --prefix labs/week-07/source/frontend -- --host localhost --port 5517 --strictPort
```

```powershell
# หน้าต่างส่ง GET ให้เห็น HTTP log ที่หน้าต่าง API
Invoke-RestMethod 'http://localhost:5317/api/requests'
```

ถ่ายหน้าต่าง API จริงให้เห็น start/port และ GET200 บันทึก `labs/week-07/evidence/images/terminal-api.png`
เปิด `http://localhost:5517/requests/REQ-001`, DevTools > Network ก่อนกด In Progress เลือก PUT ที่ตรง ID ตรวจ Headers: URL/method/200, Payload: status, Response: id/status ตรง และ UI ใช้สถานะที่ตอบกลับ ถ่ายภาพจริง (อาจแยก headers/payload/response) เช่น `cp13-network-put-200.png`, `cp13-network-payload.png`, `cp13-network-response.png` ใน images/ ของ worktree นี้ ไม่แสดง secrets/cookies ทดสอบ Completed/refresh และหยุดเฉพาะ API ด้วย Ctrl+C แล้วกดเปลี่ยนสถานะเพื่อยืนยัน error ไม่เปลี่ยนสถานะเดิม จากนั้นปิด test frontend ของตนด้วย Ctrl+C

ใช้ Codex รัน tests, ตรวจ Git manifest/hash, ส่ง HTTP ไป local seed และบันทึกผลจริง ไม่สร้าง screenshot/ผลทดสอบแทนหลักฐานที่ขาด
