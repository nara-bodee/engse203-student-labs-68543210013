# Week 01 - Developer Environment & GitHub Repository Setup

## Status

- Source origin: migrated from `engse203-lab01-68543210013-7`
- Original repository: `https://github.com/nara-bodee/engse203-lab01-68543210013-7`
- Original commit: `6ff8cd3783d6ab4fa2b1ffedd523ec18bc02a5eb`
- Local branch: `lab/week-01`
- Submission status: local ready, not submitted to GitHub PR/tag yet

## Project Structure

```text
labs/week-01/
├── README.md
├── lab-metadata.json
├── source/
│   ├── README.md
│   ├── package.json
│   └── src/
│       └── hello.js
├── evidence/
└── publish/
```

## Run

The imported LAB01 source defines this script:

```bash
npm --prefix labs/week-01/source run start
```

Because `npm` is not available on the current PowerShell PATH, the verification was run directly with the available Node runtime:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe labs\week-01\source\src\hello.js
```

## Verification

Actual verified output:

```text
Hello นรบดี บุญเลิศ (68543210013-7) | OS: win32 | Node: v24.14.0
```

Result: PASS

## Evidence

LAB01 has no web application. The verified command output above is the current local evidence for this migration step. No screenshot was created in this step.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Pull request URL and submission tag are pending because this run is Local only.
