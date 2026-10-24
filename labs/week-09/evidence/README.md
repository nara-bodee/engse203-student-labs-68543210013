# Week 09 — SQL Evidence

## Test Command

```powershell
node --disable-warning=ExperimentalWarning labs/week-09/source/check-week09.mjs
```

## Test Results

- In-Class CP17–CP21: PASS 11/11
- Take-Home CP22–CP25: PASS 16/16
- Challenge (Optional): 0/3
- Total: 27/30
- Required Checkpoints: PASS

## Source Files

- [schema.sql](../source/schema.sql)
- [queries.sql](../source/queries.sql)
- [DATA_MODEL.md](../source/DATA_MODEL.md)
- [check-week09.mjs](../source/check-week09.mjs)

## Notes

SQL Checker ผ่านทุก Checkpoint ที่บังคับ
Challenge 3 รายการยังไม่ได้ทำ

## Post-audit — 24 ตุลาคม 2026

The results above are historical checker evidence, not proof that all submission evidence is complete. See [POST_AUDIT_EVIDENCE.md](POST_AUDIT_EVIDENCE.md) and [fresh SQL output](post-audit-sql-results.json).

Fresh required checker27/27, queries8/8 and constraints5/5 passed. In the native GUI followup, both mandatory images were captured from real Cursor/SQLite and now **PASS**: [schema](images/schema-in-vscode.png), [JOIN result](images/join-result.png). The actual JOIN returned8 rows with requesterName; DB SHA256 is unchanged. See GUI_SCREENSHOT_PROVENANCE.json. The text alternative remains limited to constraint evidence; the screenshots are now actual images, not a text substitution.
