import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import vm from 'node:vm';
import { test } from 'node:test';

const filename = new URL('../src/stories/components/TabMenu.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('TabMenu preserves native props, MenuItem values, PT and supplied callback', () => {
  const events = [];
  const callback = event => events.push(event);
  const model = [
    { label: 'Home', icon: 'pi pi-home', data: { route: 'home' } },
    { label: 'Disabled', disabled: true },
    { label: 'Reports', url: '/reports', target: '_blank', className: 'reports-tab' }
  ];
  const args = {
    ...defaultArgs,
    model,
    activeIndex: 2,
    id: 'main-tabs',
    className: 'custom-tabs',
    style: { maxWidth: '40rem' },
    'aria-label': 'Main navigation',
    'data-testid': 'main-tabs',
    onTabChange: callback,
    pt: { root: { 'data-contract': 'root' }, menu: { 'data-contract': 'menu' } },
    ptOptions: { mergeProps: true },
    unstyled: true,
    onFocus: callback
  };
  const updates = [];
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const native = element.props.children;

  for (const key of Object.keys(args).filter(key => key !== 'onTabChange')) {
    assert.equal(native.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.notEqual(native.props.onTabChange, callback);
  const event = { index: 2, value: model[2], originalEvent: { type: 'click' } };
  native.props.onTabChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].activeIndex, 2);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});

test('TabMenu default example exposes the base navigation model', () => {
  assert.equal(defaultArgs.activeIndex, 0);
  assert.equal(defaultArgs.model.map(item => item.label).join(','), 'Home,Calendar');
});
