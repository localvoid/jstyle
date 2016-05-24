# jstyle

jstyle is a javascript to css compiler.

## Usage Example

```js
import {Module, Context, select, bundle, emitCss} from "jstyle";

const Base = new Module()
  .rules((c, p) => [
    select("body", [
      p.margin("0"),
    ]),
  ]);

const Entry = new Module()
  .require(Base),
  .rules((c, p) => [
    select([".Main"], [
      p.top("20px")
    ])
  ]);

const context = new Context();
const bundle = bundle(Entry, context);

console.log(bundle.map((r) => emitCss(r)).join(""));
```
