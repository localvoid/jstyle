import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets containment type for performance optimization.
 *
 * - `none` — no containment
 * - `strict` — all: size + layout + style + paint
 * - `content` — layout + style + paint, not size
 * - `size` — element size is independent of children
 * - `inline-size` — block/inline axis
 * - `layout` — internal layout doesn't affect outside
 * - `style` — counters and quotes don't escape
 * - `paint` — clipped to border box, creates stacking context
 *
 * ```ts
 * contain('layout')
 * contain('paint size')
 * contain('strict')
 * ```
 */
export const contain = declProp<
  | 'none'
  | 'strict'
  | 'content'
  | 'size'
  | 'inline-size'
  | 'layout'
  | 'style'
  | 'paint'
  | CssPropertyValue
>('contain');

/**
 * Sets visibility containment.
 *
 * - `visible`
 * - `hidden` — always hidden
 * - `auto` — hidden when off-screen, renders when near viewport
 */
export const contentVisibility = declProp<
  'visible' | 'hidden' | 'auto' | CssPropertyValue
>('content-visibility');

/**
 * Sets intrinsic size when element has `contain: size` (used as placeholder if content not rendered).
 *
 * - `none` — zero size
 * - `<length>` — explicit size
 * - `auto <length>` — use content size when rendered, fallback to `<length>`
 * - `<length> <length>` — width height fallback
 *
 * ```ts
 * containIntrinsicSize('300px')
 * containIntrinsicSize('auto 500px')
 * ```
 */
export const containIntrinsicSize = declProp<CssPropertyValue>(
  'contain-intrinsic-size',
);

/**
 * Sets intrinsic height for `contain: size`.
 *
 * - `none` | `<length>` | `auto <length>` — use content height when rendered
 */
export const containIntrinsicHeight = declProp<CssPropertyValue>(
  'contain-intrinsic-height',
);

/**
 * Sets intrinsic width for `contain: size`.
 *
 * - `none` | `<length>` | `auto <length>` — use content width when rendered
 */
export const containIntrinsicWidth = declProp<CssPropertyValue>(
  'contain-intrinsic-width',
);

/**
 * Sets intrinsic block size for `contain: size`.
 *
 * - `none` | `<length>` | `auto <length>`
 */
export const containIntrinsicBlockSize = declProp<CssPropertyValue>(
  'contain-intrinsic-block-size',
);

/**
 * Sets intrinsic inline size for `contain: size`.
 *
 * - `none` | `<length>` | `auto <length>`
 */
export const containIntrinsicInlineSize = declProp<CssPropertyValue>(
  'contain-intrinsic-inline-size',
);

/**
 * Shorthand for container-name and container-type.
 *
 * ```ts
 * container('sidebar / inline-size')
 * ```
 */
export const container = declProp<CssPropertyValue>('container');

/**
 * Sets container name for `@container` queries (names a containment context).
 *
 * - `none`
 * - `<custom-ident>` — or space-separated list of names
 */
export const containerName = declProp<CssPropertyValue>('container-name');

/**
 * Sets container type (axis for container queries).
 *
 * - `normal` — no containment for queries
 * - `inline-size` — queries width only
 * - `size` — queries both width and height
 */
export const containerType = declProp<
  'normal' | 'inline-size' | 'size' | CssPropertyValue
>('container-type');

// Contain

/** `contain: strict` — full containment (size + layout + style + paint). */
export const CONTAIN_STRICT = contain('strict');
/** `contain: content` — containment except for size (layout + style + paint). */
export const CONTAIN_CONTENT = contain('content');
