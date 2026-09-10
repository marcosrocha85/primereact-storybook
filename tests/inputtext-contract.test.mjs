import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/InputText.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('InputText preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: 'Initial',
    placeholder: 'Name',
    keyfilter: 'alpha',
    validateOnly: true,
    invalid: true,
    disabled: false,
    readOnly: false,
    variant: 'filled',
    required: true,
    name: 'name',
    id: 'name-input',
    type: 'text',
    size: 24,
    maxLength: 80,
    tabIndex: 2,
    className: 'custom-input',
    style: { width: '20rem' },
    autoFocus: false,
    tooltip: 'Name',
    tooltipOptions: { position: 'top' },
    unstyled: true,
    pt: { root: { 'data-testid': 'custom-root' } },
    ptOptions: { mergeProps: true },
    children: null,
    onFocus: callback,
    onBlur: callback,
    onInput: callback,
    onKeyDown: callback,
    onPaste: callback,
    onChange: callback
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
  assert.equal(input.onFocus, callback);
  assert.equal(input.onBlur, callback);
  assert.equal(input.onInput, callback);
  assert.equal(input.onKeyDown, callback);
  assert.equal(input.onPaste, callback);
});
