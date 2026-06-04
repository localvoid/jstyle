import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for list-style-type, list-style-position, list-style-image.
 *
 * ```ts
 * listStyle('disc inside')
 * listStyle('none')
 * ```
 */
export const listStyle = declProp<CssPropertyValue>('list-style');

/**
 * Sets list item marker type.
 *
 * - `disc` — filled circle (default)
 * - `circle` — open circle
 * - `square` — filled square
 * - `decimal` — 1, 2, 3...
 * - `decimal-leading-zero` — 01, 02, 03...
 * - `lower-roman` | `upper-roman` | `lower-alpha` | `upper-alpha`
 * - `lower-greek` | `lower-latin` | `upper-latin`
 * - `none` — no marker
 * - `<string>` — custom marker text
 */
export const listStyleType = declProp<
  | 'disc'
  | 'circle'
  | 'square'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-roman'
  | 'upper-roman'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'lower-greek'
  | 'lower-latin'
  | 'upper-latin'
  | 'none'
  | CssPropertyValue
>('list-style-type');

/**
 * Sets marker position relative to list content.
 *
 * - `inside` — marker inside content flow, affects indentation
 * - `outside` — marker outside content flow (default)
 */
export const listStylePosition = declProp<'inside' | 'outside' | CssPropertyValue>(
  'list-style-position',
);

/**
 * Sets custom list marker image.
 *
 * - `none`
 * - `<image>` — url, gradient, etc.
 */
export const listStyleImage = declProp<CssPropertyValue>('list-style-image');

// List

/** `list-style-type: none` — no list marker. */
export const LIST_NONE = listStyleType('none');
