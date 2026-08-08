# Week 01 - Developer Environment & GitHub Repository Setup

## Status

- Source origin: migrated from `engse203-lab01-68543210013-7`
- Original repository: `https://github.com/nara-bodee/engse203-lab01-68543210013-7`
- Original commit: `6ff8cd3783d6ab4fa2b1ffedd523ec18bc02a5eb`
- Local branch: `lab/week-01`
- Pull request: `https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/1`
- Submission tag: `lab-01-submission-v1`

## Project Structure

```text
labs/week-01/
â”œâ”€â”€ README.md
â”œâ”€â”€ lab-metadata.json
â”œâ”€â”€ source/
â”‚   â”œâ”€â”€ README.md
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ src/
â”‚       â””â”€â”€ hello.js
â”œâ”€â”€ evidence/
â”‚   â”œâ”€â”€ README.md
â”‚   â””â”€â”€ run-output.txt
â””â”€â”€ publish/
```

## Run

The imported LAB01 source defines this script:

```bash
npm --prefix labs/week-01/source run start
```

Because `npm` is not available on the current PowerShell PATH, verification was run directly with the available Node runtime:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe labs\week-01\source\src\hello.js
```

## Verification

Actual verified output:

```text
Hello à¸™à¸£à¸šà¸”à¸µ à¸šà¸¸à¸à¹€à¸¥à¸´à¸¨ (68543210013-7) | OS: win32 | Node: v24.14.0
```

Result: PASS

## Evidence

- `evidence/run-output.txt` - verified command output from `hello.js`.
- `evidence/README.md` - evidence index.

LAB01 has no web application, so evidence is command output rather than a browser screenshot.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Metadata records the merged PR URL and submission tag.