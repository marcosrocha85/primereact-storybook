import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/MultiSelect.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('MultiSelect preserves native props and supplied onChange while synchronizing values', () => {
  const updates = [];
  const events = [];
  const callback = event => events.push(event);
  const itemTemplate = option => option.name;
  const args = {
    value: [{ name: 'Brazil', code: 'BR' }],
    options: [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }],
    optionLabel: 'name',
    optionValue: 'code',
    display: 'chip',
    filter: true,
    filterBy: 'name',
    filterMatchMode: 'startsWith',
    filterPlaceholder: 'Search countries',
    itemTemplate,
    invalid: true,
    disabled: false,
    variant: 'filled',
    showClear: true,
    maxSelectedLabels: 2,
    id: 'countries',
    className: 'custom-multiselect',
    style: { width: '20rem' },
    'aria-label': 'Countries',
    pt: { root: { 'data-testid': 'countries-root' } },
    ptOptions: { mergeProps: true },
    onFilter: callback,
    onShow: callback,
    onHide: callback,
    onChange: callback
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });

  for (const key of Object.keys(args)) {
    if (key !== 'onChange') assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }

  const event = { value: ['AU'], originalEvent: { type: 'click' }, target: { value: ['AU'] } };
  element.props.onChange(event);
  assert.equal(updates.length, 1);
  assert.deepEqual(updates[0].value, event.value);
  assert.equal(events.length, 1);
  assert.equal(events[0], event);
});
