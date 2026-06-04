# jstyle Setup

## Emitting

### emitCss Orchestrator

The `emitCss()` function from `jstyle/emit` processes all entries, minifies via lightningcss, compresses assets, and generates output files.

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
});
```

### Multi-Entry Builds

Pass multiple entries to build separate CSS bundles:

```ts
await emitCss({
  input: [
    { name: 'app', build: async () => ({ css: appStyles }) },
    { name: 'vendor', build: async () => ({ css: vendorStyles }) },
  ],
  outDir: './dist',
  renderURL: (name, sha) => `/assets/${name}.${sha}.css`,
});
```

## CssMap Persistence

The `CssMap` (class name mapping) can be serialized to disk to maintain stable obfuscated IDs across builds. Pass the `map` option to `emitCss()`:

```ts
await emitCss({
  input: [
    /* ... */
  ],
  outDir: './dist',
  renderURL: (name, sha) => `/assets/${name}.${sha}.css`,
  map: './dist/.cssmap.json', // persists ID mappings
});
```

## Asset Manifest

`emitCss()` generates a manifest file with content hashes, pre-compressed variants (gzip, brotli, zstd), and URLs. Configure via:

- `manifest` — output path (defaults to `outDir/manifest.json`)
- `renderURL` — function that generates the public URL from name + sha256
- `headers` — optional HTTP headers

## CSS Minification

Pass `minify: true` to `emitCss()` to enable lightningcss-based minification.
