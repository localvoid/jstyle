import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets resize behavior for an element.
 *
 * - `none` — no resizing
 * - `both` — horizontal and vertical
 * - `horizontal` — width only
 * - `vertical` — height only
 * - `block` — block-axis only
 * - `inline` — inline-axis only
 */
export const resize = declProp<
  'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | CssPropertyValue
>('resize');

/**
 * Sets overflow behavior for block-level content.
 *
 * - `visible` — content overflows (default)
 * - `hidden` — clip at edge, no scrollbar
 * - `clip` — hard clip, no scrollbar, no scroll
 * - `scroll` — always show scrollbar
 * - `auto` — scrollbar only when needed
 */
export const overflow = declProp<
  'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | CssPropertyValue
>('overflow');

/**
 * Sets horizontal overflow behavior.
 *
 * - `visible` | `hidden` | `clip` | `scroll` | `auto`
 */
export const overflowX = declProp<
  'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | CssPropertyValue
>('overflow-x');

/**
 * Sets vertical overflow behavior.
 *
 * - `visible` | `hidden` | `clip` | `scroll` | `auto`
 */
export const overflowY = declProp<
  'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | CssPropertyValue
>('overflow-y');

/**
 * Sets overflow clip margin (extra area around clip edge that can be scrolled into view).
 *
 * - `<length>` — distance from clip edge
 */
export const overflowClipMargin = declProp<CssPropertyValue>('overflow-clip-margin');

// Overflow

/** `overflow: hidden` — clip content that overflows. */
export const OVERFLOW_HIDDEN = overflow('hidden');
/** `overflow: auto` — show scrollbar only when content overflows. */
export const OVERFLOW_AUTO = overflow('auto');
/** `overflow: visible` — allow content to overflow (default). */
export const OVERFLOW_VISIBLE = overflow('visible');
/** `overflow: clip` — clip without scrollbar, no scrolling. */
export const OVERFLOW_CLIP = overflow('clip');
/** `resize: none` — prevent user resizing. */
export const RESIZE_NONE = resize('none');
