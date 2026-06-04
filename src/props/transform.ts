import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets 2D/3D transforms.
 *
 * - `none`
 * - transform functions: `translate()`, `rotate()`, `scale()`, `skew()`, `matrix()`, etc.
 * - multiple functions can be combined
 *
 * ```ts
 * transform('translateX(10px) rotate(45deg)')
 * transform('scale(1.2)')
 * ```
 */
export const transform = declProp<CssPropertyValue>('transform');

/**
 * Sets transform origin (pivot point for transforms).
 *
 * - `<position>` — keywords (`center`, `top left`, etc), `<length>`, `<percentage>`
 * - 1 value: x; 2 values: x, y; 3 values: x, y, z
 */
export const transformOrigin = declProp<CssPropertyValue>('transform-origin');

/**
 * Sets CSS translation transform (standalone, can be animated independently).
 *
 * - `none`
 * - shorthand: `<tx>` `<ty>`? (x, y)
 * - `x <tx>` `y <ty>` (named axes)
 *
 * ```ts
 * translate('10px 20px')
 * translate('100%')
 * ```
 */
export const translate = declProp<CssPropertyValue>('translate');

/**
 * Sets CSS filter effects.
 *
 * - `none`
 * - filter functions: `blur(<length>)`, `brightness(<number|percentage>)`, `contrast(<number|percentage>)`
 * - `grayscale(<number|percentage>)`, `invert(<number|percentage>)`, `opacity(<number|percentage>)`
 * - `saturate(<number|percentage>)`, `sepia(<number|percentage>)`, `hue-rotate(<angle>)`
 * - `drop-shadow(<offset-x> <offset-y> <blur-radius>? <color>?)`
 *
 * ```ts
 * filter('blur(4px)')
 * filter('grayscale(1) brightness(0.8)')
 * ```
 */
export const filter = declProp<CssPropertyValue>('filter');

/**
 * Sets filter applied to the backdrop behind an element (requires `position` context).
 *
 * - `none`
 * - same filter functions as `filter`
 *
 * ```ts
 * backdropFilter('blur(10px)')
 * backdropFilter('saturate(180%)')
 * ```
 */
export const backdropFilter = declProp<CssPropertyValue>('backdrop-filter');

/**
 * Sets coordinate system for transforms.
 *
 * - `view-box` — uses SVG viewBox
 * - `fill-box` — object bounding box
 * - `stroke-box` — stroke bounding box
 * - `content-box` — content area
 * - `border-box` — border area (default for HTML)
 */
export const transformBox = declProp<
  'view-box' | 'fill-box' | 'stroke-box' | 'content-box' | 'border-box' | CssPropertyValue
>('transform-box');

/**
 * Sets perspective distance for 3D transforms on children.
 *
 * - `none` — no perspective
 * - `<length>` — distance from viewer; smaller = more perspective
 */
export const perspective = declProp<CssPropertyValue>('perspective');

/**
 * Sets vanishing point for 3D transforms (where lines converge).
 *
 * - `<position>` — e.g. `center`, `left top`, `50% 0`
 */
export const perspectiveOrigin = declProp<CssPropertyValue>('perspective-origin');

/**
 * Sets whether back face of element is visible when rotated in 3D.
 *
 * - `visible` — back face visible (default)
 * - `hidden` — back face hidden, element invisible when facing away
 */
export const backfaceVisibility = declProp<
  'visible' | 'hidden' | CssPropertyValue
>('backface-visibility');

/**
 * Sets whether child 3D transforms create their own stacking context (preserves 3D space).
 *
 * - `flat` — children rendered flat in parent's plane (default)
 * - `preserve-3d` — children positioned in 3D space
 */
export const transformStyle = declProp<
  'flat' | 'preserve-3d' | CssPropertyValue
>('transform-style');

/**
 * Sets CSS rotation transform (standalone, can be animated independently).
 *
 * - `<angle>`
 * - `x <angle>` `y <angle>` `z <angle>` (named axes)
 * - `from <rotation>` — starting rotation
 *
 * ```ts
 * rotate('45deg')
 * rotate('z 90deg')
 * ```
 */
export const rotate = declProp<CssPropertyValue>('rotate');

/**
 * Sets CSS scale transform (standalone, can be animated independently).
 *
 * - `<number>` — uniform scale
 * - `<number> <number>` — x, y
 * - `<number> <number> <number>` — x, y, z
 * - `x <number>` `y <number>` `z <number>` (named axes)
 *
 * ```ts
 * scale('1.2')
 * scale('1.5 0.8')
 * ```
 */
export const scale = declProp<CssPropertyValue>('scale');
