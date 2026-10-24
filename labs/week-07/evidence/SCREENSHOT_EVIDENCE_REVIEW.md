# Week07 — ตรวจภาพ Terminal และ Browser Network

24 ตุลาคม2026 (Asia/Bangkok) · ผู้ใช้แจ้งให้ตรวจWeek07ใหม่

อ่านภาพจากไฟล์จริง4ภาพ คัดลอกเข้าrevisionworktreeโดยไม่แก้pixelsและรักษาต้นฉบับผู้ใช้ไว้ ชื่อสองภาพเดิมไม่ตรงเนื้อหาจึงmapตามสิ่งที่เห็น:

| ไฟล์ผู้ใช้ | ไฟล์ในPR | เนื้อหาที่ตรวจเห็น |
|---|---|---|
| terminal-api.png | [terminal-api.png](images/terminal-api.png) | APIพร้อมlocalhost5317, CORSlocalhost5517, logGET/api/requests200; มี304จากcacheด้วย ไม่อ้าง304เป็น200 |
| week07-network-payload.png | [cp13-network-put-200.png](images/cp13-network-put-200.png) | UIREQ-001=in-progress; InProgressdisabled; HeadersแสดงPUTlocalhost5317/api/requests/REQ-001, HTTP200OK, CORS5517 |
| week07-network-put-200.png | [cp13-network-payload.png](images/cp13-network-payload.png) | Requestpayload `{status:"in-progress"}` |
| week07-network-response.png | [cp13-network-response.png](images/cp13-network-response.png) | ResponseidREQ-001/statusin-progressตรงกับUIและpayload |

ไม่มีsecret/token/password/cookie/Authorizationที่มองเห็นในภาพ ข้อมูลชื่อ/ห้องเป็นseedLABตามUIfooter ไม่อ้างOCR/EXIFauditหรือพิสูจน์การถ่ายนอกเหนือจากภาพและคำแจ้งผู้ใช้

TerminalและBrowserNetworkเป็นคนละชนิดหลักฐานและตรวจแยกกัน ไม่ใช้CLIlogแทนNetwork ภาพUI/Headersเต็มและภาพPayload/Responseประกอบกันปิดช่องว่างภาพที่ทำให้PRค้างDraft

Browserinflight/doubleclick timingยังUNVERIFIED ไม่ใช้ภาพนิ่งยืนยันtiming แต่regression8/8ตรวจdisabled/deferred/error logicและR5CเดิมมีCompleted/refresh/offlineหลักฐานแล้ว ไม่แก้sourceเพื่อให้ภาพผ่าน

รันใหม่Required33/33 (25+8), Optional1/3, API6/6, CP13regression8/8, buildPASS; legacyLAB05checker116/136exit1เหมือนเดิม ไม่แก้instructorchecker ดู [rawoutput](screenshot-closeout-tests.txt)

ก่อนแก้เอกสารตรวจR6approvedfiles10hashตรง, duplicateAdeleted49ตรงallowlist, canonicalB49ยังอยู่และAกู้จากoriginalbase03d6447ได้ ต่อมาเปลี่ยนเฉพาะเอกสาร/metadata/Pagesและเพิ่มภาพ ไม่เปลี่ยนapplicationcode/tests/lockfilesหรือtemplates
