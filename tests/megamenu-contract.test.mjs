import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/stories/components/MegaMenu.examples.tsx', import.meta.url), 'utf8');
const adapterSource = fs.readFileSync(new URL('../src/stories/menuExamples.ts', import.meta.url), 'utf8');

test('MegaMenu playground preserves native props and supplied leaf commands', () => {
  assert.match(source, /<MegaMenu \{\.\.\.args\} model=\{menuWithActions\(args\.model \?\? \[\], setAction\)\}/);
  assert.match(adapterSource, /item\.command\?\.\(event\)/, 'the recursive adapter must invoke supplied MenuItem commands');
  assert.match(adapterSource, /items: isGrouped\(item\.items\)/, 'nested MegaMenu column groups must be preserved by the shared adapter');
  assert.match(source, /<MegaMenu \{\.\.\.args\}/, 'native props must remain available to the component');
});
