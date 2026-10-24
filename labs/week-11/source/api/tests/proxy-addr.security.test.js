import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createApp } from '../src/app.js';

// Resolve the copy Express actually uses, rather than a separate test dependency.
const require = createRequire(import.meta.url);
const expressRequire = createRequire(require.resolve('express'));
const proxyaddr = expressRequire('proxy-addr');

test('GHSA-jqcg-44mw-7w3h: a short IPv6 prefix cannot trust an IPv4 client', () => {
  // These subnets previously matched every IPv4 address, allowing spoofed XFF.
  for (const subnet of ['::ffff:10.0.0.0/8', '::/1']) {
    const trust = proxyaddr.compile(subnet);
    assert.equal(trust('203.0.113.5', 0), false, subnet);
    assert.equal(trust('::ffff:203.0.113.5', 0), false, subnet);
    const req = { socket: { remoteAddress: '203.0.113.5' },
      headers: { 'x-forwarded-for': '198.51.100.9' } };
    assert.equal(proxyaddr(req, trust), '203.0.113.5');
  }
});

test('the correct IPv4 and mapped IPv6 subnets still match the private network', () => {
  for (const subnet of ['10.0.0.0/8', '::ffff:10.0.0.0/104']) {
    const trust = proxyaddr.compile(subnet);
    assert.equal(trust('10.1.2.3', 0), true, subnet);
    assert.equal(trust('203.0.113.5', 0), false, subnet);
  }
});

test('the application keeps trust proxy disabled and ignores untrusted XFF', () => {
  const app = createApp();
  assert.equal(app.get('trust proxy'), false);
  const req = Object.create(app.request);
  req.app = app;
  req.socket = { remoteAddress: '127.0.0.1' };
  req.headers = { 'x-forwarded-for': '198.51.100.9' };
  assert.equal(req.ip, '127.0.0.1');
  assert.deepEqual(req.ips, []);
});
