import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const filename = new URL('../src/stories/components/Card.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;
const render = (args) => Playground({ args, updateArgs: () => assert.fail('Card has no controlled state') });

test('Card preserves native slots, slot callbacks, attributes and pass-through props', () => {
  const calls = [];
  const onClick = (event) => calls.push(event);
  const pt = { root: { 'data-card': 'custom' }, content: { className: 'custom-content' } };
  const ptOptions = { mergeSections: true, mergeProps: true };
  const args = {
    title: (props) => React.createElement('strong', null, props.id),
    subTitle: React.createElement('em', null, 'Native subtitle'),
    header: (props) => React.createElement('span', null, `Header ${props.id}`),
    footer: (props) => React.createElement('span', null, `Footer ${props.id}`),
    children: React.createElement('button', { onClick }, 'Native child'),
    contentText: 'Ignored content', headerText: 'Ignored header', footerText: 'Ignored footer',
    id: 'native-card', 'aria-label': 'Native card', role: 'region', tabIndex: 0,
    onClick, pt, ptOptions, unstyled: false, style: { color: 'red' }, className: 'custom-card',
  };
  const element = render(args);
  const card = element.props.children;
  for (const key of ['title', 'subTitle', 'header', 'footer', 'children', 'onClick', 'pt', 'ptOptions', 'style', 'className', 'unstyled', 'role', 'tabIndex']) {
    assert.equal(card.props[key], args[key], `${key} is forwarded unchanged`);
  }
  for (const key of ['contentText', 'headerText', 'footerText']) assert.equal(key in card.props, false);
  const event = { type: 'click' };
  card.props.onClick(event);
  assert.deepEqual(calls, [event]);
  const html = renderToStaticMarkup(element);
  for (const value of ['Header native-card', 'Footer native-card', 'Native child', 'Native subtitle', 'custom-content', 'data-card="custom"', 'aria-label="Native card"']) assert.ok(html.includes(value), value);
  assert.ok(!html.includes('Ignored'));
});

test('Card distinguishes omitted slots from explicit null and preserves node value modes', () => {
  for (const value of [null, false, 0, '', ['First', 'Second']]) {
    const card = render({ header: value, footer: value, children: value, headerText: 'Fallback', footerText: 'Fallback', contentText: 'Fallback' }).props.children;
    assert.equal(card.props.header, value);
    assert.equal(card.props.footer, value);
    assert.equal(card.props.children, value);
  }
  const html = renderToStaticMarkup(render({ headerText: 'Heading', footerText: 'Footer', contentText: 'Body' }));
  for (const value of ['Heading', 'Footer', 'Body']) assert.ok(html.includes(value));
  const empty = renderToStaticMarkup(render({ headerText: '', footerText: '', contentText: '' }));
  assert.ok(!/p-card-(header|footer|content)/.test(empty));
});
