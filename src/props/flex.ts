import { declProp, type CssPropertyValue } from '../css/core.js';
import { FLEX } from './layout.js';

/**
 * Shorthand for flex-grow, flex-shrink, flex-basis.
 *
 * - `none` — `0 1 auto` (don't grow, shrink if needed, size based on content)
 * - `auto` — `1 1 auto` (grow/shrink based on content)
 * - `<number>` — grow factor, shrink=1, basis=0
 * - `<number> <number>? <length>?` — explicit grow, shrink, basis
 *
 * ```ts
 * flex('1')
 * flex('1 0 200px')
 * ```
 */
export const flex = declProp<'none' | 'auto' | CssPropertyValue>('flex');

/**
 * Sets flex direction and wrapping in one declaration.
 *
 * - shorthand: `<flex-direction>` `<flex-wrap>`
 */
export const flexFlow = declProp<CssPropertyValue>('flex-flow');

/**
 * Sets initial main-axis size of a flex item.
 *
 * - `auto` — size based on content
 * - `min-content` — smallest possible
 * - `max-content` — largest possible
 * - `<length>` | `<percentage>`
 */
export const flexBasis = declProp<'auto' | 'min-content' | 'max-content' | CssPropertyValue>(
  'flex-basis',
);

/**
 * Sets flex grow factor (how much item grows relative to siblings).
 *
 * - `<number>` — default `0` (no growing); `1` = equal share, `2` = twice as much
 */
export const flexGrow = declProp<CssPropertyValue>('flex-grow');

/**
 * Sets flex shrink factor (how much item shrinks relative to siblings).
 *
 * - `<number>` — default `1` (items shrink proportionally); `0` = don't shrink
 */
export const flexShrink = declProp<CssPropertyValue>('flex-shrink');

/**
 * Sets main axis direction.
 *
 * - `row` — horizontal, left-to-right
 * - `row-reverse` — horizontal, right-to-left
 * - `column` — vertical, top-to-bottom
 * - `column-reverse` — vertical, bottom-to-top
 */
export const flexDirection = declProp<
  'row' | 'row-reverse' | 'column' | 'column-reverse' | CssPropertyValue
>('flex-direction');

/**
 * Sets whether flex items wrap onto multiple lines.
 *
 * - `nowrap` — single line, items may overflow
 * - `wrap` — multi-line, items wrap to next line
 * - `wrap-reverse` — multi-line, but cross axis direction is reversed
 */
export const flexWrap = declProp<'nowrap' | 'wrap' | 'wrap-reverse' | CssPropertyValue>(
  'flex-wrap',
);

/**
 * Sets self alignment in cross axis (overrides parent's `align-items`).
 *
 * - `auto` — uses parent's `align-items`
 * - `flex-start` | `flex-end` | `center`
 * - `stretch` | `baseline`
 * - `start` | `end`
 * - `<percentage>` | `<length>`
 */
export const alignSelf = declProp<
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
  | 'start'
  | 'end'
  | CssPropertyValue
>('align-self');

/**
 * Sets cross-axis alignment of all flex items.
 *
 * - `stretch` — fill cross axis (default)
 * - `flex-start` | `flex-end` | `center`
 * - `baseline` — align by text baseline
 * - `start` | `end`
 * - `<percentage>` | `<length>`
 */
export const alignItems = declProp<
  'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | CssPropertyValue
>('align-items');

/**
 * Sets cross-axis line alignment when there is extra space.
 *
 * - `stretch` (default)
 * - `flex-start` | `flex-end` | `center`
 * - `space-between` — no space at edges
 * - `space-around` — equal space around items
 * - `space-evenly` — equal space including edges
 * - `start` | `end`
 * - `<percentage>` | `<length>`
 */
export const alignContent = declProp<
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | CssPropertyValue
>('align-content');

/**
 * Sets self alignment on main axis (for grid items).
 *
 * - `auto` — uses parent's `justify-items`
 * - `flex-start` | `flex-end` | `center`
 * - `stretch`
 * - `<percentage>` | `<length>`
 */
export const justifySelf = declProp<
  'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | CssPropertyValue
>('justify-self');

/**
 * Sets main-axis item alignment in grid containers.
 *
 * - `stretch` (default)
 * - `flex-start` | `flex-end` | `center`
 * - `start` | `end`
 * - `<percentage>` | `<length>`
 */
export const justifyItems = declProp<
  'stretch' | 'flex-start' | 'flex-end' | 'center' | 'start' | 'end' | CssPropertyValue
>('justify-items');

/**
 * Sets main-axis content distribution.
 *
 * - `flex-start` — pack toward start
 * - `flex-end` — pack toward end
 * - `center`
 * - `space-between` — equal space between, no space at edges
 * - `space-around` — equal space around each item
 * - `space-evenly` — equal space between items and at edges
 * - `start` | `end` | `stretch`
 * - `<percentage>` | `<length>`
 */
export const justifyContent = declProp<
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'stretch'
  | CssPropertyValue
>('justify-content');

/**
 * Sets self alignment on both axes.
 *
 * - shorthand: `<align-self>` `<justify-self>`
 */
export const placeSelf = declProp<CssPropertyValue>('place-self');

/**
 * Sets item alignment on both axes.
 *
 * - shorthand: `<align-items>` `<justify-items>`
 */
export const placeItems = declProp<CssPropertyValue>('place-items');

/**
 * Sets content distribution on both axes.
 *
 * - shorthand: `<align-content>` `<justify-content>`
 */
export const placeContent = declProp<CssPropertyValue>('place-content');

// Flex

/** `display: flex` — flex row container (default direction). */
export const FLEX_ROW = FLEX;
/** `[display: flex, flex-flow: row-reverse]` — flex container with reversed row direction. */
export const FLEX_ROW_REVERSE = [FLEX, flexFlow('row-reverse')];
/** `[display: flex, flex-flow: column]` — flex container with vertical direction. */
export const FLEX_COLUMN = [FLEX, flexFlow('column')];
/** `[display: flex, flex-flow: column-reverse]` — flex container with reversed vertical direction. */
export const FLEX_COLUMN_REVERSE = [FLEX, flexFlow('column-reverse')];
/** `flex-wrap: wrap` — allow flex items to wrap onto multiple lines. */
export const FLEX_WRAP = flexWrap('wrap');
/** `flex-wrap: nowrap` — keep flex items on a single line. */
export const FLEX_NOWRAP = flexWrap('nowrap');
