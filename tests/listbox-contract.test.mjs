import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/ListBox.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('ListBox preserves native props and supplied onChange while synchronizing values', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const itemTemplate = option => option.name;
  const args = {
    value: [{ name: 'Rome', code: 'RM' }],
    options: [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }],
    optionLabel: 'name',
    optionValue: 'code',
    multiple: true,
    filter: true,
    filterBy: 'name',
    filterMatchMode: 'startsWith',
    filterPlaceholder: 'Search cities',
    itemTemplate,
    optionDisabled: 'disabled',
    invalid: true,
    disabled: false,
    metaKeySelection: false,
    id: 'cities',
    className: 'cities-list',
    style: { width: '20rem' },
    'aria-label': 'Cities',
    pt: { root: { 'data-testid': 'cities-root' } },
    ptOptions: { mergeProps: true },
    onChange: callback,
    onFilterValueChange: callback,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args)) {
    if (key !== 'onChange') assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { value: ['NY'], originalEvent: { type: 'click' }, target: { value: ['NY'] } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, event.value);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});
