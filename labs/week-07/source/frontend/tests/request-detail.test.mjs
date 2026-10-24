import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate } from 'node:timers/promises';
import { test } from 'node:test';
import vm from 'node:vm';
import { transformWithOxc } from 'vite';

// Component callback/state regression, not React DOM or browser E2E.
// Use the existing Vite JSX compiler; mock only hooks, routing and service I/O.
const filename = new URL('../src/pages/RequestDetailPage.jsx', import.meta.url);
const source = await readFile(filename, 'utf8');
const compiled = await transformWithOxc(source, filename.pathname, {
  jsx: { runtime: 'automatic' },
});
const initialRequest = {
  id: 'REQ-001', requesterName: 'CP13 test', requestType: 'แจ้งซ่อม',
  location: 'LAB', details: 'ข้อมูลคำร้องสำหรับ regression',
  priority: 'normal', status: 'pending',
};

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...nodes(value.props?.children)];
}

function text(value) {
  if (Array.isArray(value)) return value.map(text).join('');
  if (value == null || typeof value === 'boolean') return '';
  if (typeof value === 'object') return text(value.props?.children);
  return String(value);
}

async function component({ get, update } = {}) {
  const states = [], effects = [], calls = { get: [], update: [] };
  let cursor = 0, previousDependencies;
  const jsx = (type, props) => ({ type, props });
  const context = vm.createContext({ Error });
  const imports = {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => {
          states[index] = typeof value === 'function' ? value(states[index]) : value;
        }];
      },
      useEffect(effect, dependencies) {
        if (!previousDependencies || dependencies.some((v, i) => v !== previousDependencies[i])) {
          effects.push(effect);
          previousDependencies = [...dependencies];
        }
      },
    },
    'react/jsx-runtime': { jsx, jsxs: jsx },
    'react-router-dom': { Link: 'a', useParams: () => ({ requestId: 'REQ-001' }) },
    '../components/ErrorState.jsx': { default: 'ErrorState' },
    '../components/LoadingState.jsx': { default: 'LoadingState' },
    '../hooks/useManualReload.js': { default: () => [0, () => {}] },
    '../services/requestService.js': {
      getRequestById(id) {
        calls.get.push(id);
        return get ? get(id) : Promise.resolve({ ...initialRequest });
      },
      updateRequestStatus(id, status) {
        calls.update.push({ id, status });
        return update ? update(id, status) : Promise.resolve({ ...initialRequest, status });
      },
    },
  };
  const module = new vm.SourceTextModule(compiled.code, { context, identifier: filename.href });
  await module.link(specifier => {
    assert.ok(specifier in imports, `Unexpected component import: ${specifier}`);
    const exports = imports[specifier];
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [name, value] of Object.entries(exports)) this.setExport(name, value);
    }, { context });
  });
  await module.evaluate();

  function view() {
    cursor = 0;
    const tree = module.namespace.default();
    while (effects.length) effects.shift()();
    return tree;
  }
  function button(label) {
    const found = nodes(view()).find(node => node.type === 'button' && text(node) === label);
    assert.ok(found, `Missing button: ${label}`);
    return found;
  }
  const harness = {
    calls, view, button,
    status() {
      const row = nodes(view()).find(node => node.type === 'div'
        && Array.isArray(node.props?.children)
        && node.props.children.some(child => child?.type === 'dt' && text(child) === 'สถานะ'));
      assert.ok(row, 'Missing request status row');
      return text(row.props.children.find(child => child?.type === 'dd'));
    },
    error() { return text(nodes(view()).find(node => node.props?.role === 'alert')); },
    click(label) {
      const control = button(label);
      // A browser does not dispatch clicks to disabled buttons.
      return control.props.disabled ? false : control.props.onClick();
    },
    async loaded() { await setImmediate(); view(); return harness; },
  };
  view();
  return harness;
}

test('CP13 loads the requested detail before exposing status actions', async () => {
  const load = deferred();
  const page = await component({ get: () => load.promise });
  assert.deepEqual(page.calls.get, ['REQ-001']);
  assert.equal(nodes(page.view()).filter(node => node.type === 'button').length, 0);
  load.resolve({ ...initialRequest });
  await page.loaded();
  assert.equal(page.status(), 'pending');
  assert.ok(text(page.view()).includes('CP13 test'));
});

test('CP13 In Progress sends the correct ID/status and renders the API response', async () => {
  const page = await (await component({
    update: async () => ({ ...initialRequest, status: 'in-progress', requestType: 'ข้อมูลจาก API' }),
  })).loaded();
  await page.click('In Progress');
  assert.deepEqual(page.calls.update, [{ id: 'REQ-001', status: 'in-progress' }]);
  assert.equal(page.status(), 'in-progress');
  assert.ok(text(page.view()).includes('ข้อมูลจาก API'));
});

test('CP13 Completed sends the correct ID/status and updates the detail', async () => {
  const page = await (await component()).loaded();
  await page.click('Completed');
  assert.deepEqual(page.calls.update, [{ id: 'REQ-001', status: 'completed' }]);
  assert.equal(page.status(), 'completed');
  assert.equal(page.button('Completed').props.disabled, true);
});

test('CP13 the current status is disabled and does not send an update', async () => {
  const page = await (await component()).loaded();
  assert.equal(page.button('Pending').props.disabled, true);
  assert.equal(page.click('Pending'), false);
  assert.equal(page.calls.update.length, 0);
});

test('CP13 updating disables every action and prevents another dispatched request', async () => {
  const response = deferred();
  const page = await (await component({ update: () => response.promise })).loaded();
  const pending = page.click('In Progress');
  for (const label of ['Pending', 'In Progress', 'Completed']) {
    assert.equal(page.button(label).props.disabled, true);
  }
  assert.equal(page.click('Completed'), false);
  assert.equal(page.calls.update.length, 1);
  assert.equal(page.status(), 'pending');
  response.resolve({ ...initialRequest, status: 'in-progress' });
  await pending;
  assert.equal(page.status(), 'in-progress');
  assert.equal(page.button('Completed').props.disabled, false);
});

test('CP13 API failure shows the message and retains the previous status', async () => {
  const page = await (await component({ update: async () => { throw new Error('API ไม่พร้อม'); } })).loaded();
  await page.click('Completed');
  assert.equal(page.error(), 'API ไม่พร้อม');
  assert.equal(page.status(), 'pending');
  assert.equal(page.button('Completed').props.disabled, false);
});

test('CP13 a non-Error rejection uses the fallback and releases updating', async () => {
  const page = await (await component({ update: async () => { throw null; } })).loaded();
  await page.click('In Progress');
  assert.equal(page.error(), 'เปลี่ยนสถานะไม่สำเร็จ');
  assert.equal(page.status(), 'pending');
  assert.equal(page.button('In Progress').props.disabled, false);
});

test('CP13 retry clears the old error and uses the returned status, not a guessed value', async () => {
  const response = deferred();
  let attempt = 0;
  const page = await (await component({ update: () => {
    attempt++;
    return attempt === 1 ? Promise.reject(new Error('ลองใหม่')) : response.promise;
  } })).loaded();
  await page.click('In Progress');
  assert.equal(page.error(), 'ลองใหม่');
  const pending = page.click('In Progress');
  assert.equal(page.error(), '');
  assert.equal(page.status(), 'pending');
  response.resolve({ ...initialRequest, status: 'completed' });
  await pending;
  assert.equal(page.status(), 'completed');
  assert.equal(page.button('Completed').props.disabled, true);
  assert.equal(page.calls.update.length, 2);
});
