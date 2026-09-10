import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Dropdown.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, {
  exports: module.exports,
  module,
  require: name => nativeRequire(name),
});
const { Playground } = module.exports;

test('Dropdown preserves native props, value modes, PT and supplied callbacks', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const options = [{ name: 'Rome', code: 'RM' }];
  const itemTemplate = option => option.name;
  const args = {
    value: options[0],
    options,
    optionLabel: 'name',
    optionValue: 'code',
    optionDisabled: option => option.code === 'RM',
    itemTemplate,
    filter: true,
    filterBy: 'name',
    filterMatchMode: 'contains',
    invalid: true,
    variant: 'filled',
    editable: true,
    showClear: true,
    checkmark: true,
    disabled: false,
    inputId: 'city',
    id: 'dropdown',
    name: 'city',
    className: 'custom-dropdown',
    style: { width: '20rem' },
    'aria-label': 'City',
    pt: { root: { 'data-root': 'dropdown' }, panel: { 'data-panel': 'dropdown' } },
    ptOptions: { mergeProps: true },
    onFocus: callback,
    onBlur: callback,
    onFilter: callback,
    onShow: callback,
    onHide: callback,
    onChange: callback,
  };

  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], key);
  }

  const event = { value: 'RM', originalEvent: {} };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, event.value);
  assert.equal(events[0], event);
});
