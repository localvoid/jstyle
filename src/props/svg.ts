import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets SVG fill color/paint.
 *
 * - `none`
 * - `<paint>` — CSS color, `url()` for gradient/pattern, `currentColor`
 */
export const fill = declProp<CssPropertyValue>('fill');

/**
 * Sets SVG stroke color/paint.
 *
 * - `none`
 * - `<paint>` — CSS color, `url()` for gradient/pattern, `currentColor`
 */
export const stroke = declProp<CssPropertyValue>('stroke');

/**
 * Sets painting order of fill and stroke (determines which is painted first/last).
 *
 * - `fill` — fill last, on top
 * - `stroke` — stroke last, on top
 * - `markers` — markers last
 * - space-separated combination like `stroke fill markers`
 */
export const paintOrder = declProp<CssPropertyValue>('paint-order');
