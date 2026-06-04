import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets margin on all sides.
 *
 * - `<length>` | `<percentage>` | `auto` — centers block elements horizontally
 * - 1 value: all sides; 2 values: top/bottom, left/right; 4 values: top, right, bottom, left
 */
export const margin = declProp<CssPropertyValue>('margin');

/**
 * Sets top margin.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginTop = declProp<CssPropertyValue>('margin-top');

/**
 * Sets right margin.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginRight = declProp<CssPropertyValue>('margin-right');

/**
 * Sets bottom margin.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginBottom = declProp<CssPropertyValue>('margin-bottom');

/**
 * Sets left margin.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginLeft = declProp<CssPropertyValue>('margin-left');

/**
 * Sets inline-axis margins (start and end in LTR/RTL contexts).
 *
 * - 1 value (both sides) | 2 values (start, end)
 */
export const marginInline = declProp<CssPropertyValue>('margin-inline');

/**
 * Sets padding on all sides.
 *
 * - `<length>` | `<percentage>`
 * - 1 value: all sides; 2 values: top/bottom, left/right; 4 values: top, right, bottom, left
 */
export const padding = declProp<CssPropertyValue>('padding');

/**
 * Sets top padding.
 *
 * - `<length>` | `<percentage>`
 */
export const paddingTop = declProp<CssPropertyValue>('padding-top');

/**
 * Sets right padding.
 *
 * - `<length>` | `<percentage>`
 */
export const paddingRight = declProp<CssPropertyValue>('padding-right');

/**
 * Sets bottom padding.
 *
 * - `<length>` | `<percentage>`
 */
export const paddingBottom = declProp<CssPropertyValue>('padding-bottom');

/**
 * Sets left padding.
 *
 * - `<length>` | `<percentage>`
 */
export const paddingLeft = declProp<CssPropertyValue>('padding-left');

/**
 * Sets margin on block-axis (top and bottom in horizontal writing mode).
 *
 * - 1 value (both sides) | 2 values (start, end)
 */
export const marginBlock = declProp<CssPropertyValue>('margin-block');

/**
 * Sets top margin (block-start in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginBlockStart = declProp<CssPropertyValue>('margin-block-start');

/**
 * Sets bottom margin (block-end in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginBlockEnd = declProp<CssPropertyValue>('margin-block-end');

/**
 * Sets inline-end margin (right in LTR, left in RTL).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const marginInlineEnd = declProp<CssPropertyValue>('margin-inline-end');

/**
 * Sets padding at start of inline axis (left in LTR, right in RTL).
 *
 * - `<length>` | `<percentage>`
 */
export const paddingInlineStart = declProp<CssPropertyValue>('padding-inline-start');

/**
 * Sets padding at end of inline axis (right in LTR, left in RTL).
 *
 * - `<length>` | `<percentage>`
 */
export const paddingInlineEnd = declProp<CssPropertyValue>('padding-inline-end');

/**
 * Sets padding on block-axis (top and bottom in horizontal writing mode).
 *
 * - 1 value (both sides) | 2 values (start, end)
 */
export const paddingBlock = declProp<CssPropertyValue>('padding-block');

/**
 * Sets top padding (block-start in horizontal writing mode).
 *
 * - `<length>` | `<percentage>`
 */
export const paddingBlockStart = declProp<CssPropertyValue>('padding-block-start');

/**
 * Sets bottom padding (block-end in horizontal writing mode).
 *
 * - `<length>` | `<percentage>`
 */
export const paddingBlockEnd = declProp<CssPropertyValue>('padding-block-end');

// Reset

/** `margin: 0` — reset margin. */
export const RESET_MARGIN = margin('0');
/** `padding: 0` — reset padding. */
export const RESET_PADDING = padding('0');
/** `[margin: 0, padding: 0]` — reset both margin and padding. */
export const RESET_SPACING = [RESET_MARGIN, RESET_PADDING];
