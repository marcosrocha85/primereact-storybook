import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Rating.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground } = module.exports;

test('Rating preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const pt = { root: { 'data-testid': 'custom-rating' }, item: { className: 'custom-item' } };
  const args = {
    value: 3, stars: 7, cancel: true, disabled: false, readOnly: false,
    id: 'rating', className: 'custom-rating', style: { margin: '1rem' }, tabIndex: 2,
    'aria-label': 'Product rating', 'data-testid': 'rating', children: null,
    onClick: callback, onFocus: callback, onBlur: callback, onKeyDown: callback,
    onIcon: 'pi pi-star-fill', offIcon: 'pi pi-star', cancelIcon: 'pi pi-times',
    cancelIconProps: { 'aria-label': 'Clear rating' },
    onIconProps: { 'data-icon': 'on' }, offIconProps: { 'data-icon': 'off' },
    tooltip: 'Choose a rating', tooltipOptions: { position: 'top' }, pt,
    ptOptions: { mergeProps: true }, unstyled: true, onChange: callback
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { value: null, originalEvent: { type: 'click' } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, undefined);
  assert.deepEqual(events, [event]);
});

test('Rating default example keeps the native selection shape', () => {
  const { defaultArgs } = module.exports;
  assert.equal(defaultArgs.value, 3);
  assert.equal(defaultArgs.stars, 5);
  assert.equal(defaultArgs.cancel, true);
  assert.equal(defaultArgs.disabled, false);
  assert.equal(defaultArgs.readOnly, false);
});
