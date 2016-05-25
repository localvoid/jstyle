# jstyle

jstyle is a javascript to css compiler.

## Usage Example

Install jstyle.

```sh
$ npm install -g jstyle
```

Create file `jstyle.conf.js`:

```js
const jstyle = require("jstyle");

const Base = new jstyle.Module()
  .rules((c, p) => [
    select("body", [
      p.margin("0"),
    ]),
  ]);

export const Main = new jstyle.Module()
  .require(Base),
  .rules((c, p) => [
    jstyle.select([`.${c.className("Main")}`], [
      p.top("20px")
    ]),
  ]);

module.exports = {
  entries: {
    "main.css": Main,
  },
  minifyTagNames: true,
  minifyClassNames: true,
};
```

Launch `jstyle`:

```sh
$ jstyle -c jstyle.conf.js
```
