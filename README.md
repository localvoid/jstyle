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
const select = jstyle.select;
const chunk = jstyle.chunk;

const Base = new jstyle.Module()
  .rules((c, p) => [
    select(c.placeholders("buttons"), [
      p.margin(c.get("button-margin", 0)),
    ]),
  ]);

const Main = new jstyle.Module()
  .require(Base),
  .init((c) => {
    c.placeholders("buttons").add(c.className("MyButton"));
  })
  .rules((c, p) => [
    select(c.className("Main"), [
      p.top("20px")
    ]),
  ]);

module.exports = {
  chunks: [
    chunk("main.css", Main),
  ],
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
- [Module splitting](https://github.com/localvoid/jstyle/tree/master/examples/multiple_chunks)

## API

### Context

#### Get Variable

`context.get<T>(name: string | Symbol, defaultValue?: T): <T>`

Returns variable initialized in config environment, or default value if environment doesn't contain it.

#### Get Tag Name

`context.tagName(name: string | Symbol): string`

If tag name minification is enabled, it will return minified tag name, otherwise it will return the same value.

#### Get Class Name

`context.className(name: string | Symbol): string`

If class name minification is enabled, it will return minified class name, otherwise it will return the same value.

#### Get Placeholder

`context.placeholder(name: string | Symbol): Placeholder`

Returns a placeholder associated with the name parameter.

### Module

#### Add Depencencies

`require(modules: Module | Module[]): Module`

Add module dependencies.

#### Init

`init(handler: (context: Context, prop: PropertyFactory) => void)`

Assign an init handler.

#### Rules

`rules(handler: (context: Context, prop: PropertyFactory) => Rule[])`

Assign a function that should return rules for the module.

### Config

```ts
interface ConfigModule {
  chunks: {fileName: string, modules: Module | Module[]}[];
  baseChunkFileName?: string = "base.css";
  env?: Map<string | Symbol, any> | ((defs: {[key: string]: string}) => Map<string | Symbol, any>) = {};
  minifyClassNames?: boolean | string = false;
  minifyTagNames?: boolean | string = false;
  tagNamePrefix?: string = "x";
}

type Config = ConfigModule | ((defs: {[key: string]: string}) => ConfigModule);
```