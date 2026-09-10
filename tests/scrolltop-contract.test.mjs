import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/ScrollTop.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground, defaultArgs } = module.exports;

test('ScrollTop playground preserves native props and callbacks', () => {
  const callback = () => {};
  const onShow = () => {};
  const pt = { root: { 'data-testid': 'custom-scrolltop' } };
  const args = {
    target: 'window', threshold: 240, icon: 'pi pi-search', behavior: 'auto',
    className: 'custom-scrolltop', style: { right: '1rem' }, transitionOptions: { timeout: 50 },
    id: 'scrolltop', title: 'Back to top', tabIndex: 2, 'aria-label': 'Top',
    'data-testid': 'story-scrolltop', onClick: callback, onShow, pt,
    children: { type: 'custom-content' }
  };
  const element = Playground({ args, updateArgs: () => {} });
  const scrollTop = element.props.children[1];

  for (const key of Object.keys(args)) assert.equal(scrollTop.props[key], args[key], `${key} is forwarded unchanged`);
});

test('ScrollTop default example uses a local parent target and threshold', () => {
  assert.equal(defaultArgs.target, 'parent');
  assert.equal(defaultArgs.threshold, 100);
  assert.equal(defaultArgs.behavior, 'smooth');
});
