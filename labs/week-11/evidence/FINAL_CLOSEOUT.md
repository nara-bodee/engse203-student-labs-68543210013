# Week11 — Final closeout verification

24 ตุลาคม 2026 (Asia/Bangkok) · PR #29 · revision `lab-11-submission-v3`

## วิดีโอ CP42 — USER CONFIRMED

ผู้ใช้ยืนยันในคำสั่ง FINAL CLOSEOUT วันที่24ตุลาคม2026 ว่าได้ตรวจวิดีโอWeek11แล้ว โดยระบุว่า “ผู้ใช้ยืนยันงานตรวจวิดีโอ Week 11 แล้ว ไม่ต้องขอให้ผู้ใช้ตรวจวิดีโอซ้ำอีก” จึงบันทึก CP42 เป็น **USER CONFIRMED** ลิงก์วิดีโอ A/B อยู่ใน [DEMO.md](../source/DEMO.md)

นี่เป็นคำยืนยันของผู้ใช้ ไม่ใช่คำอ้างว่าCodexเปิดดูวิดีโอหรือพิสูจน์สิทธิ์เข้าถึงด้วยHTTP302 รายงานUNVERIFIEDวันที่23ตุลาคมเป็นประวัติก่อนคำยืนยันใหม่นี้ ไม่ต้องตรวจวิดีโอซ้ำ

## Security patch และผลใหม่

คง `proxy-addr@2.0.8`, regressionเดิม3กรณี, `Express@5.2.1` และ `trust proxy=false`

auditใหม่พบ High1 ใน `body-parser@2.3.0`: [GHSA-27r3-jxmh-p828](https://github.com/advisories/GHSA-27r3-jxmh-p828) compressed body/trailing bytes ทำให้processcrash ยืนยันpatch2.4.0กับadvisory/npmregistryแล้ว อัปเดตด้วยpackage managerตามrangeเดิมของExpress เปลี่ยนเฉพาะlockentries `body-parser`2.3.0→2.4.0 และ dependency `qs`6.16.0→6.16.1 ไม่เพิ่มdirectdependency/override ไม่แก้app/routes/config/checker

เพิ่ม [body-parser.security.test.js](../source/api/tests/body-parser.security.test.js) ใช้child APIจริง bind127.0.0.1 และmemoryDB ส่งgzipframeตามด้วยtrailingbytes แล้วตรวจprocessยังอยู่และตอบHTTPได้ สำเนาAPIจากHEADก่อนpatchล้มด้วย `Z_DATA_ERROR`/exit1; patch2.4.0ผ่าน ไม่ใช่เพียงassertversion

| ตรวจใหม่24ตุลาคม | ผล |
|---|---|
| Required checker | 37/37 PASS |
| Optional challenge | 4/4 PASS |
| API tests รวม security regressions | 11/11 PASS |
| Frontend build | PASS |
| Production local HTTP | 8/8 PASS; memoryDB; localhost |
| Runtime audit หลังpatch | vulnerabilities0 / exit0 |

Production probeตรวจHTML/, /about, health/DB, POST201, GET200, PUT200, DELETE204 และunknownAPI404ไม่มีstack ไม่ใช้memoryDBยืนยันrestartpersistence; CP42อ้างคำยืนยันผู้ใช้แยกต่างหาก frontendfindingsเดิมยังเป็นknownissue ไม่อ้างว่าทั้งระบบปลอดภัย ผลCLIอยู่ใน [final-closeout-verification.txt](final-closeout-verification.txt)

## Render deployment — OPEN / UNVERIFIED

GitHub deploymentrecordล่าสุดที่พบสำหรับRender serviceนี้คือ7042214835 ของcommit`b9bae011a389844889fe5adf4c197edf750db878` บน`unit4/week-11` วันที่13ตุลาคม2026 สถานะsuccess เชื่อมไปยังRender deploy`dep-db74j6ks728c739jlq8g` นี่เป็นหลักฐานเก่าที่พบ ไม่ยืนยันartifactที่กำลังรันปัจจุบัน

[render.yaml](../source/render.yaml) ยังระบุbranch`unit4/week-11` ไม่เปลี่ยนbranch/configหรือสั่งdeploy การmergeเข้าmainไม่พิสูจน์ว่าRenderใช้patchedlockfile จึงคงproductionpatchOPEN/UNVERIFIEDจนมีหลักฐานartifact/commit/packageบนระบบจริง

คู่มืออาจารย์กำหนดCP43ให้จำลองproductionในเครื่อง ส่วนdeployจริงเป็นChallenge ดังนั้นlocalproduction8/8และCP42USERCONFIRMEDใช้พิจารณาrequiredreadinessแยกจากcloudknownissue
