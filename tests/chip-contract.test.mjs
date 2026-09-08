import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Chip.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, { exports: module.exports, module,
  require: name => name === 'react' ? { ...nativeRequire(name), useId: () => 'generated' } : nativeRequire(name),
});
const { Playground } = module.exports;

test('Chip preserves forwarded native props and removal cancellation', () => {
  for (const result of [false, true, undefined]) {
    const events = [];
    const updates = [];
    const args = {
      label: 'Action', image: 'avatar.png', imageAlt: 'Avatar', icon: () => 'icon',
      removeIcon: () => 'remove', template: () => 'template', children: 'child',
      removable: true, visible: true, ref: { current: null },
      onRemove: event => { events.push(event); return result; },
      onImageError: event => events.push(event), onClick: event => events.push(event),
      id: 'chip', title: 'Chip', 'aria-label': 'Custom', tabIndex: 2,
      className: 'custom', style: { color: 'red' }, unstyled: true,
      pt: { root: { 'data-custom': 'root' }, removeIcon: () => ({ title: 'Remove' }), hooks: {} },
      ptOptions: { mergeSections: true, mergeProps: true },
    };
    const element = Playground({ args, updateArgs: changes => updates.push(changes) });
    for (const key of Object.keys(args).filter(key => !['visible', 'onRemove', 'ref'].includes(key))) {
      assert.equal(element.props[key], args[key], key);
    }
    assert.equal(element.ref, args.ref);
    assert.equal('visible' in element.props, false);
    const event = { originalEvent: {}, value: 'Action' };
    assert.equal(element.props.onRemove(event), result !== false);
    assert.equal(events[0], event);
    assert.equal(updates.length, result === false ? 0 : 1);
    if (result !== false) assert.equal(updates[0].visible, false);
    element.props.onImageError(event);
    element.props.onClick(event);
    assert.deepEqual(events, [event, event, event]);
  }
  assert.equal(Playground({ args: { visible: false }, updateArgs: () => {} }), null);
  const updates = [];
  const element = Playground({ args: {}, updateArgs: change => updates.push(change) });
  assert.equal(element.props.onRemove({ originalEvent: {}, value: '' }), true);
  assert.equal(updates[0].visible, false);
});
