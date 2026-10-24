# Post-audit security remediation — Week 12

24 ตุลาคม 2026 (Asia/Bangkok) · Draft revision v3 · Base main 91807ef3752608b8846188409e3a76f502fe249c

## Defect and patch

[GHSA-27r3-jxmh-p828](https://github.com/expressjs/body-parser/security/advisories/GHSA-27r3-jxmh-p828) affects body-parser >=2.0.0 <2.4.0. A valid gzip frame followed by trailing bytes can raise an unhandled decompressor error and terminate the API. Fixed version: 2.4.0.

Updated transitive dependencies with npm update body-parser --ignore-scripts --no-audit --no-fund. No application middleware, controller, service, API contract, teacher checker, or direct dependency range changed. qs6.16.1 is required by the fixed body-parser.

| Package | Before | After installed/lock |
|---|---|---|
| express | 5.2.1 | 5.2.1 |
| body-parser | 2.3.0 | 2.4.0 |
| proxy-addr | 2.0.8 | 2.0.8 |
| qs | 6.16.0 | 6.16.1 |

## Real API regression — before/after

The new tests/compressed-body.test.js starts tests/helpers/compressed-body-server.mjs as a disposable child process. It loads the real createApp()/service with an in-memory DB, binds only to 127.0.0.1 on an OS-assigned port, sends the compressed body to an unknown API route, and checks both its404 response and a subsequent real GET /api/requests200. It never accepts an external target URL and must never be run against Render. No uncaught-exception handler masks the vulnerable process exit.

Before dependency update (2026-10-24T08:39:57.765Z, exit1):

-  Test Files  1 failed (1)
-       Tests  1 failed (1)
- ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

Stack trace captured from the failing child/test diagnostic:

```text
      throw er; // Unhandled 'error' event
Error: incorrect header check
    at genericNodeError (node:internal/errors:985:15)
    at wrappedFn (node:internal/errors:539:14)
    at Zlib.zlibOnError [as onerror] (node:zlib:191:17)
Emitted 'error' event on Gunzip instance at:
    at Gunzip.onerror (node:internal/streams/readable:1035:14)
    at Gunzip.emit (node:events:509:28)
  code: 'Z_DATA_ERROR'
```

After dependency update (2026-10-24T08:40:24.917Z, exit0):

-  Test Files  3 passed (3)
-       Tests  30 passed (30)

The child must emit COMPRESSED_STATUS=404, API_AFTER=200 and PROCESS_SURVIVED with exit0; the same regression fails before the patch.

Required checker (exit0):

- 🏫 ในห้อง (CP44–CP47)   ผ่าน 20/20 รายการ
- ⭐ Challenge            ผ่าน 0/2 รายการ
- ผ่าน 20/22 รายการ

Frontend build passed. Existing frontend tests passed.

## Reproduce

From labs/week-12/source/api:

```bash
npm ci --ignore-scripts
npm test
npm ls express body-parser proxy-addr qs --all
npm audit --omit=dev
npm audit
```

Use DB_FILE=:memory: for Week07’s general test command if adapting this procedure to database LABs; the compressed regression fixture itself always isolates its DB before loading the application.

## Audit scope and remaining issues

Production audit: {"info":0,"low":0,"moderate":0,"high":0,"critical":0,"total":0}

All dependencies: {"info":0,"low":0,"moderate":0,"high":1,"critical":0,"total":1}

Development advisories remain; production audit0 does not certify the whole system. This PR does not deploy, change Render settings, merge, alter existing tags, or attest the packages in the live Render artifact. Optional challenges and legacy frontend checker limitations remain separate from required checker results.

## References & AI Assistance

Codex reproduced the real process crash, added this regression, applied the scoped npm transitive update, and ran the checks documented above. The learner should be able to explain why a child process is needed to detect an unhandled crash and why the regression is restricted to loopback.
