import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Sidebar.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('Sidebar preserves native props and supplied onHide while synchronizing visibility', () => {
  const updates = [];
  const events = [];
  const callback = () => events.push('hide');
  const args = {
    visible: true, position: 'top', dismissable: false, modal: false, showCloseIcon: false,
    closeOnEscape: false, fullScreen: true, blockScroll: true, id: 'sidebar',
    className: 'custom-sidebar', style: { width: '20rem' }, 'aria-label': 'Navigation',
    pt: { root: { 'data-testid': 'sidebar-root' } }, ptOptions: { mergeProps: true },
    unstyled: true, children: 'Content', onHide: callback, onShow: callback,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const sidebar = element.props.children[1];

  for (const key of Object.keys(args).filter(key => key !== 'onHide')) {
    assert.equal(sidebar.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(sidebar.props.children, 'Content');

  sidebar.props.onHide();
  assert.equal(updates.length, 1);
  assert.equal(updates[0].visible, false);
  assert.deepEqual(events, ['hide']);
});
