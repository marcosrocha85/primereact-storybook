import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/ColorPicker.examples.tsx', import.meta.url);
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

test('ColorPicker preserves native value modes, props, PT and callbacks', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: { r: 25, g: 118, b: 210 },
    format: 'rgb',
    inline: true,
    defaultColor: 'ff0000',
    disabled: false,
    autoFocus: true,
    inputId: 'brand-color',
    inputRef: { current: null },
    inputStyle: { width: '5rem' },
    inputClassName: 'custom-input',
    panelClassName: 'custom-panel',
    panelStyle: { border: '1px solid red' },
    tooltip: 'Brand color',
    tooltipOptions: { position: 'top' },
    name: 'brand-color',
    id: 'color-picker',
    className: 'custom-picker',
    style: { width: '2rem' },
    tabIndex: 2,
    'aria-label': 'Brand color',
    onShow: callback,
    onHide: callback,
    onChange: callback,
    onFocus: callback,
    onBlur: callback,
    pt: { root: { 'data-root': 'picker' }, input: { 'data-input': 'color' }, hooks: {} },
    ptOptions: { mergeProps: true },
    unstyled: true,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], key);
  }

  const event = { value: { r: 40, g: 80, b: 120 }, originalEvent: {}, target: { value: '285078' } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, event.value);
  assert.equal(events[0], event);
  assert.equal(element.props.onShow, callback);
  assert.equal(element.props.onHide, callback);
  assert.equal(element.props.onFocus, callback);
  assert.equal(element.props.onBlur, callback);
});
