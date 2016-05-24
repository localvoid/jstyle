# jstyle

jstyle is a javascript to css compiler.

## Usage Example

`main.js`

```js
import {Module, select} from "jstyle";

const Base = new Module()
  .rules((c, p) => [
    select("body", [
      p.margin("0"),
    ]),
  ]);

export const entry = new Module()
  .require(Base),
  .rules((c, p) => [
    select([`.${c.className("Main")}`], [
      p.top("20px")
    ]),
  ]);
```

Build script:

```js
import {Compiler, Context} from "jstyle";

const compiler = new Compiler(new Context({
  minifyClassNames: true,
}));

compiler.compile("main.js")
  .then((c) => c.writeClassNames("class_names.json"))
  .then((c) => {
    console.log("Finished");
  });
```