import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Checkbox.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, { exports: module.exports, module,
  require: name => name === 'react' ? { ...nativeRequire(name), useId: () => 'generated' } : nativeRequire(name),
});
const { Playground } = module.exports;

test('Checkbox preserves native values, callbacks, templates, attributes and PT', () => {
  for (const checked of [true, false, 'yes', 'no', 1, 0, null, undefined]) {
    const events = [];
    const updates = [];
    const callback = event => events.push(event);
    const args = {
      checked, trueValue: 'yes', falseValue: null, value: { city: 'Chicago' },
      label: 'City', inputId: 'custom', 'aria-label': 'Custom name', inputRef: { current: null },
      id: 'root', name: 'city', required: true, tabIndex: 2, autoFocus: true,
      icon: () => 'icon', onChange: callback, onClick: callback, onFocus: callback,
      onBlur: callback, onMouseDown: callback, onContextMenu: callback, onKeyDown: callback,
      tooltip: 'Help', tooltipOptions: { onShow: callback }, unstyled: true,
      pt: { input: { 'aria-describedby': 'help' }, hooks: { useMountEffect: callback } },
      ptOptions: { mergeProps: true }, style: { color: 'red' }, className: 'custom',
    };
    const element = Playground({ args, updateArgs: change => updates.push(change) });
    const [checkbox, label] = element.props.children;
    for (const key of Object.keys(args).filter(key => !['label', 'onChange'].includes(key))) {
      assert.equal(checkbox.props[key], args[key], key);
    }
    assert.equal(label.props.htmlFor, 'custom');
    const event = { checked, value: args.value, preventDefault: callback };
    checkbox.props.onChange(event);
    assert.equal(updates[0].checked, checked);
    assert.equal(events[0], event);
    for (const name of ['onClick', 'onFocus', 'onBlur', 'onMouseDown', 'onContextMenu', 'onKeyDown']) {
      checkbox.props[name](event);
      assert.equal(events.at(-1), event);
    }
  }
});

test('Checkbox associates generated labels and only supplies an accessible fallback when unlabeled', () => {
  for (const label of ['Chicago', '']) {
    const element = Playground({ args: { checked: false, label }, updateArgs: () => {} });
    const checkbox = element.props.children[0];
    assert.equal(checkbox.props.inputId, 'generated');
    assert.equal(checkbox.props['aria-label'], label ? undefined : 'Checkbox');
  }
});
