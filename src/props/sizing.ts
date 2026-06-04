import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets width.
 *
 * - `<length>` | `<percentage>` — of containing block
 * - `auto` — determined by content/other props
 * - `min-content` | `max-content` | `fit-content()` | `stretch` — fill available space
 */
export const width = declProp<CssPropertyValue>('width');

/**
 * Sets height.
 *
 * - `<length>` | `<percentage>` — of containing block
 * - `auto`
 * - `min-content` | `max-content` | `fit-content()` | `stretch`
 */
export const height = declProp<CssPropertyValue>('height');

/**
 * Sets minimum width.
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content` | `fit-content()`
 */
export const minWidth = declProp<CssPropertyValue>('min-width');

/**
 * Sets minimum height.
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content` | `fit-content()`
 */
export const minHeight = declProp<CssPropertyValue>('min-height');

/**
 * Sets maximum width.
 *
 * - `<length>` | `<percentage>` | `none` (no limit) | `min-content` | `max-content` | `fit-content()`
 */
export const maxWidth = declProp<CssPropertyValue>('max-width');

/**
 * Sets maximum height.
 *
 * - `<length>` | `<percentage>` | `none` (no limit) | `min-content` | `max-content` | `fit-content()`
 */
export const maxHeight = declProp<CssPropertyValue>('max-height');

/**
 * Sets block-axis size (logical width in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content` | `fit-content()`
 */
export const blockSize = declProp<CssPropertyValue>('block-size');

/**
 * Sets inline-axis size (logical height in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content` | `fit-content()`
 */
export const inlineSize = declProp<CssPropertyValue>('inline-size');

/**
 * Sets minimum inline-axis size.
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content`
 */
export const minInlineSize = declProp<CssPropertyValue>('min-inline-size');

/**
 * Sets maximum inline-axis size.
 *
 * - `<length>` | `<percentage>` | `none` | `min-content` | `max-content`
 */
export const maxInlineSize = declProp<CssPropertyValue>('max-inline-size');

/**
 * Sets minimum block-axis size.
 *
 * - `<length>` | `<percentage>` | `auto` | `min-content` | `max-content`
 */
export const minBlockSize = declProp<CssPropertyValue>('min-block-size');

/**
 * Sets maximum block-axis size.
 *
 * - `<length>` | `<percentage>` | `none` | `min-content` | `max-content`
 */
export const maxBlockSize = declProp<CssPropertyValue>('max-block-size');

/**
 * Sets sizing behavior for form controls (`<input>`, `<select>`, `<textarea>`).
 *
 * - `none` — default, fixed size based on browser defaults
 * - `normal` | `auto` — size adjusts to fit content
 */
export const fieldSizing = declProp<'none' | 'normal' | 'auto' | CssPropertyValue>('field-sizing');

/**
 * Sets how replaced elements (`<img>`, `<video>`, `<iframe>`) fit their container.
 *
 * - `fill` — stretch to fill, may distort (default)
 * - `contain` — fit entirely, letterbox
 * - `cover` — fill entirely, may crop
 * - `none` — natural size
 * - `scale-down` — like contain, but never larger than natural size
 */
export const objectFit = declProp<
  'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | CssPropertyValue
>('object-fit');

/**
 * Sets alignment of replaced element within its box (used with object-fit).
 *
 * - `<position>` — e.g. `center`, `50% 50%`, `right top`, `left 20%`
 */
export const objectPosition = declProp<CssPropertyValue>('object-position');

// Object Fit

/** `object-fit: cover` — fill container, crop to maintain aspect ratio. */
export const COVER = objectFit('cover');
/** `object-fit: contain` — fit within container, letterbox to maintain aspect ratio. */
export const CONTAIN = objectFit('contain');
