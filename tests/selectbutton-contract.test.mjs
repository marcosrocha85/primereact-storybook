import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/SelectButton.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('SelectButton preserves native props and supplied onChange while synchronizing values', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const args = {
    value: ['O1'], options: [{ name: 'Option 1', code: 'O1' }], optionLabel: 'name', optionValue: 'code',
    optionDisabled: 'disabled', multiple: true, allowEmpty: true, invalid: true, disabled: false,
    id: 'options', className: 'custom-options', style: { width: '20rem' }, 'aria-label': 'Options',
    pt: { root: { 'data-testid': 'options-root' } }, ptOptions: { mergeProps: true }, unstyled: true,
    itemTemplate: option => option.name, onChange: callback, onClick: callback,
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args).filter(key => key !== 'onChange')) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { value: ['O1', 'O2'], originalEvent: { type: 'click' } };
  element.props.onChange(event);
  assert.deepEqual(updates[0].value, event.value);
  assert.equal(events[0], event);
});
