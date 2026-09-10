import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/SplitButton.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const requireModule = createRequire(filename);
const react = requireModule('react');
const requireForExample = name => name === 'react'
  ? { ...react, useState: initial => [initial, () => {}] }
  : requireModule(name);
vm.runInNewContext(compiled, { exports: module.exports, require: requireForExample, module });
const { Playground, defaultArgs } = module.exports;

test('SplitButton preserves supplied props, menu commands and primary callback', () => {
  const calls = [];
  const command = event => calls.push(event);
  const onClick = event => calls.push(event);
  const args = {
    ...defaultArgs,
    model: [{ label: 'Custom', command }],
    onClick,
    id: 'custom-splitbutton',
    pt: { root: { 'data-contract': 'root' } },
    ptOptions: { mergeProps: true },
    'aria-label': 'Custom split button',
  };

  const rendered = Playground({ args, updateArgs: () => {} });
  const splitButton = rendered.props.children[0];

  for (const key of Object.keys(args)) {
    if (key === 'onClick' || key === 'model') continue;
    assert.equal(splitButton.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(splitButton.props.model[0].command, command, 'supplied menu command is preserved');

  const click = { type: 'click' };
  splitButton.props.onClick(click);
  assert.equal(calls[0], click, 'supplied primary callback receives the original event');
  const commandEvent = { type: 'command' };
  splitButton.props.model[0].command(commandEvent);
  assert.equal(calls[1], commandEvent, 'supplied menu command receives its event');
});
