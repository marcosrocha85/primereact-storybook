import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const filename = new URL('../src/stories/components/Carousel.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
const requireModule = createRequire(filename);
// Keep native Carousel/SSR real; supply the viewport for direct adapter inspection.
const requireForExample = name => name === 'react'
  ? { ...requireModule(name), useSyncExternalStore: () => 1024, useEffect: () => {} }
  : requireModule(name);
vm.runInNewContext(compiled, { exports: module.exports, require: requireForExample, module });
const { Playground, defaultArgs } = module.exports;

test('Carousel forwards native values, templates, attributes and pt while synchronizing the original page event', () => {
  for (const value of [undefined, [], [1, 2], [{ label: 'Custom item' }]]) {
    const calls = [];
    const args = {
      ...defaultArgs, value, page: 0,
      itemTemplate: item => React.createElement('strong', null, typeof item === 'number' ? item : item.label),
      header: React.createElement('h2', null, 'Custom header'), footer: 'Custom footer',
      pt: { root: { 'data-custom': 'root' }, item: { className: 'custom-item' } },
      ptOptions: { mergeSections: true, mergeProps: true },
      onPageChange: event => calls.push(event), onClick: event => calls.push(event),
      responsiveOptions: [{ breakpoint: '560px', numVisible: 1, numScroll: 1 }],
      prevIcon: 'pi pi-search', nextIcon: () => React.createElement('span', null, 'Next'),
      id: 'custom-carousel', 'aria-label': 'Custom carousel', style: { color: 'red' },
    };
    const updates = [];
    const element = Playground({ args, updateArgs: changes => updates.push(changes) });
    const carousel = element.props.children;
    for (const key of Object.keys(args).filter(key => key !== 'onPageChange')) assert.equal(carousel.props[key], args[key], key);
    const event = { page: 1 };
    carousel.props.onPageChange(event);
    assert.equal(updates.length, 1);
    assert.equal(updates[0].page, 1);
    assert.equal(calls[0], event);
    const click = { type: 'click' };
    carousel.props.onClick(click);
    assert.equal(calls[1], click);
    const html = renderToStaticMarkup(element);
    assert.ok(html.includes('Custom header'));
    assert.ok(html.includes('data-custom="root"'));
    if (value?.length) assert.ok(html.includes('custom-item'));
    if (value?.[0]?.label) assert.ok(html.includes('Custom item'));
  }
});

test('Carousel accepts absent callbacks and explicit empty templates without substituting sample content', () => {
  const element = Playground({ args: { value: ['Custom'], itemTemplate: undefined }, updateArgs: () => {} });
  element.props.children.props.onPageChange({ page: 0 });
  assert.equal(element.props.children.props.itemTemplate, undefined);
  assert.throws(() => renderToStaticMarkup(element), /template is not a function/, 'Native Carousel requires a template for nonempty data');
});


test('Carousel uses native circular/autoplay state and explains unsupported combinations', () => {
  for (const options of [{ circular: true }, { autoplayInterval: 1000 }]) {
    const element = Playground({ args: { ...defaultArgs, ...options }, updateArgs: () => assert.fail('Native paging must not update controlled page') });
    assert.equal(element.props.children.props.onPageChange, undefined);
    for (const incompatible of [{ page: 1 }, { onPageChange: () => {} }]) {
      const blocked = Playground({ args: { ...defaultArgs, ...options, ...incompatible }, updateArgs: () => {} });
      assert.equal(blocked.props.role, 'alert');
      assert.match(blocked.props.children, /native paging/);
    }
  }
});

test('Carousel rejects invalid count, page and responsive configurations before native rendering', () => {
  for (const options of [{ numVisible: 0 }, { numScroll: 2 }, { page: 3 }, { page: 1.5 }, { numVisible: 3, page: 1 }, { autoplayInterval: -1 }, { responsiveOptions: {} }, { responsiveOptions: [null] }, { responsiveOptions: [{ breakpoint: '560px', numVisible: 1, numScroll: 2 }] }]) {
    const element = Playground({ args: { ...defaultArgs, ...options }, updateArgs: () => {} });
    assert.equal(element.props.role, 'alert');
  }
});
