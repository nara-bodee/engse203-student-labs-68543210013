# Week11 — Proxy parser remediation และสถานะหลักฐาน

วันที่ 23 ตุลาคม 2026 · Draft PR #29 · worktree `fix/week-11-v3`

## R2-W11-01: แก้ใน revision branch แล้ว / การใช้งานบน cloud ยังไม่ยืนยัน

ตรวจ [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) และ npm registry ใหม่ พบ `proxy-addr@2.0.7` ได้รับผลกระทบและมีแพตช์ `2.0.8` จริง ก่อนแก้ `npm audit --omit=dev --json` exit 1: critical 1

ใช้ `npm update proxy-addr --package-lock-only --ignore-scripts --no-audit --no-fund` จาก API แล้ว `npm ci --ignore-scripts` ให้ติดตั้งตาม lockfile ใหม่ การเปลี่ยน dependency มีเพียง entry `proxy-addr` (version, resolved, integrity และ funding metadata) ใน `api/package-lock.json` Express ยังเป็น 5.2.1 และ `package.json` ไม่เปลี่ยน ไม่เพิ่ม direct dependency/override ไม่ใช้ audit fix/force และไม่แก้ checker

`npm explain proxy-addr` ยืนยัน Express 5.2.1 → proxy-addr 2.0.8 ผ่าน range เดิม `^2.0.7` หลังแก้ runtime audit exit 0: vulnerabilities 0 นี่เป็นผล audit ของ runtime dependency ใน worktree ไม่ใช่คำรับรองว่าทั้งระบบไม่มีช่องโหว่

## Regression ที่รันจริง

| ตรวจ | ผล |
|---|---|
| API tests เดิม | 7/7 PASS ก่อนเพิ่ม security regression |
| `npm test --prefix api` รวม security regression | 10/10 PASS |
| `npm run build --prefix frontend` | PASS |
| `node --disable-warning=ExperimentalWarning check-week11.mjs` | Required 37/37 + Optional 4/4 = 41/41 |
| Production HTTP probe บน localhost พอร์ตเดียว | 8/8 PASS |
| `npm audit --omit=dev --json` หลังแก้ | exit 0, vulnerabilities 0 |

Security regression ใน [proxy-addr.security.test.js](../source/api/tests/proxy-addr.security.test.js) resolve dependency ที่ Express ใช้จริง ตรวจ IPv6 subnet prefix สั้นไม่เชื่อ IPv4/mapped client และไม่รับ X-Forwarded-For ปลอม, subnet ที่เขียนถูกยังทำงาน, app ยัง `trust proxy=false` และใช้ socket IP ไม่ใช้ IP จาก header ที่ไม่เชื่อถือ ไม่เปิด trust proxy เพื่อทำให้ผล audit ผ่าน

Production probe ใช้ `NODE_ENV=production`, `DB_FILE=:memory:` และ server bind `127.0.0.1` ตรวจ `/`, `/about` ได้ HTML, health ต่อฐานข้อมูล, POST201, GET200 อ่านรายการใหม่, PUT200 response status, DELETE204, unknown API404 ไม่มี stack ใน response ทดสอบกับ service/schema จริง แต่ **ไม่ได้ทดสอบ restart persistence** จาก memory DB และไม่ใช้แทนวิดีโอ CP42 ไม่มีการแก้ tracked campus.db

Raw output: [revision-verification.txt](revision-verification.txt), [production-probe.json](production-probe.json), [audit-runtime-after.json](audit-runtime-after.json)

Frontend locked install รายงาน **3 high vulnerabilities** เป็น known issue แยกจาก runtime finding นี้ ไม่ขยาย scope ไปแก้ dev tooling หรืออ้างว่า audit ทั้ง frontend ผ่าน ไม่ update dependencies/lockfile ของ frontend

## วิดีโอ CP42 และขอบเขต cloud

ตรวจ [DEMO.md](../source/DEMO.md) พบลิงก์ SharePoint วิดีโอ A และ B ครบสอง URL ไม่มีไฟล์วิดีโอ local ใน LAB11 การตรวจ HTTP แบบไม่ส่ง cookie/ไม่ login ได้ 302 ทั้งสองลิงก์ ซึ่งไม่พิสูจน์ว่าเล่นวิดีโอได้หรือผู้สอนมีสิทธิ์

**UNVERIFIED:** ผู้ใช้ยืนยันในรอบนี้ว่า “ยังไม่ได้ยืนยันสิทธิ์หรือเนื้อหา” จึงไม่ใช้ checkbox `[x]` ใน DEMO.md เป็นหลักฐานว่าได้ทวนวิดีโอแล้ว ต้องให้ผู้ใช้ตรวจ A: CRUD/health/restart/production และ B: เปิด source อธิบาย frontend → routes → controller → service → SQLite/config/health/dev vs prod พร้อมยืนยันผู้สอนเปิดได้ หากส่วนใดขาดจึงบันทึกใหม่

**OPEN — deployment validation:** ยังไม่ได้ deploy revision นี้หรืออ่าน Render dashboard/artifact จึงไม่ทราบว่าระบบที่ให้บริการจริงใช้แพตช์ใหม่หรือไม่ คงข้อจำกัด proxy topology จาก R2 และไม่เปลี่ยน Render configuration ระหว่างรอบนี้

PR ยังเป็น Draft ไม่ merge/tag จนหลักฐานบังคับครบและผ่าน review รักษา submission tags เดิม และเก็บ R2 เป็นประวัติก่อน remediation ใช้ Codex ตรวจ advisory, package manager diff, รัน regression และบันทึกผลจริง
