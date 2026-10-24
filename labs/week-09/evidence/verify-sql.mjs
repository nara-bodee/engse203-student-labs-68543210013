import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Submitted DB is always read-only. Constraint attempts run only in memory.
const source = new URL('../source/', import.meta.url);
const dbFile = new URL('campus.db', source);
const digest = () => createHash('sha256').update(fs.readFileSync(dbFile)).digest('hex');
const before = digest();
const db = new DatabaseSync(fileURLToPath(dbFile), { readOnly: true });
const sql = fs.readFileSync(new URL('queries.sql', source), 'utf8');
const statements = sql.replace(/--[^\n]*/g, '').split(';').map(s => s.trim()).filter(Boolean);
const queries = statements.map((query, index) => ({ number: index + 1, sql: query, rows: db.prepare(query).all() }));
const integrity = db.prepare('PRAGMA integrity_check').all();
const foreignKeys = db.prepare('PRAGMA foreign_key_check').all();
const counts = { users: db.prepare('SELECT count(*) n FROM users').get().n, requests: db.prepare('SELECT count(*) n FROM requests').get().n };
db.close();
const memory = new DatabaseSync(':memory:');
const schema = fs.readFileSync(new URL('schema.sql', source), 'utf8');
memory.exec(schema);
memory.exec(schema);
const attempts = [
  ['Foreign key', "INSERT INTO requests(id,requester_id,request_type,location,details) VALUES('AUDIT-FK',99999,'แจ้งซ่อม','audit','audit')", /FOREIGN KEY constraint failed/],
  ['Status CHECK', "INSERT INTO requests(id,requester_id,request_type,location,details,status) VALUES('AUDIT-STATUS',1,'แจ้งซ่อม','audit','audit','invalid')", /CHECK constraint failed/],
  ['Email UNIQUE', "INSERT INTO users(name,department,email) SELECT 'audit','audit',email FROM users LIMIT 1", /UNIQUE constraint failed: users.email/],
  ['Primary key', "INSERT INTO requests(id,requester_id,request_type,location,details) SELECT id,requester_id,request_type,location,details FROM requests LIMIT 1", /UNIQUE constraint failed: requests.id/],
  ['Location NOT NULL', "INSERT INTO requests(id,requester_id,request_type,details) VALUES('AUDIT-NULL',1,'แจ้งซ่อม','audit')", /NOT NULL constraint failed: requests.location/],
];
const constraints = attempts.map(([name, statement, expected]) => {
  memory.exec('SAVEPOINT audit');
  let error = '';
  try { memory.exec(statement); } catch (failure) { error = failure.message; }
  memory.exec('ROLLBACK TO audit; RELEASE audit');
  return { name, sql: statement, error, status: expected.test(error) ? 'PASS' : 'FAIL' };
});
memory.close();
const expectedIds = [
  ['REQ-001','REQ-002','REQ-003','REQ-004','REQ-005','REQ-006','REQ-007','REQ-008'],
  ['REQ-001','REQ-004','REQ-005','REQ-006'], ['REQ-001','REQ-004','REQ-007'],
  ['REQ-005','REQ-006'], null, ['REQ-001','REQ-002','REQ-004','REQ-006'],
];
for (const query of queries) {
  const i = query.number - 1;
  const valid = i < 4 || i === 5 ? query.rows.map(r => r.id).join(',') === expectedIds[i].join(',')
    : i === 4 ? query.rows.length === 8 && query.rows.every(r => r.requesterName)
    : i === 6 ? query.rows.length === 4
    : query.rows.map(r => r.id).join(',') === 'REQ-008,REQ-007,REQ-006';
  query.status = valid ? 'PASS' : 'FAIL';
}
const after = digest();
const passed = counts.users === 4 && counts.requests === 8 && integrity[0].integrity_check === 'ok'
  && foreignKeys.length === 0 && before === after && queries.length === 8
  && queries.every(q => q.status === 'PASS') && constraints.every(c => c.status === 'PASS');
console.log(JSON.stringify({ timeUTC: new Date().toISOString(), node: process.version, status: passed ? 'PASS' : 'FAIL', counts, integrity, foreignKeys, schemaRanTwice: true, dbSHA256Before: before, dbSHA256After: after, queries, constraints }, null, 2));
process.exitCode = passed ? 0 : 1;
