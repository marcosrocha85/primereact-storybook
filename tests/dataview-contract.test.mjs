import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/DataView.examples.tsx', import.meta.url);
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

test('DataView preserves native props, templates, PT and supplied callbacks', () => {
  const renderedItems = [];
  const itemTemplate = item => {
    renderedItems.push(item);
    return 'custom item';
  };
  const onPage = () => {};
  const args = {
    value: [{ id: '1', name: 'Item' }],
    dataKey: 'id',
    layout: 'grid',
    paginator: true,
    rows: 1,
    header: 'Header',
    footer: 'Footer',
    itemTemplate,
    onPage,
    pt: { root: { 'data-contract': 'root' } },
    ptOptions: { mergeProps: true },
    id: 'data-view',
    'aria-label': 'Products',
    className: 'custom-view',
  };

  const element = Playground({ args, updateArgs: () => {} });
  for (const key of Object.keys(args)) assert.equal(element.props[key], args[key], key);
  assert.equal(element.props.itemTemplate(args.value[0], args.layout), 'custom item');
  assert.equal(renderedItems[0], args.value[0]);
});

test('DataView supplies a product template only when no native template is provided', () => {
  const element = Playground({ args: { value: [{ name: 'Item' }] }, updateArgs: () => {} });
  assert.equal(typeof element.props.itemTemplate, 'function');
});
