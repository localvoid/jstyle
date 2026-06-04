# jstyle Setup

## Emitting

### emit Orchestrator

The `emit()` function from `jstyle/emit` processes all entries, minifies via lightningcss, compresses assets, and generates output files.

```ts
import { emit } from 'jstyle/emit';
import { JSEmitter } from 'jstyle/emit/js';
import { RustEmitter } from 'jstyle/emit/rust';

await emit({
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
  emit: [
    new JSEmitter({ outDir: './packages/css/src', clean: true }), // optional: emit JS modules
    new RustEmitter({ outDir: './crates/css', clean: true }), // optional: emit Rust module
  ],
  minify: true, // optional: minify CSS
});
```

### Multi-Entry Builds

Pass multiple entries to build separate CSS bundles:

```ts
await emit({
  input: [
    { name: 'app', build: async () => ({ css: appStyles }) },
    { name: 'vendor', build: async () => ({ css: vendorStyles }) },
  ],
  outDir: './dist',
  renderURL: (name, sha) => `/assets/${name}.${sha}.css`,
});
```

## CssMap Persistence

The `CssMap` (class name mapping) can be serialized to disk to maintain stable obfuscated IDs across builds. Pass the `map` option to `emit()`:

```ts
await emit({
  input: [
    /* ... */
  ],
  outDir: './dist',
  renderURL: (name, sha) => `/assets/${name}.${sha}.css`,
  map: './dist/.cssmap.json', // persists ID mappings
});
```

## Asset Manifest

`emit()` generates a manifest file with content hashes, pre-compressed variants (gzip, brotli, zstd), and URLs. Configure via:

- `manifest` — output path (defaults to `outDir/manifest.json`)
- `renderURL` — function that generates the public URL from name + sha256
- `headers` — optional HTTP headers

## CSS Minification

Pass `minify: true` to `emit()` to enable lightningcss-based minification.
