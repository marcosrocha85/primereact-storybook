import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/ScrollPanel.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('ScrollPanel preserves native props and caller children', () => {
  const children = { type: 'custom-content' };
  const callback = () => {};
  const pt = { root: { 'data-testid': 'custom-scrollpanel' } };
  const args = {
    id: 'scrollpanel', className: 'custom-panel', style: { height: '10rem' },
    title: 'Scrollable content', tabIndex: 2, 'aria-label': 'Results',
    'data-testid': 'panel', children, onScroll: callback, pt,
    ptOptions: { mergeProps: true }, unstyled: true
  };
  const element = Playground({ args, updateArgs: () => {} });

  for (const key of Object.keys(args)) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }
});

test('ScrollPanel default example keeps a constrained overflow viewport', () => {
  assert.equal(defaultArgs.style.width, '24rem');
  assert.equal(defaultArgs.style.maxWidth, '100%');
  assert.equal(defaultArgs.style.height, '160px');
});
