# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** 68543210013  
**OS / Browser / Node:** Windows / Microsoft Edge Headless / v24.19.0  
**Branch / Commit:** `lab/week-05-b` / latest pushed

กรอก Actual result จากการรันจริง ใช้ `PASS`, `FAIL` หรือ `NOT RUN` และอ้างหลักฐานแบบ relative path

| Test ID | Preconditions / procedure summary | Actual result | Status | Evidence / Notes |
|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | แสดง Dashboard พร้อม Summary Cards และรายการคำร้องทั้งหมด | PASS | `images/persistence-add-refresh.png` |
| TC-L5-02 | ใช้ navigation 3 รายการ | สลับไปยัง Dashboard, New Request, About ได้ถูกต้องผ่าน `NavLink` | PASS | Navigation Bar |
| TC-L5-03 | เปิด/refresh `#/requests/new` | เปิดหน้าฟอร์มสร้างคำร้องใหม่และคงอยู่เมื่อ refresh | PASS | `images/form-validation-error.png` |
| TC-L5-04 | เปิด `#/requests/REQ-001` | แสดงรายละเอียดคำร้องรหัส REQ-001 ครบถ้วน | PASS | `images/route-detail-found.png` |
| TC-L5-05 | เปิด `#/requests/REQ-999` | แสดงข้อความไม่พบคำร้องรหัส REQ-999 และมีลิงก์กลับหน้าหลัก | PASS | Request Detail not found state |
| TC-L5-06 | เปิด `#/unknown` | แสดงหน้าไม่พบเส้นทางจาก catch-all route `*` | PASS | NotFoundPage component |
| TC-L5-07 | ลบ LAB05 key แล้วเปิด Dashboard | โหลด seed JSON มาแสดงและเขียนข้อมูลลง localStorage ใหม่ | PASS | `images/storage-localstorage-devtools.png` |
| TC-L5-08 | สังเกตช่วง latency | แสดง LoadingState ระหว่างรอ delay ก่อนแสดงข้อมูล | PASS | `waitForLabDelay()` |
| TC-L5-09 | เปิด `#/?scenario=error` | แสดง ErrorState พร้อมปุ่มลองอีกครั้ง | PASS | ErrorState scenario |
| TC-L5-10 | กด Retry | ลบ scenario จาก URL หรือ reload ผ่าน `useManualReload` แล้วโหลดข้อมูลสำเร็จ | PASS | `useManualReload` hook |
| TC-L5-11 | เปิด `#/?scenario=empty` | แสดง EmptyState เมื่อโหลดสำเร็จแต่ไม่มีรายการ | PASS | EmptyState scenario |
| TC-L5-12 | รัน public checker | ตรวจผ่านสัญญาทั้งหมด 133/133 รายการ | PASS | `npm run check` |
| TC-L5-13 | submit form ผิด validation | แสดงข้อความ validation ใต้ field และไม่บันทึกข้อมูล | PASS | `images/form-validation-error.png` |
| TC-L5-14 | เพิ่ม valid request แล้ว refresh | สร้าง REQ-ID ใหม่และข้อมูลยังอยู่หลัง refresh | PASS | `images/persistence-add-refresh.png` |
| TC-L5-15 | ทดสอบ filters ทุกค่า | กรองรายการตาม status ได้จาก state เดียวกัน | PASS | FilterBar component |
| TC-L5-16 | ลบ request แล้ว refresh | ลบรายการและ persist แล้วข้อมูลไม่กลับมาหลัง refresh | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-17 | Reset Demo Data | ยืนยัน reset แล้วโหลด seed data กลับมา | PASS | `images/reset-demo-data.png` |
| TC-L5-18 | malformed + wrong schema แล้ว reload | `readStoredRequests()` คืน invalid และ service กู้ seed พร้อม `onRecovery` | PASS | Recovery callback |
| TC-L5-19 | เทียบ summary กับ data | Summary Cards คำนวณจาก `requests` ระหว่าง render และตรงกับรายการจริง | PASS | Derived summary calculations |
| TC-L5-20 | viewport 375px ทุก page | layout รองรับหน้าจอ mobile 375px ตาม CSS responsive | PASS | Responsive CSS layout |
| TC-L5-21 | keyboard only | ใช้ semantic link/button/form และ focus style จาก CSS | PASS | Focus rings & semantic HTML |
| TC-L5-22 | checker/build/preview | `npm run check` และ `npm run build` ผ่าน ไม่มี error | PASS | Build output in `dist/` and `publish/` |
| TC-L5-23 | Pages Incognito + hash refresh | HashRouter รองรับ static hosting และ refresh URL ที่มี `#` | NOT RUN | รอ merge/deploy Pages จริง |
| TC-L5-24 | merged PR + tag | รวม PR และ tag `lab-05-submission-v1` | NOT RUN | รอ merge branch B เข้า `main` |

## Rerun log

เก็บบันทึกกรณีมีการแก้ไขปัญหาระหว่างพัฒนา

| Test ID | เวลา | Fix | Actual result | Status |
|---|---|---|---|---|
| TC-L5-12 | 2026-08-27 | เติม TODO 5A และ 5B ตาม checker contract | `npm run check` ผ่าน 133/133 | PASS |
| TC-L5-22 | 2026-08-27 | build source และ import publish output | `npm run build` และ `npm run build:pages` ผ่าน | PASS |
| TC-L5-07 | 2026-08-28 | เก็บภาพ evidence จาก local app ด้วย Edge Headless | ได้ไฟล์ PNG ครบตามโครงสร้าง evidence ตัวอย่าง | PASS |


