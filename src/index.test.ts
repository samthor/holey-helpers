import test from 'node:test';
import * as assert from 'node:assert';
import { convertToEmpty, hasIndex, insertEmpty } from './index.ts';

test('hasIndex', () => {
  const arr = convertToEmpty([1, undefined, 2]);
  assert.ok(hasIndex(arr, 0));
  assert.ok(!hasIndex(arr, 1));
  assert.ok(!hasIndex(arr, 100));
});

test('insertEmpty', () => {
  const q = [1, 2, 3];

  insertEmpty(q, 1, 2);
  assert.deepStrictEqual(q, convertToEmpty([1, undefined, undefined, 2, 3]));
});
