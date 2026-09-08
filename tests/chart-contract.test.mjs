import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const filename = new URL('../src/stories/components/Chart.examples.tsx', import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, require: createRequire(filename), module });
const { Playground } = module.exports;

test('Chart forwards native configuration, callbacks, plugins and PT without narrowing data', () => {
  for (const data of [undefined, { datasets: [] }, { datasets: [{ data: [1, null, 3] }] }, { datasets: [{ data: [{ x: 1, y: 2, r: 5 }] }] }]) {
    const calls = [];
    const callback = (...args) => calls.push(args);
    const args = {
      type: 'bubble', data, options: { onClick: callback, onHover: callback, parsing: false },
      plugins: [{ id: 'custom', afterDraw: callback }],
      pt: { root: { onClick: callback }, canvas: { 'aria-label': 'Custom canvas' }, hooks: { useMountEffect: callback } },
      ptOptions: { mergeProps: true }, onClick: callback,
      ariaLabel: 'Custom', width: '200', height: '100', style: { color: 'red' },
      className: 'custom', id: 'chart', role: 'figure', tabIndex: 0, unstyled: true,
      children: 'Native children',
    };
    const chart = Playground({ args, updateArgs: () => assert.fail('Chart has no controlled value event') }).props.children;
    for (const key of Object.keys(args)) assert.equal(chart.props[key], args[key], key);
    const event = { type: 'click' };
    chart.props.onClick(event);
    chart.props.options.onClick(event, [], 'instance');
    chart.props.plugins[0].afterDraw('instance');
    chart.props.pt.root.onClick(event);
    assert.deepEqual(calls, [[event], [event, [], 'instance'], ['instance'], [event]]);
  }
});
