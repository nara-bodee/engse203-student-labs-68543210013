# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Codex AI Assistant | วางแผนและทำ LAB05A ตาม CHECKPOINT_CARDS 5A | Route matrix, Dashboard read path, Service read path, Request Detail | รัน `npm run check -- --session=1` ได้ 104/104 และ `npm run build` ผ่าน | ยอมรับโค้ดที่ตรงกับ starter checker และคู่มือ LAB05A |
| Codex AI Assistant | ทำ LAB05B persistence/recovery ตาม CHECKPOINT_CARDS 5B | `requestStorage.js`, `requestService.js`, New Request, Reset, cleanup guard | รัน `npm run check` ได้ 133/133 และ `npm run build` ผ่าน | ยอมรับโค้ดที่ไม่เพิ่ม library และไม่ใช้ความรู้นอก Week01-05 |
| Edge Headless Screenshot | เก็บภาพ evidence จากแอป local ที่รันจริง | ภาพใน `images/` สำหรับ form validation, persistence, reset, detail และ storage | ตรวจว่าไฟล์ PNG ถูกสร้างใน `evidence/images` และ checker ยังผ่าน 133/133 | ใช้เป็นหลักฐานประกอบ TEST_REPORT |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้

## Correction — 2026-10-24 post-audit remediation

The table and checked learner statements above are historical, not a new attestation. Audit found that the claimed cleanup guard was absent from both Effects and some screenshots did not prove their named cases. This correction does not backdate a PASS.

Codex added minimal ignore guards and a17-case callback harness:14 failures before,17/17 PASS after; unchanged checker133/133 and build PASS on Node22.23.4. CUA browser checks used real isolated source/synthetic local data. PNGs are format conversions of actual JPEG captures with provenance; no simulated screenshot. Original report/image bytes are preserved in legacy-pre-audit.

The callback harness is not React DOM E2E. Full keyboard navigation and InPrivate remain UNVERIFIED; pages-incognito.png is MISSING. The peer checklist was not rerun with its named tester. See current TEST_REPORT for partial results/manual steps. The assistant makes no new learner-understanding attestation.

## Screenshot followup — 2026-10-24

Codex retried native GUI automation at the user's explicit request. Real Microsoft Edge InPrivate opened successfully; dashboard/new/detail/about/unknown hash URLs refreshed correctly, and the native capture includes URL/InPrivate chrome. images/pages-incognito.png and SCREENSHOT_FOLLOWUP.json now close the screenshot gap. Current case counts:18 PASS/5 WARNING/1 UNVERIFIED. Earlier missing-image statements above describe the initial attempt; full keyboard and partial-case limitations still apply. PNG encoding preserves decoded capture pixels without compositing, cropping or generation.
