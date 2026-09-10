import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/InputTextarea.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('InputTextarea preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: 'Initial', placeholder: 'Description', rows: 4, cols: 40, autoResize: true,
    invalid: true, variant: 'filled', keyfilter: 'alpha', required: true, name: 'description',
    id: 'description-input', maxLength: 200, tabIndex: 2, className: 'custom-textarea',
    style: { width: '20rem' }, readOnly: false, disabled: false, tooltip: 'Description',
    tooltipOptions: { position: 'top' }, unstyled: true,
    pt: { root: { 'data-testid': 'custom-root' } }, ptOptions: { mergeProps: true }, children: null,
    onFocus: callback, onBlur: callback, onInput: callback, onKeyDown: callback, onKeyUp: callback,
    onPaste: callback, onChange: callback,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const input = element.props;

  for (const key of Object.keys(args)) {
    if (key !== 'onChange') assert.equal(input[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { target: { value: 'Updated' } };
  input.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, 'Updated');
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
  for (const key of ['onFocus', 'onBlur', 'onInput', 'onKeyDown', 'onKeyUp', 'onPaste']) {
    assert.equal(input[key], callback, `${key} is preserved`);
  }
});
