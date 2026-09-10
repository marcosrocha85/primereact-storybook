import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/InputNumber.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('InputNumber preserves native props and supplied callbacks while synchronizing value', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: 12.5,
    format: false,
    showButtons: true,
    buttonLayout: 'horizontal',
    incrementButtonClassName: 'increment',
    decrementButtonClassName: 'decrement',
    incrementButtonIcon: 'pi pi-plus',
    decrementButtonIcon: 'pi pi-minus',
    locale: 'de-DE',
    localeMatcher: 'lookup',
    mode: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    useGrouping: false,
    minFractionDigits: 2,
    maxFractionDigits: 3,
    roundingMode: 'ceil',
    prefix: '€ ',
    suffix: ' net',
    name: 'amount',
    type: 'text',
    allowEmpty: false,
    step: 0.5,
    min: 0,
    max: 100,
    maxLength: 8,
    invalid: true,
    disabled: false,
    variant: 'filled',
    required: true,
    tabIndex: 2,
    pattern: '[0-9]+',
    placeholder: 'Amount',
    readOnly: false,
    size: 10,
    inputId: 'amount',
    autoFocus: false,
    inputStyle: { width: '10rem' },
    inputClassName: 'amount-input',
    tooltip: 'Amount',
    tooltipOptions: { position: 'top' },
    ariaLabelledBy: 'amount-label',
    id: 'amount-container',
    className: 'amount-number',
    style: { margin: '1rem' },
    'aria-label': 'Amount',
    pt: { root: { 'data-root': 'custom' }, input: { 'data-input': 'custom' } },
    ptOptions: { mergeProps: true },
    unstyled: true,
    onValueChange: callback,
    onChange: callback,
    onFocus: callback,
    onBlur: callback,
    onKeyDown: callback,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const input = element.props.children;
  const nativeProps = Object.keys(args).filter(key => key !== 'onValueChange');

  for (const key of nativeProps) assert.equal(input.props[key], args[key], `${key} is forwarded unchanged`);

  const event = { value: 13.5, originalEvent: { type: 'change' }, target: { value: '13.5' } };
  input.props.onValueChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].value, event.value);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
  assert.equal(input.props.onChange, callback);
  assert.equal(input.props.onFocus, callback);
  assert.equal(input.props.onBlur, callback);
  assert.equal(input.props.onKeyDown, callback);
});
