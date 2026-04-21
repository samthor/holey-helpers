/**
 * Converts an array to a new array with holes
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
export function insertEmpty<T>(arr: T[], at: number, length: number): void {
  if (length <= 0) {
    return;
  }
  at = Math.max(0, Math.floor(at));

  if (at >= arr.length) {
    // simple case: just make array bigger
    arr.length += length;
    return;
  }

  const ratio = length / (arr.length - at);
  if (ratio >= 0.8) {
    // copy tail, clamp array and replace it
    const tail = arr.slice(at);
    arr.length = at;
    arr.length += length;
    arr.splice(arr.length, 0, ...tail);
    return;
  }

  // splice dummy values and delete them
  arr.splice(at, 0, ...new Array(length));
  for (let i = at; i < at + length; ++i) {
    delete arr[i];
  }
}
