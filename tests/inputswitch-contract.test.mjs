import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/InputSwitch.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('InputSwitch preserves native values, callbacks, attributes, children and PT', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    checked: 'on', trueValue: 'on', falseValue: 'off',
    inputId: 'switch-input', name: 'notifications', tabIndex: 2,
    id: 'switch-root', className: 'custom-switch', style: { margin: '1rem' },
    'aria-label': 'Notifications', 'data-testid': 'switch',
    children: 'native child', pt: { input: { 'data-input': 'custom' } },
    ptOptions: { mergeProps: true }, unstyled: true,
    onChange: callback, onFocus: callback, onBlur: callback, onClick: callback,
  };
  const element = Playground({ args, updateArgs: change => updates.push(change) });

  for (const key of Object.keys(args).filter(key => !['onChange', 'onFocus', 'onBlur', 'onClick'].includes(key))) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(element.props['aria-label'], 'Notifications');

  const event = { value: 'off', originalEvent: { type: 'change' } };
  element.props.onChange(event);
  assert.equal(updates[0].checked, event.value);
  assert.equal(events[0], event);
  assert.equal(element.props.onFocus, callback);
  assert.equal(element.props.onBlur, callback);
  assert.equal(element.props.onClick, callback);
});

test('InputSwitch supplies an accessible fallback without replacing an explicit label', () => {
  assert.equal(Playground({ args: { checked: false }, updateArgs: () => {} }).props['aria-label'], 'InputSwitch');
  assert.equal(Playground({ args: { checked: false, 'aria-label': 'Custom' }, updateArgs: () => {} }).props['aria-label'], 'Custom');
});
