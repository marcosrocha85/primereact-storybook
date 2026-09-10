import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Slider.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module, require: createRequire(filename) });
const { Playground } = module.exports;

test('Slider preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: [25, 75], min: 0, max: 100, step: 5, orientation: 'vertical', range: true, disabled: false,
    ariaLabelledBy: 'range-label', id: 'price-slider', className: 'custom-slider',
    style: { margin: '1rem' }, tabIndex: 2, 'aria-label': 'Price range', 'data-testid': 'slider',
    onFocus: callback, onBlur: callback, onKeyDown: callback,
    onSlideEnd: callback, pt: { root: { 'data-testid': 'custom-root' }, handle: { className: 'custom-handle' } },
    ptOptions: { mergeProps: true }, unstyled: true, children: null, onChange: callback
  };
  const wrapper = Playground({ args, updateArgs: changes => updates.push(changes) });
  const element = wrapper.props.children;

  assert.equal(wrapper.props.style.width, '4rem');
  assert.equal(wrapper.props.style.height, '12rem');
  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(element.props.onSlideEnd, args.onSlideEnd);

  const event = { value: [30, 80], originalEvent: { type: 'keydown' } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, event.value);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});

test('Slider default example keeps the native single-value mode', () => {
  const { defaultArgs } = module.exports;
  assert.equal(defaultArgs.value, 50);
  assert.equal(defaultArgs.range, false);
  assert.equal(defaultArgs.orientation, 'horizontal');
});
