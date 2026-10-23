# Week 11 — Security Finding R2 (Read Only)

วันที่ 22 ตุลาคม 2026 · นรบดี บุญเลิศ 68543210013-7

## ข้อสรุป

Dependency `proxy-addr@2.0.7` อยู่ในช่วงที่ advisory จัดเป็น Critical แต่ source และ runtime ที่ตรวจใช้ `trust proxy=false` ไม่พบการใช้ IP บังคับสิทธิ์หรือ rate limit และไม่พบ trust subnet ที่เป็นเงื่อนไขของช่องโหว่ จึงยังไม่มีหลักฐานว่าแอปนี้ถูกโจมตีผ่าน advisory นี้ได้ ความเสี่ยงเฉพาะบริบทที่ตรวจจัดเป็น **Medium — ควรแก้ dependency ในรอบแยก** โดยไม่สรุปว่าระบบปลอดภัยทั้งหมด

R2 ไม่เปลี่ยน package.json, package-lock.json, dependencies, business logic หรือ Render configuration

## Finding R2-W11-01 — Vulnerable transitive proxy parser

- Rule: EXPRESS-DEPS-001 / EXPRESS-PROXY-001
- Advisory severity: Critical, CVSS 9.1; contextual risk: Medium (maintenance priority; exploit precondition ไม่ปรากฏใน source ที่ตรวจ)
- Advisory: [GHSA-jqcg-44mw-7w3h / CVE-2026-90711](https://github.com/advisories/GHSA-jqcg-44mw-7w3h)
- Affected versions: `>=1.1.0 <2.0.8`; patched version: `2.0.8`
- Conditional impact: หากตั้ง trust subnet ผิดตามเงื่อนไข advisory ผู้ส่ง request อาจปลอม client IP ผ่าน X-Forwarded-For และกระทบระบบที่ใช้ IP ตัดสินสิทธิ์หรือ rate limit ได้ เงื่อนไขนี้ยังไม่พบในแอปที่ตรวจ

### Dependency chain และตำแหน่งหลักฐาน

```text
api/package.json:19 — express ^5.1.0
api/package-lock.json:1405–1430 — express 5.2.1 → proxy-addr ^2.0.7
api/package-lock.json:2033–2040 — proxy-addr 2.0.7
npm explain proxy-addr → express@5.2.1 → proxy-addr@2.0.7
```

อ้างอิง [package.json](../source/api/package.json), [lockfile](../source/api/package-lock.json), [createApp](../source/api/src/app.js) และ [requestRoutes](../source/api/src/routes/requestRoutes.js)

### Application inspection

- `api/src/app.js:11–18` สร้าง Express, เปิด CORS และ morgan; ตรวจทั้งไฟล์ไม่พบ `app.set('trust proxy', ...)`
- `api/src/routes/requestRoutes.js:8–12` ใช้ controllers/validation ตาม LAB; ไม่มี IP allow/deny middleware
- ค้นทั้ง API/frontend source และ deployment manifest ไม่พบ `req.ip`, `req.ips`, `remoteAddress`, trust subnet, IP allowlist/denylist หรือ rate-limit implementation ที่ใช้ IP บังคับสิทธิ์
- `api/src/app.js:18` ใช้ morgan combined ใน production ซึ่งอาจอ่าน IP เพื่อ logging ตาม Express semantics การ logging ไม่ใช่ IP-based authorization

Runtime probe นอก repo สร้าง app เดิมและ request object ทดลองในเครื่อง (ไม่เปิด endpoint ใหม่ ไม่แก้ source) ใส่ remote socket `127.0.0.1` กับ X-Forwarded-For `203.0.113.9` ได้:

```json
{"trustProxy":false,"ip":"127.0.0.1","ips":[],"trustHop0":false}
```

ผลสอดคล้องกับ [Express behind proxies](https://expressjs.com/en/guide/behind-proxies.html): default false ใช้ socket IP และการเปิด trust proxy ต้องตรงกับ topology จริง ไม่ควรตั้ง true เพื่อแก้ audit warning

### ผล audit จริง

รันจาก `labs/week-11/source/api/`:

```powershell
npm explain proxy-addr
npm audit --omit=dev --json
```

Audit exit 1: Critical 1, High 0, Moderate 0 สำหรับ runtime dependency `proxy-addr` นี่เป็นข้อมูล package vulnerability ไม่ใช่ผลพิสูจน์ exploit ของแอป

### Render impact และสิ่งที่ยังไม่ยืนยัน

`render.yaml:7–16` ระบุ branch `unit4/week-11`, rootDir `labs/week-11/source`, build/start, health path และ NODE_ENV production โดยไม่มีการตั้ง Express trust subnet สอดคล้องกับ [Render Web Services](https://render.com/docs/web-services) ที่ให้ public web service และ TLS

เมื่ออยู่หลัง proxy, default trust=false อาจทำให้ IP ที่แอปเห็น/log เป็น IP ของ proxy แทนผู้ใช้จริง ไม่พบการนำ IP นั้นไปอนุญาตสิทธิ์ใน source จึงยังไม่พบเส้นทาง bypass ตาม advisory นี้ แต่ไม่ได้เปิด Render Dashboard หรือยืนยัน dependency artifact/commit/topology ที่ใช้งานบน Render ปัจจุบัน จึงไม่อ้างว่า probe ในเครื่องพิสูจน์สภาพ cloud ทุกอย่างแล้ว

### แผนแก้ที่กระทบน้อยที่สุด — หลังได้รับอนุมัติใหม่

1. ทดลองอัปเดตเฉพาะ transitive `proxy-addr` เป็น patch ที่แก้แล้วอย่างน้อย 2.0.8 บนสำเนา/branch งาน security โดยคง Express 5.2.1 ไว้ Range `^2.0.7` ที่ Express ระบุรองรับ patch นี้อยู่แล้ว ไม่จำเป็นต้องเพิ่มเป็น direct dependency หรือขยับ Express major
2. ให้ package manager resolve และสร้าง lockfile ตรวจ diff ว่า package.json เดิมไม่เปลี่ยนและ lockfile จำกัดที่ dependency ที่จำเป็น หากคำสั่งทำให้ diff กว้าง ให้หยุดเลือกวิธีใหม่ ไม่ใช้ `npm audit fix --force` และไม่แก้เลข version/integrity ใน lockfile ด้วยมือ
3. ตรวจด้วย `npm ci`, `npm explain proxy-addr`, `npm audit --omit=dev`, API tests 7/7, Week11 checker required 37/37 และจำลอง production port10000 ทั้งหน้าแรก, /about, health และเพิ่มคำร้อง ใช้ DB สำเนา
4. ตรวจ logging และ forwarded-header behavior ตาม proxy topology จริงก่อน deploy และยืนยัน deployment artifact ใหม่หลัง rollout ห้ามเปิด trust proxy=true โดยคาดเดา R2 ไม่ทำขั้น update/deploy ใด ๆ

## References & AI Assistance

ใช้ Codex อ่าน lockfile/source, รัน explain/audit และ runtime probe แล้วจัดทำ finding นี้ตามขอบเขต read-only ใช้ advisory, Express และ Render docs จากแหล่งหลัก การไม่มี pattern จากการค้นใน repo ไม่ยืนยันว่าไม่มีการตั้งค่าเพิ่มเติมนอก repo
