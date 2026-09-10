import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/RadioButton.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, {
  exports: module.exports,
  module,
  require: name => name === 'react' ? { ...createRequire(filename)(name), useId: () => 'generated' } : createRequire(filename)(name),
});
const { Playground } = module.exports;

test('RadioButton preserves native props, PT, inherited callbacks and supplied onChange', () => {
  const events = [];
  const updates = [];
  const callback = event => events.push(event);
  const value = { city: 'Chicago' };
  const args = {
    checked: false, value, inputId: 'city-radio', name: 'city', required: true,
    tabIndex: 2, autoFocus: true, id: 'radio-root', className: 'custom-radio',
    style: { color: 'red' }, 'aria-label': 'City', 'data-testid': 'radio',
    children: 'native child', tooltip: 'Help', tooltipOptions: { onShow: callback },
    pt: { input: { 'aria-describedby': 'help' }, hooks: { useMountEffect: callback } },
    ptOptions: { mergeProps: true }, unstyled: true,
    onClick: callback, onFocus: callback, onBlur: callback, onMouseDown: callback,
    onContextMenu: callback, onKeyDown: callback, onChange: callback,
  };
  const element = Playground({ args, updateArgs: change => updates.push(change) });
  const [radio, label] = element.props.children;

  for (const key of Object.keys(args).filter(key => !['onChange', 'inputId'].includes(key))) {
    assert.equal(radio.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(radio.props.inputId, args.inputId);
  assert.equal(label.props.htmlFor, args.inputId);
  assert.equal(label.props.children, String(value));

  const event = { checked: true, value, originalEvent: { type: 'change' } };
  radio.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].checked, true);
  assert.equal(events[0], event);
  for (const name of ['onClick', 'onFocus', 'onBlur', 'onMouseDown', 'onContextMenu', 'onKeyDown']) {
    radio.props[name](event);
    assert.equal(events.at(-1), event, `${name} remains callable`);
  }
});

test('RadioButton supplies a unique generated input id and fallback accessible name', () => {
  const element = Playground({ args: { checked: false }, updateArgs: () => {} });
  const [radio, label] = element.props.children;
  assert.equal(radio.props.inputId, 'generated');
  assert.equal(radio.props['aria-label'], 'RadioButton');
  assert.equal(label.props.htmlFor, 'generated');
});
