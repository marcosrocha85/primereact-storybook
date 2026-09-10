import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Knob.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, {
  exports: module.exports,
  module,
  require: name => nativeRequire(name)
});
const { Playground } = module.exports;

test('Knob preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: 20,
    min: -50,
    max: 50,
    step: 10,
    size: 120,
    disabled: false,
    readOnly: false,
    showValue: true,
    strokeWidth: 18,
    name: 'volume',
    valueTemplate: '{value}%',
    valueColor: 'red',
    rangeColor: 'gray',
    textColor: 'black',
    id: 'volume-knob',
    className: 'custom-knob',
    style: { margin: '1rem' },
    tabIndex: 2,
    'aria-label': 'Volume',
    onFocus: callback,
    onBlur: callback,
    onKeyDown: callback,
    pt: { root: { 'data-testid': 'custom-root' } },
    ptOptions: { mergeProps: true },
    unstyled: true,
    children: null,
    onChange: callback
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { value: 30 };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, 30);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});
