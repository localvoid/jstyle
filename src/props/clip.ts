import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets clipping path for an element (defines visible region).
 *
 * - `none`
 * - `<clip-source>` — url to SVG clipPath
 * - `<basic-shape>` — `circle()`, `ellipse()`, `polygon()`, `inset()`
 * - `<geometry-box>` — `margin-box`, `border-box`, `padding-box`, `content-box`
 *
 * ```ts
 * clipPath('circle(50%)')
 * clipPath('polygon(50% 0, 100% 50%, 50% 100%, 0 50%)')
 * ```
 */
export const clipPath = declProp<CssPropertyValue>('clip-path');

/**
 * Sets masking layer for an element (defines which parts are visible/hidden).
 *
 * - `none`
 * - `<mask-layer>` — image, gradient; `luminance`/`alpha` mask types
 *
 * ```ts
 * mask('url(mask.svg)')
 * mask('linear-gradient(white, black)')
 * ```
 */
export const mask = declProp<CssPropertyValue>('mask');

/**
 * Sets shape used for float exclusion (wraps text around a shape).
 *
 * - `none`
 * - `<shape-box>` — `margin-box`, `border-box`, `padding-box`, `content-box`
 * - `<basic-shape>` — `circle()`, `ellipse()`, `polygon()`, `inset()`
 * - `<image>` — alpha channel used as shape
 *
 * ```ts
 * shapeOutside('circle(50%)')
 * shapeOutside('polygon(0 0, 100% 0, 50% 100%)')
 * ```
 */
export const shapeOutside = declProp<CssPropertyValue>('shape-outside');

/**
 * Sets margin around a shape (for float exclusion).
 *
 * - `<length>` | `<percentage>`
 */
export const shapeMargin = declProp<CssPropertyValue>('shape-margin');

/**
 * Sets mask image source.
 *
 * - `none`
 * - `<mask-image>` — url, gradient
 *
 * ```ts
 * maskImage('url(mask.svg)')
 * maskImage('linear-gradient(white, black)')
 * ```
 */
export const maskImage = declProp<CssPropertyValue>('mask-image');

/**
 * Sets mask position.
 *
 * - `<position>` — e.g. `center`, `top left`, `50% 0`
 */
export const maskPosition = declProp<CssPropertyValue>('mask-position');

/**
 * Sets mask size.
 *
 * - `auto` — natural size
 * - `cover` | `contain`
 * - `<length>` | `<percentage>` | 2-value shorthand
 */
export const maskSize = declProp<CssPropertyValue>('mask-size');

/**
 * Sets mask repeat behavior.
 *
 * - `repeat` (default) | `no-repeat` | `repeat-x` | `repeat-y` | `space` | `round`
 */
export const maskRepeat = declProp<CssPropertyValue>('mask-repeat');

/**
 * Sets mask clipping area.
 *
 * - `content-box` | `padding-box` | `border-box` | `margin-box` | `fill-box`
 * - `stroke-box` | `view-box` | `no-clip`
 */
export const maskClip = declProp<CssPropertyValue>('mask-clip');

/**
 * Sets mask origin (position from which mask is placed).
 *
 * - `content-box` | `padding-box` | `border-box` | `margin-box` | `fill-box`
 * - `stroke-box` | `view-box`
 */
export const maskOrigin = declProp<CssPropertyValue>('mask-origin');

/**
 * Sets mask compositing method.
 *
 * - `add` — union
 * - `subtract` — mask source minus destination
 * - `intersect` — intersection
 * - `exclude` — XOR
 */
export const maskComposite = declProp<
  'add' | 'subtract' | 'intersect' | 'exclude' | CssPropertyValue
>('mask-composite');

/**
 * Sets mask type (luminance or alpha channel).
 *
 * - `luminance` — brightness used as mask
 * - `alpha` — transparency used as mask
 */
export const maskType = declProp<'luminance' | 'alpha' | CssPropertyValue>('mask-type');
