import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Password.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('Password preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: 'Initial',
    placeholder: 'Password',
    invalid: true,
    variant: 'filled',
    readOnly: false,
    required: true,
    name: 'password',
    inputId: 'password-input',
    inputClassName: 'custom-input',
    inputStyle: { width: '20rem' },
    panelClassName: 'custom-panel',
    tooltip: 'Password',
    tooltipOptions: { position: 'top' },
    unstyled: true,
    pt: { root: { 'data-testid': 'custom-root' } },
    ptOptions: { mergeProps: true },
    onFocus: callback,
    onBlur: callback,
    onInput: callback,
    onKeyUp: callback,
    onChange: callback
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args)) {
    if (key !== 'onChange') assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { target: { value: 'Updated' } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, 'Updated');
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});
