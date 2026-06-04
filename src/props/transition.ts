import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for transition-property, transition-duration, transition-timing-function, transition-delay.
 *
 * ```ts
 * transition('all 0.3s ease')
 * transition('opacity 0.2s, transform 0.3s')
 * ```
 */
export const transition = declProp<CssPropertyValue>('transition');

/**
 * Sets which CSS properties to transition.
 *
 * - `none`
 * - `all` — all animatable properties
 * - property name(s) (e.g. `opacity`, `transform`, `background-color`)
 *
 * ```ts
 * transitionProperty('opacity')
 * transitionProperty('transform, background-color')
 * ```
 */
export const transitionProperty = declProp<'none' | 'all' | CssPropertyValue>(
  'transition-property',
);

/**
 * Sets transition duration.
 *
 * - `<time>` — e.g. `0.3s`, `200ms`; `0s` means no transition
 */
export const transitionDuration = declProp<CssPropertyValue>('transition-duration');

/**
 * Sets transition timing function.
 *
 * - `ease` — default, slow start/end
 * - `linear` — constant speed
 * - `ease-in` — slow start
 * - `ease-out` — slow end
 * - `ease-in-out` — slow start/end
 * - `cubic-bezier(x1, y1, x2, y2)`
 * - `steps(n, step-direction)`
 */
export const transitionTimingFunction = declProp<
  'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | CssPropertyValue
>('transition-timing-function');

/**
 * Sets transition delay.
 *
 * - `<time>` — e.g. `0s`, `100ms`, `0.5s`; delay before transition starts
 * - multiple comma-separated values for multiple transitions
 */
export const transitionDelay = declProp<CssPropertyValue>('transition-delay');
