import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/stories/components/Menu.examples.tsx', import.meta.url), 'utf8');
const story = fs.readFileSync(new URL('../src/stories/components/Menu.stories.tsx', import.meta.url), 'utf8');
const generator = fs.readFileSync(new URL('../scripts/generate-component-stories.mjs', import.meta.url), 'utf8');
const adapterSource = fs.readFileSync(new URL('../src/stories/menuExamples.ts', import.meta.url), 'utf8');

test('Menu playground preserves native props and supplied item commands', () => {
  assert.match(source, /<Menu \{\.\.\.args\} model=\{menuWithActions\(args\.model \?\? \[\], setAction\)\}/);
  assert.match(source, /ref=\{ref\}/);
  assert.match(adapterSource, /item\.command\?\.\(event\)/, 'the adapter must invoke supplied MenuItem commands');
  assert.match(story, /popupAlignment: \{ control: 'inline-radio', options: \['left', 'right'\] \}/);
  assert.match(story, /model: \{ control: 'object'/);
  assert.match(generator, /name: 'Menu',[\s\S]*?docsVariations:/);
});
