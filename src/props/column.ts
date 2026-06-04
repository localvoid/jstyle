import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for column-width and column-count.
 *
 * ```ts
 * columns('200px 3')
 * columns('2')
 * ```
 */
export const columns = declProp<CssPropertyValue>('columns');

/**
 * Sets column width.
 *
 * - `<length>` | `auto` — determined by column-count
 */
export const columnWidth = declProp<CssPropertyValue>('column-width');

/**
 * Sets number of columns.
 *
 * - `<integer>` | `auto` — determined by column-width
 */
export const columnCount = declProp<CssPropertyValue>('column-count');

/**
 * Sets gap between columns.
 *
 * - `<length>` | `<percentage>` | `normal` (browser default)
 */
export const columnGap = declProp<CssPropertyValue>('column-gap');

/**
 * Sets rule (border) between columns.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const columnRule = declProp<CssPropertyValue>('column-rule');

/**
 * Sets whether an element spans across all columns.
 *
 * - `none` — element stays in its column
 * - `all` — element spans all columns
 */
export const columnSpan = declProp<'none' | 'all' | CssPropertyValue>('column-span');
