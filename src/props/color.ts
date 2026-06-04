import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets foreground color.
 *
 * - CSS color value: hex, `rgb()`, `hsl()`, `oklch()`, named colors, etc.
 */
export const color = declProp<CssPropertyValue>('color');

/**
 * Sets caret (text cursor) color for text inputs and editable content.
 *
 * - CSS `<color>` value
 * - `auto` — use foreground color
 */
export const caretColor = declProp<CssPropertyValue>('caret-color');

/**
 * Sets element opacity (transparency).
 *
 * - `<number>` from `0` (fully transparent) to `1` (fully opaque, default)
 * - values below 0 treated as 0, above 1 as 1
 */
export const opacity = declProp<CssPropertyValue>('opacity');
