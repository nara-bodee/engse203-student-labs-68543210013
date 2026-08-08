# Week 03 - Responsive Web UI & Form Interaction

## Status

- Source origin: migrated from `engse203-lab03-68543210013-7/source`
- Original repository: `https://github.com/nara-bodee/engse203-lab03-68543210013-7`
- Original commit: `427bcb40b95ca51773479c4cf0dff5a62e232657`
- Local branch: `lab/week-03`
- Submission status: local ready, not submitted to GitHub PR/tag yet

## Project Structure

```text
labs/week-03/
├── README.md
├── lab-metadata.json
├── source/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
├── evidence/
│   ├── README.md
│   ├── build-output.txt
│   ├── check-output.txt
│   ├── desktop-1280.png
│   ├── invalid-state.png
│   ├── mobile-375.png
│   └── valid-state.png
└── publish/
    ├── index.html
    └── assets/
```

## Run

The imported LAB03 source defines these scripts:

```bash
npm --prefix labs/week-03/source run check
npm --prefix labs/week-03/source run build
npm --prefix labs/week-03/source run dev
npm --prefix labs/week-03/source run preview
```

Because `npm` is not available on the current PowerShell PATH, verification used the available Node runtime directly. The build used the existing local Vite executable from `engse203-lab04-68543210013-7/node_modules` without copying dependencies into this repository.

## Verification

JavaScript syntax check:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\app.js
```

Result: PASS. See `evidence/check-output.txt`.

Build:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe ..\..\..\..\engse203-lab04-68543210013-7\node_modules\vite\bin\vite.js build
```

Result: PASS. See `evidence/build-output.txt`.

Publish output was imported from `labs/week-03/source/dist` into `labs/week-03/publish`, then `source/dist` was removed.

## Manual Test Coverage

- Desktop layout at 1280px.
- Mobile layout at 375px.
- Invalid submit shows validation errors and does not add a request.
- Valid submit adds a submitted request, shows success feedback, and resets the form.
- Asset paths use relative paths in the publish output.

## Pages Configuration

`labs/week-03/source/vite.config.js` was adjusted for the unified Pages Hub workflow:

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

- `evidence/desktop-1280.png` - desktop layout at 1280px width.
- `evidence/mobile-375.png` - mobile layout at 375px width.
- `evidence/invalid-state.png` - invalid form submit with validation errors.
- `evidence/valid-state.png` - valid form submit with success state and submitted request.
- `evidence/check-output.txt` - JavaScript syntax check output.
- `evidence/build-output.txt` - Vite production build output.
- `evidence/README.md` - evidence index.

Screenshots were captured from `labs/week-03/publish/` using Microsoft Edge through Playwright.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Pull request URL and submission tag are pending because this run is Local only.