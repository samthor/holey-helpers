holey is a zero-dependency package that exports helper methods to do with holes in arrays.

## Usage

Install via `holey`.

```ts
import { insertEmpty } from 'holey';

const x = [1, 2, 3];
insertEmpty(x, 1, 2);
// x is now [1, <empty>, <empty>, 2, 3]
```
