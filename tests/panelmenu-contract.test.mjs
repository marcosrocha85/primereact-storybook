import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/stories/components/PanelMenu.examples.tsx', import.meta.url), 'utf8');
const story = fs.readFileSync(new URL('../src/stories/components/PanelMenu.stories.tsx', import.meta.url), 'utf8');
const docs = fs.readFileSync(new URL('../src/stories/components/PanelMenu.docs.mdx', import.meta.url), 'utf8');
const generator = fs.readFileSync(new URL('../scripts/generate-component-stories.mjs', import.meta.url), 'utf8');
const adapterSource = fs.readFileSync(new URL('../src/stories/menuExamples.ts', import.meta.url), 'utf8');

test('PanelMenu playground preserves native props and supplied item commands', () => {
  assert.match(source, /<PanelMenu \{\.\.\.args\} model=\{menuWithActions\(args\.model \?\? \[\], setAction\)\}/);
  assert.match(adapterSource, /item\.command\?\.\(event\)/, 'the adapter must invoke supplied MenuItem commands');
  assert.match(story, /model: \{ control: 'object'/);
  assert.match(story, /multiple: \{ control: 'boolean'/);
  assert.match(docs, /<Source\b/);
  assert.doesNotMatch(docs, /<Controls\b|<Canvas\b/);
  assert.match(generator, /name: 'PanelMenu',[\s\S]*?docsVariations:/);
});
