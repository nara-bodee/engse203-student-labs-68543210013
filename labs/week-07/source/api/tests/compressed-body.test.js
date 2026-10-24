import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
test('compressed trailing bytes cannot crash the real API process (GHSA-27r3-jxmh-p828)', () => {
  const result = spawnSync(process.execPath, [
    '--disable-warning=ExperimentalWarning',
    fileURLToPath(new URL('./helpers/compressed-body-server.mjs', import.meta.url)),
  ], { encoding: 'utf8', timeout: 10000, windowsHide: true });
  const diagnostic = result.stdout + '\n' + result.stderr;
  assert.equal(result.error, undefined, diagnostic);
  assert.equal(result.status, 0, diagnostic);
  assert.match(result.stdout, /COMPRESSED_STATUS=404/, diagnostic);
  assert.match(result.stdout, /API_AFTER=200/, diagnostic);
  assert.match(result.stdout, /PROCESS_SURVIVED/, diagnostic);
});
