# jstyle

Programmatic TypeScript-first CSS builder that generates optimized CSS.

## Package Structure

```
README.md
skills/jstyle/
  SKILL.md
src/
  index.ts         # Main exports
  css/
    color.ts
    core.ts
    selector.ts
    size.ts
  emit.ts          # CSS emitting
  emit/            # Emit modules
    css.ts         # CSS emit
    js.ts          # JS emit
    rust.ts        # Rust emit
  props.ts         # Re-exports props
  props/           # CSS properties
  map/             # Mapping utilities
    index.ts       # Map entry
    uid.ts         # UID generation
```

## Commands

- `bun run check` - Type-aware lint (oxlint + oxlint-tsgolint, typeCheck: true)
- `bun run test` - Run tests

## Instructions

- Do NOT explore `src/props/` directory, unless working on CSS properties
