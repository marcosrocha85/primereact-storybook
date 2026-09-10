import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';

const filename = new URL('../src/stories/components/Dialog.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('Dialog preserves native props, children, pass-through options and supplied callbacks', () => {
  const calls = { hide: 0, show: 0 };
  const children = React.createElement('strong', null, 'Native content');
  const args = {
    header: 'Native header',
    footer: 'Native footer',
    children,
    visible: true,
    modal: false,
    position: 'top-right',
    maximizable: true,
    pt: { root: { 'data-dialog': 'custom' } },
    ptOptions: { mergeProps: true },
    id: 'native-dialog',
    'aria-label': 'Native dialog',
    onHide: () => { calls.hide += 1; },
    onShow: () => { calls.show += 1; },
  };
  const rendered = Playground({ args, updateArgs: () => {} });
  const dialog = rendered.props.children[1];

  for (const key of Object.keys(args)) {
    if (key === 'children' || key === 'onHide' || key === 'onShow') continue;
    assert.equal(dialog.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(dialog.props.children, children, 'supplied children are preserved');
  dialog.props.onShow();
  dialog.props.onHide();
  assert.equal(calls.show, 1);
  assert.equal(calls.hide, 1);
});
