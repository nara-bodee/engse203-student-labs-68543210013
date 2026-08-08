# Week 04 - React Campus Service Request

## Status

- Source origin: migrated from `engse203-lab04-68543210013-7`
- Original repository: `https://github.com/nara-bodee/engse203-lab04-68543210013-7`
- Original commit: `5dd6514464567d4e9fe1584deed549b34cdb872b`
- Local branch: `lab/week-04`
- Submission status: local ready, not submitted to GitHub PR/tag yet

## Project Structure

```text
labs/week-04/
├── README.md
├── lab-metadata.json
├── source/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── scripts/
│   └── src/
├── evidence/
│   ├── README.md
│   ├── build-output.txt
│   ├── check-output.txt
│   ├── desktop-1280.png
│   ├── mobile-375.png
│   ├── validation.png
│   ├── success-state.png
│   └── empty-state.png
└── publish/
    ├── index.html
    └── assets/
```

## Component Tree

```text
App
├── AppHeader
├── SummaryPanel
├── RequestForm
├── FilterBar
└── RequestList
    └── RequestCard
```

`App` owns `requests` and `statusFilter` state, computes summary and filtered requests, and passes data/callbacks to child components. `RequestForm` owns controlled form state and sends valid submissions back through `onAddRequest`. Delete actions pass `request.id` back through `RequestCard` and `RequestList` to update state with `filter()`.

## Run

The imported LAB04 source defines these scripts:

```bash
npm --prefix labs/week-04/source run check
npm --prefix labs/week-04/source run build
npm --prefix labs/week-04/source run dev
npm --prefix labs/week-04/source run preview
```

Because `npm` and `node` are not available on the current PowerShell PATH, verification used the available Node runtime directly. The build used the existing local Vite/React dependencies from `engse203-lab04-68543210013-7/node_modules` through a temporary junction that was removed immediately after build.

## Verification

Project check:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\check-project.mjs
```

Result: PASS. See `evidence/check-output.txt`.

Build:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe ..\..\..\..\engse203-lab04-68543210013-7\node_modules\vite\bin\vite.js build
```

Result: PASS. See `evidence/build-output.txt`.

Publish output was imported from `labs/week-04/source/dist` into `labs/week-04/publish`, then `source/dist` and the temporary `node_modules` junction were removed.

## Test Evidence

- TC-01 Initial render: PASS, `evidence/desktop-1280.png`
- TC-02 Controlled input: PASS, checked in `RequestForm.jsx`
- TC-03 Invalid submit: PASS, `evidence/validation.png`
- TC-04 Valid submit: PASS, `evidence/success-state.png`
- TC-05 Filter status: PASS, checked in `FilterBar.jsx` and `RequestList.jsx`
- TC-06 Return all: PASS, `evidence/desktop-1280.png`
- TC-07 Empty state: PASS, `evidence/empty-state.png`
- TC-08 Delete: PASS, checked in `RequestCard.jsx` and empty-state screenshot
- TC-09 Mobile 375px: PASS, `evidence/mobile-375.png`
- TC-10 Keyboard/accessibility basics: PASS, labels, `aria-invalid`, `role="status"`
- TC-11 Build: PASS, `evidence/build-output.txt`
- TC-12 Pages local publish: PASS, screenshots captured from `labs/week-04/publish/`

## Evidence Files

- `evidence/desktop-1280.png` - desktop React app.
- `evidence/mobile-375.png` - mobile 375px layout.
- `evidence/validation.png` - invalid form validation.
- `evidence/success-state.png` - valid submit success state.
- `evidence/empty-state.png` - empty state after delete actions.
- `evidence/check-output.txt` - verifier output.
- `evidence/build-output.txt` - build output.
- `evidence/README.md` - evidence index.

Screenshots were captured from `labs/week-04/publish/` using Microsoft Edge through Playwright.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Pull request URL and submission tag are pending because this run is Local only.