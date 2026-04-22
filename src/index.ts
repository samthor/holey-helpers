/**
 * Converts an array to a new array with holes.
 * By default, {@link undefined} entries are replaced with holes.
 *
 * This is useful for testing.
 */
export function convertToEmpty<T>(
  arr: T[],
  isEmpty: (x: T) => boolean = (x) => x === undefined,
): T[] {
  const out = new Array(arr.length);

  arr.forEach((x, i) => {
    if (!isEmpty(x)) {
      out[i] = x;
    }
  });

  return out;
}

/**
 * Does the given array have data at the specified index?
 *
 * This will also be false for indicies out of range.
 */
export function hasIndex(arr: any[], index: number): boolean {
  if (arr[index] !== undefined) {
    return true;
  }
  return index in arr;
}

/**
 * Insert empty data, i.e., holes, within this array.
 *
 * This has the same semantics as {@link Array.splice}; if {@link at} is out of range, it is clamped to `[0,length]`.
 */
export function insertEmpty<T>(arr: T[], at: number, count: number): void {
  count = Math.floor(count);
  if (count <= 0 || !count || count === Infinity) {
    return;
  }
  at = Math.max(0, Math.floor(at)) || 0;

  if (at >= arr.length) {
    arr.length += count;
    return;
  }

  // 'delete' is really slow; push.call(...) is really slow

  const tail = arr.slice(at);
  arr.length = at; // clamp array to insert holes
  arr.length = at + count + tail.length; // pre-size array for speed

  let target = at + count;
  for (let i = 0; i < tail.length; ++i) {
    arr[target] = tail[i];
    ++target;
  }
}
