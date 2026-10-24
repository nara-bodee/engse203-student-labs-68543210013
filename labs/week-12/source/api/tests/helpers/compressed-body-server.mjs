import http from 'node:http';
import { gzipSync } from 'node:zlib';

// GHSA-27r3-jxmh-p828: only a disposable loopback API may receive this payload.
process.env.NODE_ENV = 'test';
process.env.DB_FILE = ':memory:';
delete process.env.TURSO_DATABASE_URL;
delete process.env.TURSO_AUTH_TOKEN;
const { loadSeed } = await import('../../src/services/requestService.js');
const { createApp } = await import('../../src/app.js');
await loadSeed();
const server = createApp().listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  const body = Buffer.concat([
    gzipSync('{"audit":true}'), Buffer.from([0]), Buffer.alloc(100 * 1024, 0x58),
  ]);
  const req = http.request({
    host: '127.0.0.1', port, method: 'POST', path: '/api/security-test-unknown',
    headers: {
      'Content-Type': 'application/json', 'Content-Encoding': 'gzip',
      'Content-Length': body.length,
    },
  }, (res) => {
    console.log('COMPRESSED_STATUS=' + res.statusCode);
    res.resume();
  });
  req.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
  req.end(body);
  setTimeout(async () => {
    try {
      const response = await fetch('http://127.0.0.1:' + port + '/api/requests');
      const requests = await response.json();
      if (response.status !== 200 || !Array.isArray(requests)) throw new Error('API unavailable after compressed body');
      console.log('API_AFTER=200');
      console.log('PROCESS_SURVIVED');
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    } finally {
      server.closeAllConnections();
      server.close();
    }
  }, 500);
});
