import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets caption position relative to the table.
 *
 * - `top` — above table (default)
 * - `bottom` — below table
 * - `block-start` | `block-end` — writing-mode relative
 */
export const captionSide = declProp<
  'top' | 'bottom' | 'block-start' | 'block-end' | CssPropertyValue
>('caption-side');

/**
 * Sets visibility of cells with no content.
 *
 * - `show` — show empty cells with borders (default)
 * - `hide` — hide borders and padding
 */
export const emptyCells = declProp<'show' | 'hide' | CssPropertyValue>('empty-cells');

/**
 * Sets table layout algorithm.
 *
 * - `auto` — column widths determined by content
 * - `fixed` — column widths determined by first row
 */
export const tableLayout = declProp<'auto' | 'fixed' | CssPropertyValue>('table-layout');
