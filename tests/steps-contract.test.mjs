import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Steps.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('Steps preserves native props, model values, PT and supplied callback', () => {
  const events = [];
  const callback = event => events.push(event);
  const model = [
    { label: 'Personal', icon: 'pi pi-user' },
    { label: 'Seat', disabled: true },
    { label: 'Payment', url: '/payment' }
  ];
  const args = {
    ...defaultArgs,
    model,
    activeIndex: 1,
    readOnly: false,
    id: 'checkout-steps',
    className: 'custom-steps',
    style: { maxWidth: '40rem' },
    'aria-label': 'Checkout progress',
    'data-testid': 'steps',
    onSelect: callback,
    pt: { root: { 'data-contract': 'root' }, action: { 'data-contract': 'action' } },
    ptOptions: { mergeProps: true },
    unstyled: true
  };
  const updates = [];
  const element = Playground({ args, updateArgs: change => updates.push(change) });

  const native = element.props.children;
  for (const key of Object.keys(args).filter(key => key !== 'onSelect')) {
    assert.equal(native.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.notEqual(native.props.onSelect, callback);
  const event = { index: 2, item: model[2] };
  native.props.onSelect(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].activeIndex, 2);
  assert.equal(events[0], event);
});

test('Steps default example exposes a selectable workflow', () => {
  assert.equal(defaultArgs.activeIndex, 0);
  assert.equal(defaultArgs.readOnly, false);
  assert.equal(defaultArgs.model.map(item => item.label).join(','), 'Personal,Seat,Payment');
});
