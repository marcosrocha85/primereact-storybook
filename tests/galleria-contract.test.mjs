import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import React from 'react';

const filename = new URL('../src/stories/components/Galleria.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const nativeRequire = createRequire(filename);
vm.runInNewContext(compiled, { exports: module.exports, module, require: nativeRequire });
const { Playground, defaultArgs } = module.exports;

test('Galleria forwards native values, templates, attributes and pt while synchronizing activeIndex', () => {
  const events = [];
  const updates = [];
  const item = { itemImageSrc: 'custom.jpg', thumbnailImageSrc: 'custom-thumb.jpg', alt: 'Custom' };
  const itemTemplate = () => React.createElement('strong', null, 'Custom item');
  const thumbnailTemplate = () => React.createElement('strong', null, 'Custom thumbnail');
  const args = {
    ...defaultArgs,
    value: [item],
    activeIndex: 0,
    item: itemTemplate,
    thumbnail: thumbnailTemplate,
    indicator: () => React.createElement('span', null, 'indicator'),
    caption: () => React.createElement('span', null, 'caption'),
    header: React.createElement('h2', null, 'Header'),
    footer: 'Footer',
    pt: { root: { 'data-custom': 'root' }, item: { className: 'custom-item' } },
    ptOptions: { mergeSections: true, mergeProps: true },
    onItemChange: event => events.push(event),
    onShow: () => events.push('show'),
    onHide: () => events.push('hide'),
    onClick: event => events.push(event),
    id: 'custom-galleria',
    'aria-label': 'Custom gallery',
    style: { width: '24rem' },
  };
  const element = Playground({ args, updateArgs: changes => updates.push(changes) });
  const galleria = element.props;
  for (const key of Object.keys(args)) {
    if (!['activeIndex', 'item', 'thumbnail', 'onItemChange'].includes(key)) assert.equal(galleria[key], args[key], key);
  }
  assert.equal(galleria.item, itemTemplate);
  assert.equal(galleria.thumbnail, thumbnailTemplate);
  const event = { index: 1 };
  galleria.onItemChange(event);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].activeIndex, 1);
  assert.equal(events[0], event);
  const click = { type: 'click' };
  galleria.onClick(click);
  assert.equal(events[1], click);
});

test('Galleria preserves native uncontrolled activeIndex and explicit null templates', () => {
  const onItemChange = event => event;
  const element = Playground({ args: { ...defaultArgs, activeIndex: undefined, item: null, thumbnail: null, onItemChange }, updateArgs: () => assert.fail('Uncontrolled gallery must not synchronize activeIndex') });
  assert.equal(element.props.activeIndex, undefined);
  assert.equal(element.props.onItemChange, onItemChange);
  assert.equal(element.props.item, null);
  assert.equal(element.props.thumbnail, null);
});
