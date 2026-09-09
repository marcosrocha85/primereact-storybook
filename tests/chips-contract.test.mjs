import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Chips.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, {
  exports: module.exports,
  module,
  require: name => name === 'react' ? { ...nativeRequire(name), useId: () => 'generated' } : nativeRequire(name),
});
const { Playground } = module.exports;

test('Chips preserves native props and forwards callbacks', () => {
  const updates = [];
  const events = [];
  const addReturnValues = [undefined, false];

  for (const addReturnValue of addReturnValues) {
    updates.length = 0;
    events.length = 0;
    const args = {
      value: ['Alpha'],
      placeholder: 'Add city',
      separator: ',',
      disabled: false,
      readOnly: false,
      invalid: false,
      variant: 'filled',
      max: 2,
      removable: true,
      allowDuplicate: false,
      addOnBlur: true,
      name: 'chips-field',
      id: 'chips',
      inputId: 'chips-input',
      inputRef: { current: null },
      className: 'chips-demo',
      style: { width: '26rem', padding: '4px' },
      tabIndex: 1,
      'aria-label': 'City chips',
      title: 'chips title',
      itemTemplate: item => item,
      onAdd: event => {
        events.push({ type: 'add', event });
        return addReturnValue;
      },
      onRemove: event => events.push({ type: 'remove', event }),
      onChange: event => events.push({ type: 'change', event }),
      onKeyDown: event => events.push({ type: 'keyDown', event }),
      onFocus: event => events.push({ type: 'focus', event }),
      onBlur: event => events.push({ type: 'blur', event }),
      pt: { root: { 'data-root': 'chips-root' }, token: { 'data-token': 'chip' }, hooks: {} },
      ptOptions: { mergeSections: true, mergeProps: true },
      tooltip: 'City tags',
      tooltipOptions: { position: 'top' },
      ariaLabelledBy: 'city-list',
      children: 'child'
    };

    const element = Playground({ args, updateArgs: changes => updates.push(changes) });
    for (const key of Object.keys(args)) {
      if (key === 'onChange') {
        assert.equal(typeof element.props[key], 'function');
      } else {
        assert.equal(element.props[key], args[key], key);
      }
    }

    const onChangeEvent = {
      originalEvent: {},
      value: ['Alpha', 'Beta'],
      target: { name: 'chips-field', id: 'chips', value: ['Alpha', 'Beta'] }
    };
    element.props.onChange(onChangeEvent);
    assert.equal(updates.length, 1);
    assert.equal(updates.at(-1).value, onChangeEvent.value);
    assert.equal(events.filter((entry) => entry.type === 'change').length, 1);
    assert.equal(events.at(-1).event, onChangeEvent);
    const onAddEvent = { originalEvent: {}, value: 'Omega' };
    assert.equal(element.props.onAdd(onAddEvent), addReturnValue);
    const onRemoveEvent = { originalEvent: {}, value: 'Alpha' };
    element.props.onRemove(onRemoveEvent);
    assert.equal(events.find(entry => entry.type === 'add').event, onAddEvent);
    assert.equal(events.find(entry => entry.type === 'remove').event, onRemoveEvent);
  }

  const nullValueUpdates = [];
  const nullValueEvents = [];
  const nullValueArgs = {
    onChange: event => nullValueEvents.push(event)
  };
  const nullValueElement = Playground({ args: nullValueArgs, updateArgs: change => nullValueUpdates.push({ type: 'update', change }) });
  assert.equal(
    nullValueElement.props.onChange({ originalEvent: {}, value: undefined, target: { value: undefined, name: 'city', id: 'chip-city' } }),
    undefined
  );
  assert.equal(nullValueUpdates[0].type, 'update');
  assert.equal(nullValueUpdates[0].change.value.length, 0);
  assert.deepEqual(nullValueEvents[0], { originalEvent: {}, value: undefined, target: { value: undefined, name: 'city', id: 'chip-city' } });
});
