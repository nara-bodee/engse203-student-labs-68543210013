# Week 02 - Modern JavaScript

## Status

- Source origin: migrated from `engse203-lab02-68543210013-7`
- Original repository: `https://github.com/nara-bodee/engse203-lab02-68543210013-7`
- Original commit: `8d63789b9d4adabfadb2a1f0fa13ad0e25ab2251`
- Local branch: `lab/week-02`
- Pull request: `https://github.com/nara-bodee/engse203-student-labs-68543210013/pull/2`
- Submission tag: `lab-02-submission-v1`

## Project Structure

```text
labs/week-02/
â”œâ”€â”€ README.md
â”œâ”€â”€ lab-metadata.json
â”œâ”€â”€ source/
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ package.json
â”‚   â”œâ”€â”€ package-lock.json
â”‚   â”œâ”€â”€ vite.config.js
â”‚   â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ scripts/
â”‚   â””â”€â”€ src/
â”œâ”€â”€ evidence/
â”‚   â”œâ”€â”€ README.md
â”‚   â”œâ”€â”€ build-output.txt
â”‚   â”œâ”€â”€ check-output.txt
â”‚   â”œâ”€â”€ dashboard-error-state.png
â”‚   â”œâ”€â”€ dashboard-filter-done.png
â”‚   â”œâ”€â”€ dashboard-mobile-375.png
â”‚   â””â”€â”€ dashboard-success-desktop-1280.png
â””â”€â”€ publish/
    â”œâ”€â”€ index.html
    â””â”€â”€ assets/
```

## Run

The imported LAB02 source defines these scripts:

```bash
npm --prefix labs/week-02/source run check
npm --prefix labs/week-02/source run build
npm --prefix labs/week-02/source run dev
npm --prefix labs/week-02/source run preview
```

Because `npm` is not available on the current PowerShell PATH, verification used the available Node runtime directly. The build used the existing local Vite executable from `engse203-lab04-68543210013-7/node_modules` without copying dependencies into this repository.

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

Publish output was imported from `labs/week-02/source/dist` into `labs/week-02/publish`, then `source/dist` was removed.

## Pages Configuration

`labs/week-02/source/vite.config.js` was adjusted for the unified Pages Hub workflow:

```js
export default {
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
};
```

## Evidence

- `evidence/dashboard-success-desktop-1280.png` - desktop dashboard after data loaded successfully.
- `evidence/dashboard-filter-done.png` - status filter set to `done`.
- `evidence/dashboard-mobile-375.png` - mobile layout at 375px width.
- `evidence/dashboard-error-state.png` - dashboard error state with `simulateError=1`.
- `evidence/check-output.txt` - project checker output.
- `evidence/build-output.txt` - Vite build output.
- `evidence/README.md` - evidence index.

Screenshots were captured from `labs/week-02/publish/` using Microsoft Edge through Playwright.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Metadata records the merged PR URL and submission tag.