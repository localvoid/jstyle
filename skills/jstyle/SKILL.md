---
name: jstyle
description: Use when writing CSS using `jstyle` library
---

# jstyle

Programmatic TypeScript-first CSS builder.

- Namespace scoped identifiers: class name, vars, animation names, …
- Emits code with identifier constants for different programming languages.

`jstyle` uses subpath exports. Import from the correct entry point:

```ts
import { ns, style, media } from 'jstyle'; // Core types and factories
import * as p from 'jstyle/props'; // CSS property constructors
import { emit } from 'jstyle/emit'; // CSS emit orchestrator
```

## Core Concepts

### Namespaces

Each module gets its own `CssNamespace` via `ns('module.name')` to isolate class names and avoid collisions across files.

```ts
import { ns } from 'jstyle';

const SCAFFOLD = ns('app.scaffold');
```

#### Class Names

```ts
const CONTAINER = SCAFFOLD.class('container');
const TITLE = SCAFFOLD.class('title');
const MAIN = SCAFFOLD.class('main');
```

#### Ident and Dashed Ident

CSS custom identifier:

```ts
const SLIDE_IN = NS.ident('slide-in'); // `CssIdent`
style(box, [p.animation(t`3s infinite alternate ${SLIDE_IN}`)]);
```

CSS dashed identifier:

```ts
const SPACING = NS.dashedIdent('spacing'); // `CssDashedIdent`
style('section', [
  SPACING.prop('16px'); // --spacing: 16px;
]);
style('details', [
  p.padding($(SPACING)); // padding: var(--spacing);
]);
```

### Properties

All CSS properties are typed constructors from `jstyle/props`. Each returns a `CssProperty` object.

```ts
import * as p from 'jstyle/props';

// Function constructors
p.display('grid');
p.margin('0 auto');
p.color('#333');
p.flex('1 1 auto');

// Predefined constants (no arguments needed)
p.FLEX; // display: flex
p.BORDER_BOX; // box-sizing: border-box
```

Arrays flatten into multiple declarations:

```ts
const RESET = [p.RESET_MARGIN, p.RESET_PADDING];
// emits both margin: 0 and padding: 0
```

`null`, `undefined`, `false` values are ignored:

```ts
function reset(margin?: boolean, padding?: boolean) {
  return [margin && p.RESET_MARGIN, pading && p.RESET_PADDING];
}
```

#### Property Value Helpers

**`$(name, fallback?)`** — Creates a `var()` expression referencing a CSS variable:

```ts
import { $ } from 'jstyle';

const SPACING = NS.dashedIdent('spacing');
style('section', [
  p.padding($(SPACING)), // padding: var(--spacing);
  p.margin($(SPACING, '16px')), // margin: var(--spacing, 16px);
]);
```

**`env(name, fallback?)`** — Creates an `env()` expression for user-agent environment values:

```ts
import { env } from 'jstyle';

style('input', [
  p.padding(env('safe-area-inset-top')),
  p.padding(env('safe-area-inset-bottom', '0')),
]);
```

**`important(prop)`** — Marks a CSS property as `!important`:

```ts
import { important } from 'jstyle';

style('modal', [
  important(p.zIndex('9999')), // z-index: 9999 !important;
]);
```

#### Property Value Template

Use the `t` template literal to compose values:

```ts
import { t } from 'jstyle/props';

const myProp = t`calc(${Size.rem(1)} + ${Size.px(16)})`;
```

Supported interpolation types:

- `string` — Raw CSS string literal
- `Size` — Typed units: `Size.px()`, `Size.rem()`, `Size.em()`, `Size.pct()`
- `CssIdent` — Custom identifier (animation/layer names) — emitted as-is
- `CssDashedIdent` — CSS variable — automatically prefixed with `--`
- `CssSelector` — Selector — emitted as selector text
- `CssPropertyTemplate` — Nested template (supports chaining)

### Style Rules

Compose selectors and properties via `style()`.

```ts
import { style, media } from 'jstyle';

const rules = [
  style(CONTAINER, [p.FLEX, p.margin('0 auto'), BORDER_BOX]),
  style(TITLE, [p.color('#333'), p.fontSize('1.5rem')]),
];
```

## Writing CSS

### Selectors

`CssSelector` has getter properties for constructing pseudo-classes and pseudo-elements selectors:

```ts
const s = NS.class('button');

// Pseudo-classes
s.hover; // :hover
s.active; // :active
s.focus; // :focus
s.focusVisible; // :focus-visible
s.disabled; // :disabled
s.checked; // :checked
s.readOnly; // :read-only

// Pseudo-elements
s.before; // ::before
s.after; // ::after
s.selection; // ::selection
s.placeholder; // ::placeholder
s.marker; // ::marker
```

Functional pseudo-classes take arguments:

```ts
s.nthChild('2n+1'); // :nth-child(2n+1)
s.has(RED); // :has(.red)
s.is(CARD, BUTTON); // :is(.card, .button)
s.not(CARD); // :not(.card)
s.where(CARD); // :where(.card)
s.lang('en'); // :lang(en)
s.dir('ltr'); // :dir(ltr)
```

Join with `_` separator:

```ts
const CARD = NS.class('card');
const CARD_TITLE = CARD.join('title'); // .card_title
const CARD_BODY = CARD.join('body'); // .card_body
```

Use combinators to build complex selectors:

```ts
const CARD = NS.class('card');
const CARD_TITLE = CARD.join('title');

CARD.descendant(CARD_TITLE); // .card .card_title
CARD.child(CARD_TITLE); // .card > .card_title
CARD.nextSibling(CARD_TITLE); // .card + .card_title
CARD.sibling(CARD_TITLE); // .card ~ .card_title
```

### At-Rules

Factory functions for CSS at-rules:

```ts
import {
  media,
  container,
  keyframes,
  layer,
  layerDecl,
  property,
  scope,
  supports,
  viewTransition,
  fontFace,
  startingStyle,
  counterStyle,
  fontFeatureValues,
  fontPaletteValues,
  page,
} from 'jstyle';
```

#### Conditional Rules

```ts
// @media
media('(min-width: 768px)', [style(container, [p.margin('0')])]);

// @container
container('sidebar', [style(sidebar, [p.width('100%')])]);

// @supports
supports('(display: grid)', [style(grid, [p.display('grid')])]);

// @scope
scope('.card', [style(title, [p.fontSize('1.2rem')])]);
```

#### Animation Rules

```ts
// @keyframes
keyframes('fade', [
  pct(0, [p.opacity('0')]),
  pct(30, [p.opacity('0.5')]),
  pct(100, [p.opacity('1')]),
]);

// @starting-style (entry animations)
startingStyle([style(box, [p.opacity('1')])]);
```

#### Layer Rules

```ts
// @layer with block
layer('utilities', [style(highlight, [p.backgroundColor('yellow')])]);

// @layer declaration (prelude only, no block)
layer('base, components, utilities');
```

#### Custom Properties

```ts
// @property (registered custom properties)
property('myAngle', [p.syntax('"<angle>"'), p.initial('0deg'), p.inherits('false')]);
```

#### Font Rules

```ts
// @font-face
fontFace([p.fontFamily('MyFont'), p.src('url(myfont.woff2)')]);

// @font-feature-values
fontFeatureValues('MyFont', [p.fontWeight(400)]);

// @font-palette-values
fontPaletteValues('MyPalette', [p.basePalette(0)]);
```

#### Other Rules

```ts
// @counter-style
counterStyle(NS.ident('check'), [p.symbols('"\\2713"')]);

// @page (print styles)
page(':first', [p.margin('2cm')]);

// @view-transition
viewTransition([style('::view-transition-old(root)', [p.opacity('0')])]);
```

### Size and Color Utilities

Typed unit constructors with arithmetic:

```ts
import { Size } from 'jstyle';
import { ColorRGBA, rgba } from 'jstyle';

Size.px(16); // 16px
Size.em(1.5); // 1.5em
Size.rem(2); // 2rem
Size.pct(100); // 100%

Size.rem(2).add(Size.px(8)); // 2rem + 8px

rgba(255, 0, 0, 1); // rgba(255, 0, 0, 1)
ColorRGBA.WHITE; // static constant
```

### Class Maps for Conditional Styles

`CssClassMap` is used to generate efficient functions that maps state → class name at runtime.

Use `namespace.classMap()` to create a class map declaration.

#### Options

- **`base`** — Required. Default class applied when no states are active.
- **`states`** — Map of state names to classes. Use `boolean` for toggles, or an array `(null | CssClassSelector)[]` for multi-value states (index-based lookup). `null` means "no class for this index".
- **`name`** — Optional. Override the generated function name (defaults to `base.id`).
- **`exclude`** — (optional) Predicate `(state: CssClassMapState) => boolean` to exclude invalid state combinations from the output. Call `state.get('stateName')` to read current state value.
- **`inline`** — (optional) Code generation strategy: `true` for nested ternaries, `false` for lookup table. Defaults to `true` when <4 boolean states, `false` otherwise (always `false` if any state is an array).

#### Class Map Example

```ts
const buttonMap = NS.classMap({
  base: BUTTON,
  states: {
    hovered: BUTTON_HOVER, // boolean
    active: BUTTON_ACTIVE, // boolean
    size: [null, BUTTON_SM, BUTTON_MD, BUTTON_LG], // multi-value (index-based)
    // Exclude combinations where both `hovered` and `active` are true (impossible state):
    exclude: (state) => state.get('hovered') && state.get('active'),
  },
});
```

## References

- `references/setup.md` — Installation, emit config, project structure, dependencies
