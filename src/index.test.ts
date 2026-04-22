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

test('insertEmpty at end', () => {
  const q = [1, 2, 3];
  insertEmpty(q, 10, 2);
  assert.strictEqual(q.length, 5);
  assert.ok(!hasIndex(q, 3));
  assert.ok(!hasIndex(q, 4));
});

test('insertEmpty with large ratio', () => {
  const q = [1, 2, 3, 4, 5];
  // at = 4, length = 1. ratio = 1 / (5-4) = 1.0 >= 0.8.
  insertEmpty(q, 4, 1);
  assert.deepStrictEqual(q, convertToEmpty([1, 2, 3, 4, undefined, 5]));
});

