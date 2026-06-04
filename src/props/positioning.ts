import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * SVG horizontal position.
 *
 * - `<length>` | `<percentage>` | `<coordinate>`
 */
export const x = declProp<CssPropertyValue>('x');

/**
 * SVG vertical position.
 *
 * - `<length>` | `<percentage>` | `<coordinate>`
 */
export const y = declProp<CssPropertyValue>('y');

/**
 * Sets stacking order for positioned elements.
 *
 * - `auto` — no explicit stacking, follows DOM order
 * - `<integer>` — higher values stack in front of lower values
 */
export const zIndex = declProp<CssPropertyValue>('z-index');

/**
 * Sets top offset for positioned elements.
 *
 * - `<length>` | `<percentage>` | `auto` — vertical position determined by other props
 */
export const top = declProp<CssPropertyValue>('top');

/**
 * Sets right offset for positioned elements.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const right = declProp<CssPropertyValue>('right');

/**
 * Sets bottom offset for positioned elements.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const bottom = declProp<CssPropertyValue>('bottom');

/**
 * Sets left offset for positioned elements.
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const left = declProp<CssPropertyValue>('left');

/**
 * Sets positioning method.
 *
 * - `static` — normal flow, offsets ignored
 * - `relative` — offsets from normal position, element still in flow
 * - `absolute` — removed from flow, positioned relative to nearest positioned ancestor
 * - `fixed` — removed from flow, positioned relative to viewport, doesn't scroll
 * - `sticky` — toggles between relative and fixed based on scroll position
 */
export const position = declProp<
  'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | CssPropertyValue
>('position');

/**
 * Shorthand for top, right, bottom, left.
 *
 * - 1-4 value shorthand: `<length>` | `<percentage>` | `auto`
 *
 * ```ts
 * inset('0')
 * inset('10px 20px')
 * inset('10px 20px 10px 20px')
 * ```
 */
export const inset = declProp<CssPropertyValue>('inset');

/**
 * Sets block-start inset (logical top in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const insetBlockStart = declProp<CssPropertyValue>('inset-block-start');

/**
 * Sets block-end inset (logical bottom in horizontal writing mode).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const insetBlockEnd = declProp<CssPropertyValue>('inset-block-end');

/**
 * Sets block-axis inset (top and bottom in horizontal writing mode).
 *
 * - 1 value (both) | 2 values (block-start, block-end)
 */
export const insetBlock = declProp<CssPropertyValue>('inset-block');

/**
 * Sets inline-axis inset (left and right in horizontal writing mode).
 *
 * - 1 value (both) | 2 values (inline-start, inline-end)
 */
export const insetInline = declProp<CssPropertyValue>('inset-inline');

/**
 * Sets inline-start inset (logical left in LTR, logical right in RTL).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const insetInlineStart = declProp<CssPropertyValue>('inset-inline-start');

/**
 * Sets inline-end inset (logical right in LTR, logical left in RTL).
 *
 * - `<length>` | `<percentage>` | `auto`
 */
export const insetInlineEnd = declProp<CssPropertyValue>('inset-inline-end');

/**
 * Shorthand for offset-path, offset-distance, offset-rotate, offset-anchor.
 */
export const offset = declProp<CssPropertyValue>('offset');

/**
 * Sets the anchor point on the element for offset-path positioning.
 *
 * - `auto` — uses element center
 * - `<position>`
 */
export const offsetAnchor = declProp<CssPropertyValue>('offset-anchor');

/**
 * Sets how far along the offset path the element is positioned.
 *
 * - `<length>` | `<percentage>` | `<angle>`
 */
export const offsetDistance = declProp<CssPropertyValue>('offset-distance');

/**
 * Sets motion path for an element.
 *
 * - `none`
 * - `path("...")` — SVG path data
 * - `circle()` | `ellipse()` | `polygon()` | `ray()`
 *
 * ```ts
 * offsetPath('path("M 0 0 L 100 0 L 100 100")')
 * offsetPath('circle(50px at center)')
 * ```
 */
export const offsetPath = declProp<CssPropertyValue>('offset-path');

/**
 * Sets initial position of the element before offset-distance takes effect.
 *
 * - `auto` — determined by offset-path
 * - `<position>`
 */
export const offsetPosition = declProp<CssPropertyValue>('offset-position');

/**
 * Sets rotation of the element along the offset path.
 *
 * - `auto` — element faces direction of travel
 * - `reverse` — element faces opposite direction
 * - `<angle>` — fixed rotation
 *
 * ```ts
 * offsetRotate('auto')
 * offsetRotate('90deg')
 * ```
 */
export const offsetRotate = declProp<CssPropertyValue>('offset-rotate');

/**
 * Sets anchor name for CSS anchor positioning (element becomes an anchor for other elements).
 *
 * - `none` — not an anchor
 * - `<custom-ident>` — anchor name, referenced by `anchor()` in positioned elements
 */
export const anchorName = declProp<CssPropertyValue>('anchor-name');

// Position

/** `position: absolute` — removed from document flow, positioned relative to nearest positioned ancestor. */
export const ABSOLUTE = position('absolute');
/** `position: relative` — positioned relative to its normal position. */
export const RELATIVE = position('relative');
/** `position: fixed` — removed from flow, positioned relative to viewport. */
export const FIXED = position('fixed');
/** `position: sticky` — toggles between relative and fixed based on scroll position. */
export const STICKY = position('sticky');
