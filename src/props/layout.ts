import { declProp, type CssPropertyValue } from '../css/core.js';
import { alignItems, justifyContent } from './flex.js';

/**
 * Sets display type.
 *
 * - `none` — removed from document
 * - `block` | `inline` | `inline-block` — inline with box model
 * - `flex` | `grid` | `inline-flex` | `inline-grid`
 * - `flow-root` — new block formatting context
 * - `contents` — box disappears, children exposed
 * - `list-item` | `table` | `inline-table` | `table-row` | `table-cell` | etc.
 */
export const display = declProp<
  | 'none'
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'grid'
  | 'inline-flex'
  | 'inline-grid'
  | 'flow-root'
  | 'contents'
  | 'list-item'
  | 'table'
  | 'inline-table'
  | 'table-row'
  | 'table-cell'
  | 'table-column'
  | 'table-column-group'
  | 'table-footer-group'
  | 'table-header-group'
  | 'table-row-group'
  | 'table-caption'
  | CssPropertyValue
>('display');

/**
 * Sets float behavior.
 *
 * - `none` (default)
 * - `left` | `right`
 * - `inline-start` | `inline-end`
 */
export const float = declProp<
  'none' | 'left' | 'right' | 'inline-start' | 'inline-end' | CssPropertyValue
>('float');

/**
 * Sets clear behavior for floated elements.
 *
 * - `none` (default)
 * - `left` — no floats allowed on left
 * - `right` — no floats on right
 * - `both` — no floats on either side
 * - `inline-start` | `inline-end`
 */
export const clear = declProp<
  'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | CssPropertyValue
>('clear');

/**
 * Sets vertical alignment of inline/inline-block content within a line box.
 *
 * - `baseline` — align with text baseline (default)
 * - `sub` | `super` — subscript / superscript
 * - `text-top` | `text-bottom` — align with parent text top/bottom
 * - `middle` — align middle of element with baseline + half x-height
 * - `top` | `bottom` — align top/bottom of line box
 * - `<length>` | `<percentage>` — relative to line box height
 */
export const verticalAlign = declProp<
  | 'baseline'
  | 'sub'
  | 'super'
  | 'text-top'
  | 'text-bottom'
  | 'middle'
  | 'top'
  | 'bottom'
  | CssPropertyValue
>('vertical-align');

/**
 * Sets preferred aspect ratio (width / height).
 *
 * - `auto` — natural aspect ratio
 * - `<ratio>` — e.g. `16 / 9`, `1 / 1`
 * - used if only width or only height is specified
 */
export const aspectRatio = declProp<CssPropertyValue>('aspect-ratio');

/**
 * Sets flex/grid order for an item.
 *
 * - `<integer>` — default `0`, lower values first, negative allowed
 */
export const order = declProp<CssPropertyValue>('order');

/**
 * Sets gap between grid/flex items.
 *
 * - `<length>` | `<percentage>`
 * - 1 value (row and column) | 2 values (row gap, column gap)
 */
export const gap = declProp<CssPropertyValue>('gap');

/**
 * Sets row gap in grid/flex layouts.
 *
 * - `<length>` | `<percentage>` | `normal` (browser default)
 */
export const rowGap = declProp<CssPropertyValue>('row-gap');

// Display

/** `display: none`. */
export const DISPLAY_NONE = display('none');
/** `display: block` — block-level element. */
export const BLOCK = display('block');
/** `display: inline` — inline element, no width/height. */
export const INLINE = display('inline');
/** `display: inline-block` — inline element with block-level box model. */
export const INLINE_BLOCK = display('inline-block');
/** `display: flex` — flex container. */
export const FLEX = display('flex');
/** `display: grid` — grid container. */
export const GRID = display('grid');
/** `display: flow-root` — establishes a new block formatting context. */
export const FLOW_ROOT = display('flow-root');
/** `display: contents` — element box disappears, children become direct children. */
export const CONTENTS = display('contents');

// Align / Justify

/** `align-items: center` — center items on cross axis. */
export const ALIGN_CENTER = alignItems('center');
/** `align-items: stretch` — stretch items to fill cross axis. */
export const ALIGN_STRETCH = alignItems('stretch');
/** `align-items: flex-start` — align items to start of cross axis. */
export const ALIGN_START = alignItems('flex-start');
/** `align-items: flex-end` — align items to end of cross axis. */
export const ALIGN_END = alignItems('flex-end');
/** `justify-content: center` — center items on main axis. */
export const JUSTIFY_CENTER = justifyContent('center');
/** `justify-content: space-between` — distribute items with space between. */
export const JUSTIFY_BETWEEN = justifyContent('space-between');
/** `justify-content: space-evenly` — distribute items with equal space. */
export const JUSTIFY_EVENLY = justifyContent('space-evenly');

// Aspect Ratio

/** `aspect-ratio: 1 / 1` — square aspect ratio. */
export const ASPECT_SQUARE = aspectRatio('1 / 1');
/** `aspect-ratio: 16 / 9` — widescreen aspect ratio. */
export const ASPECT_WIDESCREEN = aspectRatio('16 / 9');
