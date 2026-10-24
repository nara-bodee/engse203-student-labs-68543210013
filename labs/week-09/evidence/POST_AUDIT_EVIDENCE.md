# Week09 — Post-audit evidence verification

24 ตุลาคม 2026 (Asia/Bangkok) · Draft revision v3

## Requirement interpretation

Instructor pin: `3e080d366483fe9b4a903d9f4dd318b5de4cd5dd`.

- [Take-Home Guide lines372–377](https://github.com/se-rmutl/engse203-lab/blob/3e080d366483fe9b4a903d9f4dd318b5de4cd5dd/labs/week-09-sql-fundamentals/lab09/LAB09_TAKEHOME_GUIDE_TH.md#L372) explicitly labels the two screenshots “Screenshot ที่ต้องมี”: `schema-in-vscode.png` and `join-result.png`. They are **Mandatory**, not optional challenges.
- The same guide permits CP25 constraint results in `CONSTRAINT_TEST.md` **or as a section of DATA_MODEL.md**. The existing DATA_MODEL.md does satisfy that text-evidence location option. This exception does not waive the two screenshots.
- In-Class/README/checker coverage of SQL is distinct from these submission screenshots; checker27/27 alone does not prove screenshot completion.

## Fresh execution

From Student Repository root:

```powershell
node --disable-warning=ExperimentalWarning labs/week-09/evidence/verify-sql.mjs
```

Actual output: [post-audit-sql-results.json](post-audit-sql-results.json).

- PASS: submitted `campus.db` opened read-only; users4/requests8; SQLite integrityok; no foreign-key violations; DB SHA256 unchanged.
- PASS: all8 statements in submitted queries.sql returned the expected results, including JOIN with requesterName.
- PASS: schema ran twice in memory without error.
- PASS: all5 constraint attempts were rejected with the actual database error: foreign key, status CHECK, email UNIQUE, duplicate primary key, missing location NOT NULL.
- PASS: unmodified supplied checker executed on a separate copy:11/11 in-class +16/16 take-home =27/27 required; optional0/3.

No submitted schema/query/database or instructor checker was changed. Constraint attempts use SAVEPOINT/ROLLBACK on a memory database, never the submitted file.

## Screenshot status — MISSING / UNVERIFIED

| File | Current status | Required content |
|---|---|---|
| images/schema-in-vscode.png | **MISSING** | SQLite extension showing users and requests in the submitted DB |
| images/join-result.png | **MISSING** | Actual JOIN results with requesterName |

Cursor with the SQLite extension was detected, but native capture returned an image inconsistent with the selected window and an input guard stopped interaction. No such capture is used as SQL evidence. No simulated screenshot, renamed unrelated image, or HTML imitation of an editor was created. Text execution results above do **not** replace the mandatory screenshots.

## User steps to finish the two screenshots

1. Open this revision worktree in VS Code (or the course-approved editor) and open the submitted `labs/week-09/source/campus.db` using the SQLite extension. Do not run schema.sql against the submitted DB.
2. Expand both users and requests in SQLite Explorer and capture the editor window as `labs/week-09/evidence/images/schema-in-vscode.png`.
3. Open queries.sql, select query5 (JOIN users to requests, aliased requesterName), run only that SELECT using the SQLite extension, and capture the actual result grid as `images/join-result.png`.
4. Ensure both images are readable and contain no unrelated personal data. Recheck the files and update this status from actual observation; retain the test date truthfully.

This draft is reviewable SQL evidence preparation; screenshot completion remains blocked. It does not claim the LAB09 evidence finding is fully closed and creates no new submission tag.

## References & AI Assistance

Codex checked the pinned submission requirements, added the read-only/memory verification script, and recorded actual output. The learner still needs to capture the editor screenshots and explain JOIN and the five constraints from the submitted SQL.
