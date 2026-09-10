import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';

const exampleSource = fs.readFileSync('src/stories/components/PickList.examples.tsx', 'utf8');

test('PickList playground preserves native templates and supplied callbacks', () => {
  assert.match(exampleSource, /itemTemplate=\{args\.itemTemplate \?\? pickListItemTemplate\}/);
  assert.match(exampleSource, /args\.onChange\?\.\(event\)/);
  assert.match(exampleSource, /args\.onMoveToTarget\?\.\(event\)/);
  assert.match(exampleSource, /<PickList \{\.\.\.args\}/);
});
