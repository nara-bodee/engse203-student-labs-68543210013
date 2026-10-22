# Week 12 — Testing & Debugging Evidence

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
