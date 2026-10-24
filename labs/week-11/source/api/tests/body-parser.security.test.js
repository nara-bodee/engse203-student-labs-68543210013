import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { once } from 'node:events';

// Isolate a possible decoder crash from the test runner and never use campus.db.
test('GHSA-27r3-jxmh-p828: trailing compressed bytes cannot crash the API', { timeout: 10000 }, async (t) => {
  const appUrl = new URL('../src/app.js', import.meta.url).href;
  const child = spawn(process.execPath, ['--input-type=module', '-e', `
    const { createApp } = await import(${JSON.stringify(appUrl)});
    const server = createApp().listen(0, '127.0.0.1', () => {
      process.send({ port: server.address().port });
    });
  `], { env: { ...process.env, DB_FILE: ':memory:', NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'] });
  let stderr = '';
  child.stderr.on('data', chunk => { stderr += chunk; });
  child.stdout.resume();
  t.after(async () => {
    if (child.exitCode === null) {
      const exited = once(child, 'exit');
      child.kill();
      await exited;
    }
  });
  const [{ port }] = await once(child, 'message', { signal: AbortSignal.timeout(4000) });
  const body = Buffer.concat([gzipSync('{"probe":true}'), Buffer.from([0]), Buffer.alloc(100 * 1024, 0x58)]);
  // Upstream regression shape: one complete gzip frame followed by trailing bytes.
  const response = await fetch(`http://127.0.0.1:${port}/api/parser-security-probe`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'content-encoding': 'gzip' },
    body, signal: AbortSignal.timeout(4000),
  });
  await response.text();
  assert.equal(response.status, 404);
  await new Promise(resolve => setTimeout(resolve, 200));
  assert.equal(child.exitCode, null, `API process exited: ${stderr}`);
  const healthy = await fetch(`http://127.0.0.1:${port}/api`, { signal: AbortSignal.timeout(4000) });
  assert.equal(healthy.status, 200);
  assert.equal((await healthy.json()).version, '2.0.0');
});
