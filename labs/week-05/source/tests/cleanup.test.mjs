import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate } from 'node:timers/promises';
import vm from 'node:vm';
import { transformWithOxc } from 'vite';

// Compile unchanged page JSX; control service completion ordering and effect cleanup.
// This is a component callback harness, not React DOM or browser E2E.
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

async function mount(page) {
  const file = new URL(`../src/pages/${page}.jsx`, import.meta.url);
  const compiled = await transformWithOxc(await readFile(file, 'utf8'), file.pathname, {
    jsx: { runtime: 'automatic' },
  });
  const states = [], pending = [];
  let cursor = 0, previous, setup, cleanup, dependency = 'REQ-001', reloadKey = 0;
  let unmounted = false, writesAfterUnmount = 0;
  const jsx = (type, props) => ({ type, props });
  const context = vm.createContext({ Error });
  const service = (options) => {
    const request = deferred();
    pending.push({ ...request, options });
    return request.promise;
  };
  const imports = {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], (value) => {
          if (unmounted) writesAfterUnmount++;
          states[index] = typeof value === 'function' ? value(states[index]) : value;
        }];
      },
      useMemo: (calculate) => calculate(),
      useEffect(effect, dependencies) {
        if (!previous || dependencies.some((value, index) => value !== previous[index])) {
          cleanup?.();
          setup = effect;
          previous = [...dependencies];
          cleanup = effect();
        }
      },
    },
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    'react-router-dom': {
      Link: 'Link',
      useParams: () => ({ requestId: dependency }),
      useSearchParams: () => [new URLSearchParams({ scenario: dependency }), () => {}],
    },
    '../hooks/useManualReload.js': { default: () => [reloadKey, () => {}] },
    '../services/requestService.js': {
      getRequests: service, getRequestById: service,
      deleteRequest: async () => [], resetRequests: async () => [],
    },
  };
  for (const name of ['ErrorState', 'FilterBar', 'LoadingState', 'RequestList', 'SummaryPanel']) {
    imports[`../components/${name}.jsx`] = { default: name };
  }
  const module = new vm.SourceTextModule(compiled.code, { context });
  await module.link((specifier) => {
    assert.ok(imports[specifier], `Unknown import: ${specifier}`);
    const values = imports[specifier];
    return new vm.SyntheticModule(Object.keys(values), function () {
      for (const [name, value] of Object.entries(values)) this.setExport(name, value);
    }, { context });
  });
  await module.evaluate();
  const render = () => { cursor = 0; module.namespace.default(); };
  render();
  return {
    pending, states,
    change() { dependency = 'REQ-002'; render(); },
    reload() { reloadKey++; render(); },
    unmount() { cleanup?.(); unmounted = true; },
    strictReplay() { cleanup?.(); cleanup = setup(); },
    writesAfterUnmount: () => writesAfterUnmount,
    state: () => JSON.stringify(states),
  };
}

const result = (page, id) => page === 'DashboardPage' ? [{ id, status: 'pending' }] : { id, status: 'pending' };
for (const page of ['DashboardPage', 'RequestDetailPage']) {
  test(`${page}: current successful request still updates state`, async () => {
    const app = await mount(page);
    app.pending[0].resolve(result(page, 'CURRENT'));
    await setImmediate();
    assert.equal(app.states[0], 'success');
    assert.match(app.state(), /CURRENT/);
  });
  for (const outcome of ['resolve', 'reject']) {
    test(`${page}: ${outcome} after unmount cannot write state`, async () => {
      const app = await mount(page);
      app.unmount();
      app.pending[0][outcome](outcome === 'resolve' ? result(page, 'OLD') : new Error('OLD ERROR'));
      await setImmediate();
      assert.equal(app.writesAfterUnmount(), 0);
    });
  }
  for (const action of ['change', 'reload', 'strictReplay']) {
    test(`${page}: ${action} keeps the newer response when the old response finishes last`, async () => {
      const app = await mount(page);
      app[action]();
      app.pending[1].resolve(result(page, 'CURRENT'));
      await setImmediate();
      const current = app.state();
      app.pending[0].resolve(result(page, 'OLD'));
      await setImmediate();
      assert.equal(app.state(), current);
    });
  }
  test(`${page}: old rejection cannot replace the current successful request`, async () => {
    const app = await mount(page);
    app.change();
    app.pending[1].resolve(result(page, 'CURRENT'));
    await setImmediate();
    const current = app.state();
    app.pending[0].reject(new Error('OLD ERROR'));
    await setImmediate();
    assert.equal(app.state(), current);
  });
}
for (const action of ['unmount', 'change']) {
  test(`DashboardPage: onRecovery after ${action} cannot show an old notice`, async () => {
    const app = await mount('DashboardPage');
    app[action]();
    const current = app.state();
    app.pending[0].options.onRecovery('OLD RECOVERY');
    assert.equal(app.state(), current);
    assert.equal(app.writesAfterUnmount(), 0);
  });
}
test('DashboardPage: current onRecovery notice is still shown', async () => {
  const app = await mount('DashboardPage');
  app.pending[0].options.onRecovery('CURRENT RECOVERY');
  assert.match(app.state(), /CURRENT RECOVERY/);
});
