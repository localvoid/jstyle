import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for grid-template and grid-auto-* properties.
 */
export const grid = declProp<CssPropertyValue>('grid');

/**
 * Sets grid area by name or row/column position.
 *
 * - `<custom-ident>` — area name from grid-template-areas
 * - shorthand: `<row-start>` / `<column-start>` / `<row-end>` / `<column-end>`
 * - use `span N` to span N tracks, `-1` for last line
 *
 * ```ts
 * gridArea('header')
 * gridArea('1 / 2 / 3 / 4')
 * ```
 */
export const gridArea = declProp<CssPropertyValue>('grid-area');

/**
 * Sets auto-placement direction for grid items.
 *
 * - `row` — place items by filling rows (default)
 * - `column` — fill columns first
 * - `dense` — fill gaps with smaller items, may reorder
 * - `row dense` | `column dense`
 */
export const gridAutoFlow = declProp<
  'row' | 'column' | 'dense' | 'row dense' | 'column dense' | CssPropertyValue
>('grid-auto-flow');

/**
 * Sets size of auto-generated columns.
 *
 * - `<length>` | `<percentage>` | `min-content` | `max-content` | `auto`
 * - `min()` | `max()` | `fit-content()` — clamps between min and max
 */
export const gridAutoColumns = declProp<CssPropertyValue>('grid-auto-columns');

/**
 * Sets size of auto-generated rows.
 *
 * - `<length>` | `<percentage>` | `min-content` | `max-content` | `auto`
 * - `min()` | `max()` | `fit-content()`
 */
export const gridAutoRows = declProp<CssPropertyValue>('grid-auto-rows');

/**
 * Sets grid column span/start/end.
 *
 * - `<custom-ident>`
 * - shorthand: `<col-start>` / `<col-end>`
 * - use `span N` to span N tracks, `-1` for last line
 *
 * ```ts
 * gridColumn('1 / 3')
 * gridColumn('span 2')
 * ```
 */
export const gridColumn = declProp<CssPropertyValue>('grid-column');

/**
 * Sets grid column start line.
 *
 * - `<custom-ident>` — named line
 * - `<integer>` — line number, 1-based
 * - `span <custom-ident>` | `span <integer>` | `auto`
 */
export const gridColumnStart = declProp<CssPropertyValue>('grid-column-start');

/**
 * Sets grid column end line.
 *
 * - `<custom-ident>` | `<integer>`
 * - `span <custom-ident>` | `span <integer>` | `auto`
 */
export const gridColumnEnd = declProp<CssPropertyValue>('grid-column-end');

/**
 * Sets grid row span/start/end.
 *
 * - `<custom-ident>`
 * - shorthand: `<row-start>` / `<row-end>`
 *
 * ```ts
 * gridRow('1 / 3')
 * gridRow('span 2')
 * ```
 */
export const gridRow = declProp<CssPropertyValue>('grid-row');

/**
 * Sets grid row start line.
 *
 * - `<custom-ident>` | `<integer>` | `span <custom-ident>` | `span <integer>` | `auto`
 */
export const gridRowStart = declProp<CssPropertyValue>('grid-row-start');

/**
 * Sets grid row end line.
 *
 * - `<custom-ident>` | `<integer>` | `span <custom-ident>` | `span <integer>` | `auto`
 */
export const gridRowEnd = declProp<CssPropertyValue>('grid-row-end');

/**
 * Shorthand for grid-template-areas, grid-template-columns, grid-template-rows.
 */
export const gridTemplate = declProp<CssPropertyValue>('grid-template');

/**
 * Sets named grid areas for line-based placement.
 *
 * - `none`
 * - `<string>+` — each string = a row of area names; use `.` for empty cells
 *
 * ```ts
 * gridTemplateAreas('"header header" "sidebar main"')
 * gridTemplateAreas('"a a a" ". b ." "c c c"')
 * ```
 */
export const gridTemplateAreas = declProp<CssPropertyValue>('grid-template-areas');

/**
 * Sets column track sizing.
 *
 * - `none`
 * - track list: `<length>` | `<percentage>` | `fr` (fraction of available space)
 * - `minmax(min, max)` | `repeat(N, track)` | `auto` | `min-content` | `max-content`
 *
 * ```ts
 * gridTemplateColumns('1fr 2fr 1fr')
 * gridTemplateColumns('repeat(3, 1fr)')
 * ```
 */
export const gridTemplateColumns = declProp<CssPropertyValue>('grid-template-columns');

/**
 * Sets row track sizing.
 *
 * - `none`
 * - track list: `<length>` | `<percentage>` | `fr` | `minmax(min, max)`
 * - `repeat(N, track)` | `auto` | `min-content` | `max-content`
 *
 * ```ts
 * gridTemplateRows('auto 1fr auto')
 * gridTemplateRows('repeat(4, minmax(0, 1fr))')
 * ```
 */
export const gridTemplateRows = declProp<CssPropertyValue>('grid-template-rows');
