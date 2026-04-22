import { performance } from 'node:perf_hooks';
import { insertEmpty } from './index.ts';

const RUNS = 100;

const base = new Array();
for (let i = 0; i < 100_000; ++i) {
  base.push(Math.random());
}

const start = performance.now();

for (let run = 0; run < RUNS; ++run) {
  const copy = base.slice();

  insertEmpty(copy, 1, 1);
}

const end = performance.now();
console.log('duration', (end - start).toFixed(2) + 'ms');
