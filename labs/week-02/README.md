# Week 02 - Modern JavaScript

## Status

- Source origin: migrated from `engse203-lab02-68543210013-7`
- Original repository: `https://github.com/nara-bodee/engse203-lab02-68543210013-7`
- Original commit: `8d63789b9d4adabfadb2a1f0fa13ad0e25ab2251`
- Local branch: `lab/week-02`
- Submission status: local ready, not submitted to GitHub PR/tag yet

## Project Structure

```text
labs/week-02/
├── README.md
├── lab-metadata.json
├── source/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   ├── scripts/
│   └── src/
├── evidence/
└── publish/
    ├── index.html
    └── assets/
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

Result:

```text
LAB 02 project structure and required evidence check passed.
```

Build:

```bash
C:\Users\meenz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe ..\..\..\..\engse203-lab04-68543210013-7\node_modules\vite\bin\vite.js build
```

Result:

```text
✓ built in 220ms
```

Publish output was imported from `labs/week-02/source/dist` into `labs/week-02/publish`.

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

The verified local evidence for this migration step is the passing project check, successful Vite build, and generated publish output. No screenshot was created in this step.

## Known Issues

- `npm` and `node` are not available on the PowerShell PATH in this environment.
- Pull request URL and submission tag are pending because this run is Local only.