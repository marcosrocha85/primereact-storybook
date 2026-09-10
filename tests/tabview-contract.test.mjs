import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import vm from 'node:vm';
import { test } from 'node:test';

const filename = new URL('../src/stories/components/TabView.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('TabView preserves native props, children and supplied onTabChange', () => {
  const events = [];
  const callback = event => events.push(event);
  const customChildren = 'native children';
  const args = {
    ...defaultArgs,
    activeIndex: 1,
    renderActiveOnly: false,
    scrollable: true,
    id: 'main-tabs',
    className: 'custom-tabs',
    style: { maxWidth: '40rem' },
    'aria-label': 'Main navigation',
    'data-testid': 'main-tabs',
    pt: { root: { 'data-contract': 'root' }, nav: { 'data-contract': 'nav' } },
    ptOptions: { mergeProps: true },
    unstyled: true,
    children: customChildren,
    onTabChange: callback,
    onBeforeTabChange: callback,
    onFocus: callback
  };
  const updates = [];
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const native = element;

  for (const key of Object.keys(args).filter(key => !['onTabChange', 'children', 'firstHeader', 'secondHeader', 'thirdHeader', 'firstContent', 'secondContent', 'thirdContent'].includes(key))) {
    assert.equal(native.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(native.props.children, customChildren);
  assert.notEqual(native.props.onTabChange, callback);

  const event = { index: 1, originalEvent: { type: 'click' } };
  native.props.onTabChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].activeIndex, 1);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});

test('TabView default example exposes three editable panels', () => {
  assert.equal(defaultArgs.activeIndex, 0);
  assert.equal(defaultArgs.firstHeader, 'Overview');
  assert.equal(defaultArgs.secondHeader, 'Details');
  assert.equal(defaultArgs.thirdHeader, 'Activity');
});
