# Week07 — Final closeout: mandatory screenshots pending

24 ตุลาคม 2026 · PR #26 remains **DRAFT**

รันใหม่ในrevisionworktree: Required33/33 PASS, optional1/3, API6/6 PASS, CP13regression8/8 PASS, frontendbuildPASS; legacyLAB05checker116/136 exit1คงเดิม ผลCLIจริงอยู่ใน [final-closeout-cli.txt](final-closeout-cli.txt) ไม่ใช้แทนBrowserNetworkpanel

ตรวจภาพเดิม `images/network-cors-ok.png` แล้ว: มีCORS/preflightheaders แต่ไม่มีชุดหลักฐานPUT200/payload/responseครบ จึงยังใช้ปิดช่องว่างCP13Networkไม่ได้ ภาพR5CInProgress/Completed/OfflineและDOM/HTTPlogsเดิมยังเก็บไว้ ไม่มีการแก้sourceหรือเอาduplicateA49filesกลับมา

**MISSING:** `images/terminal-api.png` และภาพNetworkHeaders/Payload/ResponseของPUTพร้อมUIstatusที่ตรงresponse; Browserinflight/repeatยังUNVERIFIED

ComputerUseถูกหยุดระหว่างเปิดtabสำหรับทดสอบเพราะยืนยันcurrentURLไม่มั่นใจ จึงหยุดUIทุกชนิดตามเครื่องมือ และguidanceห้ามautomateTerminal ไม่ใช้เครื่องมือทางอื่นหลบเลี่ยง ไม่สร้างscreenshotจำลอง ไม่merge/tagเมื่อmandatoryevidenceขาด

Human-only capture: ทำตาม[revision-followup.md](revision-followup.md) เก็บภาพAPIterminalจริงและBrowserNetworkPUT200/statuspayload/id-statusresponse/UIให้ครบ บันทึกใน `labs/week-07/evidence/images/` ของworktreeWeek07 แล้วตรวจภาพไม่แสดงsecrets/cookiesก่อนนำเข้าPR
