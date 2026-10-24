import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test, expect } from 'vitest';
test('compressed trailing bytes cannot crash the real API process (GHSA-27r3-jxmh-p828)', () => {
  const result = spawnSync(process.execPath, [
    '--disable-warning=ExperimentalWarning',
    fileURLToPath(new URL('./helpers/compressed-body-server.mjs', import.meta.url)),
  ], { encoding: 'utf8', timeout: 10000, windowsHide: true });
  const diagnostic = result.stdout + '\n' + result.stderr;
  expect(result.error, diagnostic).toBeUndefined();
  expect(result.status, diagnostic).toBe(0);
  expect(result.stdout, diagnostic).toContain('COMPRESSED_STATUS=404');
  expect(result.stdout, diagnostic).toContain('API_AFTER=200');
  expect(result.stdout, diagnostic).toContain('PROCESS_SURVIVED');
});
