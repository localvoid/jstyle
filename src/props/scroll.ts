import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets smooth scrolling behavior for the viewport.
 *
 * - `auto` — instant jump (default)
 * - `smooth` — animated scroll
 */
export const scrollBehavior = declProp<
  'auto' | 'smooth' | CssPropertyValue
>('scroll-behavior');

/**
 * Reserves space for the scrollbar even when content doesn't overflow.
 *
 * - `auto` — scrollbar space only when overflow (default)
 * - `stable` — always reserve space
 * - `both-edges` — reserve space on both sides for symmetry
 */
export const scrollbarGutter = declProp<
  'auto' | 'stable' | 'both-edges' | CssPropertyValue
>('scrollbar-gutter');

/**
 * Sets scrollbar thumb and track colors.
 *
 * - `<color> <color>` — first = thumb, second = track
 */
export const scrollbarColor = declProp<CssPropertyValue>('scrollbar-color');

/**
 * Sets scroll margin on all sides (defines the snap zone).
 *
 * - `<length>` | 1-4 value shorthand
 */
export const scrollMargin = declProp<CssPropertyValue>('scroll-margin');

/**
 * Sets top scroll margin.
 *
 * - `<length>`
 */
export const scrollMarginTop = declProp<CssPropertyValue>('scroll-margin-top');

/**
 * Sets right scroll margin.
 *
 * - `<length>`
 */
export const scrollMarginRight = declProp<CssPropertyValue>('scroll-margin-right');

/**
 * Sets bottom scroll margin.
 *
 * - `<length>`
 */
export const scrollMarginBottom = declProp<CssPropertyValue>('scroll-margin-bottom');

/**
 * Sets left scroll margin.
 *
 * - `<length>`
 */
export const scrollMarginLeft = declProp<CssPropertyValue>('scroll-margin-left');

/**
 * Sets scroll padding on all sides (offset for scroll snap).
 *
 * - `<length>` | `<percentage>` | 1-4 value shorthand
 */
export const scrollPadding = declProp<CssPropertyValue>('scroll-padding');

/**
 * Sets top scroll padding.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingTop = declProp<CssPropertyValue>('scroll-padding-top');

/**
 * Sets right scroll padding.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingRight = declProp<CssPropertyValue>('scroll-padding-right');

/**
 * Sets bottom scroll padding.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingBottom = declProp<CssPropertyValue>('scroll-padding-bottom');

/**
 * Sets left scroll padding.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingLeft = declProp<CssPropertyValue>('scroll-padding-left');

/**
 * Sets scroll snap axis.
 *
 * - `none` — no snapping
 * - `x` — horizontal
 * - `y` — vertical
 * - `block` — block axis
 * - `inline` — inline axis
 * - `both`
 * - `<axis> <strictness>` — strictness: `mandatory` (must snap) | `proximity` (snap if near)
 *
 * ```ts
 * scrollSnapType('x mandatory')
 * scrollSnapType('both proximity')
 * ```
 */
export const scrollSnapType = declProp<CssPropertyValue>('scroll-snap-type');

/**
 * Sets scroll snap alignment for an element.
 *
 * - `none` — not a snap point
 * - `start` — snap to start edge
 * - `end` — snap to end edge
 * - `center` — snap to center
 * - 2-value shorthand: `<block>` `<inline>` — e.g. `start center`
 */
export const scrollSnapAlign = declProp<CssPropertyValue>('scroll-snap-align');

/**
 * Sets whether scroll snap point stops the scroll (forces snap even if not near).
 *
 * - `normal` — snap only if near (default)
 * - `always` — always snap to this point
 */
export const scrollSnapStop = declProp<
  'normal' | 'always' | CssPropertyValue
>('scroll-snap-stop');

/**
 * Sets scroll margin on inline-axis (start and end in LTR/RTL).
 *
 * - `<length>` | 1-2 value shorthand
 */
export const scrollMarginInline = declProp<CssPropertyValue>('scroll-margin-inline');

/**
 * Sets scroll margin at inline-start (left in LTR, right in RTL).
 *
 * - `<length>`
 */
export const scrollMarginInlineStart = declProp<CssPropertyValue>('scroll-margin-inline-start');

/**
 * Sets scroll margin at inline-end (right in LTR, left in RTL).
 *
 * - `<length>`
 */
export const scrollMarginInlineEnd = declProp<CssPropertyValue>('scroll-margin-inline-end');

/**
 * Sets scroll margin on block-axis (top and bottom in horizontal writing mode).
 *
 * - `<length>` | 1-2 value shorthand
 */
export const scrollMarginBlock = declProp<CssPropertyValue>('scroll-margin-block');

/**
 * Sets scroll margin at block-start (top in horizontal writing mode).
 *
 * - `<length>`
 */
export const scrollMarginBlockStart = declProp<CssPropertyValue>('scroll-margin-block-start');

/**
 * Sets scroll margin at block-end (bottom in horizontal writing mode).
 *
 * - `<length>`
 */
export const scrollMarginBlockEnd = declProp<CssPropertyValue>('scroll-margin-block-end');

/**
 * Sets scroll padding on inline-axis.
 *
 * - `<length>` | `<percentage>` | 1-2 value shorthand
 */
export const scrollPaddingInline = declProp<CssPropertyValue>('scroll-padding-inline');

/**
 * Sets scroll padding at inline-start.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingInlineStart = declProp<CssPropertyValue>('scroll-padding-inline-start');

/**
 * Sets scroll padding at inline-end.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingInlineEnd = declProp<CssPropertyValue>('scroll-padding-inline-end');

/**
 * Sets scroll padding on block-axis.
 *
 * - `<length>` | `<percentage>` | 1-2 value shorthand
 */
export const scrollPaddingBlock = declProp<CssPropertyValue>('scroll-padding-block');

/**
 * Sets scroll padding at block-start.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingBlockStart = declProp<CssPropertyValue>('scroll-padding-block-start');

/**
 * Sets scroll padding at block-end.
 *
 * - `<length>` | `<percentage>`
 */
export const scrollPaddingBlockEnd = declProp<CssPropertyValue>('scroll-padding-block-end');

// Scroll

/** `scroll-behavior: smooth` — smooth animated scrolling. */
export const SCROLL_SMOOTH = scrollBehavior('smooth');
