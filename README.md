# jstyle

TypeScript-first CSS builder.

## Features

- **Scoped Identifiers** — Class names, CSS vars and animation names are isolated
- **Type-Safe Properties** — All CSS properties are typed
- **Minified Identifiers** — Generates short, unique identifiers (class names, vars, …)
- **Deterministic Builds** — Minified identifiers are stored in a map file
- **Multi-Language Support** — Outputs modules with constant identifiers for TypeScript and Rust
- **Class Maps** — Efficient (interned strings) runtime state to class name mapping for conditional styles
- **CSS Minification** — Built-in minification via [Lightning CSS](https://lightningcss.dev/)
- **Manifest File** — Supports [assetcraft](https://github.com/localvoid/assetcraft) manifest files (resolve urls and emit)

## Installation

```bash
npm install jstyle
# or
bun add jstyle
```

## Quick Start

```ts
import { ns, style, emitCss } from 'jstyle';
import * as p from 'jstyle/props';

const APP = ns('app');

const BUTTON = APP.class('button');

const rules = [
  style(BUTTON, [p.display('inline-flex'), p.padding('8px 16px'), p.backgroundColor('blue')]),
  style(BUTTON.hover, [p.backgroundColor('darkblue')]),
];

await emitCss({
  input: [{ name: 'app', build: async () => ({ css: rules }) }],
  outDir: './dist',
  renderURL: (name, hash) => `/assets/${name}.${hash}.css`,
});
```

## Imports

```ts
import { ns, style, media, $, env, important } from 'jstyle'; // Core types and factories
import * as p from 'jstyle/props'; // CSS property constructors
import { emitCss } from 'jstyle/emit';
```

## Core Concepts

### Namespaces

Each module gets its own namespace to avoid identifier collisions:

```ts
import { ns } from 'jstyle';

const SCAFFOLD = ns('app.scaffold');
const CONTAINER = SCAFFOLD.class('container');
```

### Properties

Typed constructors from `jstyle/props`:

```ts
import * as p from 'jstyle/props';

p.display('grid');
p.margin('0 auto');
p.color('#333');

// Predefined constants
p.FLEX; // display: flex
p.BORDER_BOX; // box-sizing: border-box
```

### Value Helpers

```ts
// CSS variables
const SPACING = NS.dashedIdent('spacing');
style('section', [p.padding($(SPACING))]); // padding: var(--spacing);

// Environment variables
style('input', [p.padding(env('safe-area-inset-top'))]);

// !important
style('modal', [important(p.zIndex('9999'))]); // z-index: 9999 !important;
```

### Selectors

Pseudo-classes and pseudo-elements via getter properties:

```ts
const btn = NS.class('button');
btn.hover; // :hover
btn.before; // ::before
btn.nthChild('2n+1'); // :nth-child(2n+1)
btn.has(p.color('red')); // :has(.red)
```

Combinators for complex selectors:

```ts
const CARD = NS.class('card');
const CARD_TITLE = CARD.join('title');

CARD.descendant(CARD_TITLE); // .card .card_title
CARD.child(CARD_TITLE); // .card > .card_title
```

### At-Rules

Factory functions for all CSS at-rules:

```ts
import { media, container, keyframes, layer, supports, fontFace } from 'jstyle';

media('(min-width: 768px)', [style(container, [p.margin('0')])]);
keyframes('fade', [pct(0, [p.opacity('0')]), pct(100, [p.opacity('1')])]);
layer('utilities', [style(highlight, [p.backgroundColor('yellow')])]);
fontFace([p.fontFamily('MyFont'), p.src('url(font.woff2)')]);
```

### Size and Color Utilities

```ts
import { Size, rgba } from 'jstyle';

Size.px(16); // 16px
Size.rem(2); // 2rem

rgba(255, 0, 0, 1); // rgba(255, 0, 0, 1)
```

### Class Maps

Efficient runtime state to class name mapping:

```ts
const buttonMap = NS.classMap({
  base: BUTTON,
  states: {
    hovered: BUTTON_HOVER,
    active: BUTTON_ACTIVE,
    size: [null, BUTTON_SM, BUTTON_MD, BUTTON_LG],
  },
  exclude: (state) => state.get('hovered') === true && state.get('active') === true,
});
```

## Emitting

```ts
import { emitCss } from 'jstyle/emit';

await emitCss({
  input: [
    {
      name: 'app',
      build: async (ctx) => ({
        css: [
          /* your rules */
        ],
      }),
    },
  ],
  outDir: './dist',
  renderURL: (name, sha) => `/assets/${name}.${sha}.css`,
  js: './dist/js', // optional: emit JS modules
  rust: './dist/app.rs', // optional: emit Rust module
  minify: true, // optional: minify CSS
  map: './dist/.cssmap.json', // optional: persist ID mappings
});
```

## Output Formats

- **CSS**
- **JS** — identifier bindings + TypeScript declarations
- **Rust** — identifier bindings

## License

MIT OR Apache-2.0
