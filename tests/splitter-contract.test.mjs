import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Splitter.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('Splitter preserves native props, children, and resize callback', () => {
  const callback = () => {};
  const children = { type: 'custom-panel' };
  const args = {
    ...defaultArgs,
    layout: 'vertical',
    gutterSize: 8,
    step: 10,
    id: 'splitter',
    className: 'custom-splitter',
    style: { height: '20rem' },
    'aria-label': 'Resizable panels',
    'data-testid': 'splitter',
    onResizeEnd: callback,
    pt: { root: { 'data-testid': 'custom-root' } },
    ptOptions: { mergeProps: true },
    unstyled: true,
    children
  };

  const element = Playground({ args, updateArgs: () => {} });

  for (const key of Object.keys(args)) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(element.props.children, children);
  assert.equal(element.props.onResizeEnd, callback);
});

test('Splitter default example includes resizable panel composition', () => {
  assert.equal(defaultArgs.layout, 'horizontal');
  assert.equal(defaultArgs.gutterSize, 4);
  assert.equal(defaultArgs.step, 5);
  assert.ok(defaultArgs.style);
});
