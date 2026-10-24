# Week01 revision follow-up — 23 ตุลาคม 2026

> อัปเดต24ตุลาคม: ได้รับภาพผู้ใช้แล้ว ดู [TERMINAL_EVIDENCE_REVIEW.md](TERMINAL_EVIDENCE_REVIEW.md) ข้อความMISSINGด้านล่างเป็นประวัติก่อนภาพใหม่

รันทดสอบใน worktree ของ Draft PR #21 (`fix/week-01-v2`) โดยไม่ใช้ working tree หลัก

| คำสั่ง | ผลจริง |
|---|---|
| `node --version` | v24.19.0 |
| `npm --version` | 12.2.0 |
| `git --version` | 2.54.0.windows.1 |
| `npm run start --prefix labs/week-01/source` | exit 0; Hello นรบดี บุญเลิศ (68543210013-7), OS win32 |
| `npm run check --prefix labs/week-01/source` | exit 0; LAB 01 file structure check: PASS |

ผลข้อความจริงอยู่ใน [revision-terminal-output.txt](revision-terminal-output.txt) ไม่ใช่ภาพ Terminal

**MISSING:** `terminal-run.png` ยังไม่มีไฟล์จริง จึงยังไม่พร้อม merge หรือออก revision tag
**UNVERIFIED:** การตั้งค่า Remote WSL2 ในอดีต รอบนี้ใช้ Windows PowerShell ไม่อ้างว่าเป็น WSL2

เปิด PowerShell แล้วรัน:

```powershell
Set-Location 'D:\SEYear2\ENGSE203\revision-worktrees\week-01-v2'
node --version
npm --version
git --version
npm run start --prefix labs/week-01/source
npm run check --prefix labs/week-01/source
```

ถ่ายภาพ Terminal จริงให้เห็นคำสั่งและผลครบด้วย Snipping Tool แล้วบันทึกที่
`labs/week-01/evidence/terminal-run.png` ใน worktree นี้ ตรวจภาพก่อนเพิ่ม link/เปลี่ยนสถานะ
ไม่เปิด `.env` หรือข้อมูลลับในภาพ และไม่สร้างภาพจากข้อความแทน

ใช้ Codex รันคำสั่ง ตรวจไฟล์ และบันทึกผลตามจริง ไม่เปลี่ยน source/checker ในรอบนี้
