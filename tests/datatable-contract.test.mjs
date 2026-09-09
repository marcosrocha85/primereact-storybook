import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/DataTable.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, {
  exports: module.exports,
  module,
  require: name => name === 'react'
    ? { ...nativeRequire(name), useState: initial => [initial, () => {}] }
    : nativeRequire(name),
});
const { Playground } = module.exports;

test('DataTable preserves native props, Column children, PT and supplied callbacks', () => {
  const events = [];
  const updates = [];
  const callback = event => events.push(event);
  const args = {
    value: [{ id: '1', name: 'Item', category: 'Tools', price: 10 }],
    dataKey: 'id',
    selectionMode: 'single',
    selection: null,
    paginator: true,
    rows: 5,
    size: 'small',
    responsiveLayout: 'scroll',
    filters: { name: { value: 'Item', matchMode: 'contains' } },
    header: 'Header',
    rowExpansionTemplate: callback,
    pt: { root: { 'data-contract': 'root' }, table: { 'data-contract': 'table' } },
    ptOptions: { mergeProps: true },
    id: 'table',
    'aria-label': 'Products',
    className: 'custom-table',
    onRowClick: callback,
    onSelectionChange: callback,
  };

  const element = Playground({ args, updateArgs: change => updates.push(change) });
  for (const key of Object.keys(args).filter(key => key !== 'onSelectionChange')) {
    assert.equal(element.props[key], args[key], key);
  }
  assert.equal(element.props.children.length, 3);
  assert.equal(element.props.children[0].props.field, 'name');

  const event = { value: args.value[0], type: 'single' };
  element.props.onSelectionChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].selection, event.value);
  assert.equal(events[0], event);
});
