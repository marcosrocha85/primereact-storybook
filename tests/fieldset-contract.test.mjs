import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const filename = new URL('../src/stories/components/Fieldset.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('Fieldset preserves native content, attributes, pass-through props and callbacks', () => {
  const updates = [];
  const toggles = [];
  const children = React.createElement('strong', null, 'Native content');
  const onToggle = (event) => toggles.push(event);
  const pt = { root: { 'data-fieldset': 'custom' }, content: { className: 'custom-content' } };
  const args = {
    legend: 'Native legend',
    toggleable: true,
    collapsed: false,
    children,
    contentText: 'Ignored fallback',
    id: 'native-fieldset',
    'aria-label': 'Native fieldset',
    className: 'custom-fieldset',
    pt,
    onToggle,
    onClick: () => {},
  };
  const element = Playground({ args, updateArgs: (changes) => updates.push(changes) });

  for (const key of ['legend', 'toggleable', 'collapsed', 'id', 'aria-label', 'className', 'pt', 'onClick']) {
    assert.equal(element.props[key], args[key], `${key} is forwarded unchanged`);
  }
  assert.equal(element.props.children, children, 'native children are preserved');
  assert.equal('contentText' in element.props, false, 'story-only fallback is not passed to PrimeReact');

  const event = { value: true, originalEvent: { type: 'click' } };
  element.props.onToggle(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].collapsed, true);
  assert.equal(toggles.length, 1);
  assert.equal(toggles[0], event);

  const fallback = Playground({ args: { legend: 'Fallback', contentText: 'Fallback content' }, updateArgs: () => {} });
  assert.match(renderToStaticMarkup(fallback), /Fallback content/);
});

test('Fieldset keeps explicit null children instead of substituting fallback content', () => {
  const element = Playground({ args: { children: null, contentText: 'Ignored' }, updateArgs: () => {} });
  assert.equal(element.props.children, null);
});
