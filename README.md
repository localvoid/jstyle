# jstyle

jstyle is a javascript to css compiler.

## Usage Example

Install jstyle CLI:

```sh
$ npm install -g jstyle-cli
```

Instal jstyle into your project:

```sh
$ npm install --save-dev jstyle
```

Create file `jstyle.conf.js`:

```js
const jstyle = require("jstyle");

const Base = new jstyle.Module()
  .rules((c, p) => [
    select(c.placeholders("buttons"), [
      p.margin(c.get("button-margin", 0)),
    ]),
  ]);

export const Main = new jstyle.Module()
  .require(Base),
  .init((c) => {
    c.placeholders("buttons").add(c.className("MyButton"));
  })
  .rules((c, p) => [
    jstyle.select(c.className("Main"), [
      p.top("20px")
    ]),
  ]);

module.exports = {
  entries: {
    "main.css": Main,
  },
  env: () => {
    const env = new Map();
    env.set("button-margin", 10);
    return env;
  },
  minifyClassNames: true,
};
```

Launch `jstyle`:

```sh
$ jstyle -c jstyle.conf.js -o build
```

## Examples

- [Basic](https://github.com/localvoid/jstyle/tree/master/examples/basic)
- [Placeholders](https://github.com/localvoid/jstyle/tree/master/examples/placeholders)
- [Variables](https://github.com/localvoid/jstyle/tree/master/examples/variables)
- [TypeScript](https://github.com/localvoid/jstyle/tree/master/examples/typescript)
- [Minification](https://github.com/localvoid/jstyle/tree/master/examples/minification)
