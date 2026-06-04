import type { CssPropertyTemplate, CssPropertyValue } from '../css/core.js';
import { declProp } from '../css/core.js';

/**
 * Shorthand for animation-name, animation-duration, animation-timing-function, etc.
 *
 * ```ts
 * animation('fadeIn 0.3s ease-in-out')
 * animation('slide 1s 0.2s both ease')
 * ```
 */
export const animation = declProp<string | CssPropertyTemplate>('animation');

/**
 * Sets how animation values compose with underlying values.
 *
 * - `replace` — animation completely replaces underlying value
 * - `add` — animation value added to underlying value
 * - `accumulate` — animation value accumulated on top of underlying value
 */
export const animationComposition = declProp<'replace' | 'add' | 'accumulate' | CssPropertyValue>(
  'animation-composition',
);

/**
 * Sets animation delay.
 *
 * - `<time>` — may be comma-separated for multiple animations
 */
export const animationDelay = declProp<string>('animation-delay');

/**
 * Sets animation direction.
 *
 * - `normal` — forward on each iteration
 * - `reverse` — backward on each iteration
 * - `alternate` — forward odd, reverse even
 * - `alternate-reverse` — reverse odd, forward even
 */
export const animationDirection = declProp<
  'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | CssPropertyValue
>('animation-direction');

/**
 * Sets animation duration.
 *
 * - `<time>` — may be comma-separated for multiple animations
 */
export const animationDuration = declProp<string>('animation-duration');

/**
 * Sets animation fill mode (how element looks before/after animation).
 *
 * - `none` — no styles applied outside animation
 * - `forwards` — element retains final keyframe styles after animation ends
 * - `backwards` — element gets initial keyframe styles during delay
 * - `both` — forwards + backwards
 */
export const animationFillMode = declProp<
  'none' | 'forwards' | 'backwards' | 'both' | CssPropertyValue
>('animation-fill-mode');

/**
 * Sets number of animation iterations.
 *
 * - `<number>`
 * - `infinite` — loop forever
 */
export const animationIterationCount = declProp<
  'infinite' | `${number}` | CssPropertyValue
>('animation-iteration-count');

/**
 * Sets animation name (must be defined with `@keyframes`).
 *
 * - `none`
 * - `<keyframes-name>` — may be comma-separated for multiple animations
 */
export const animationName = declProp<CssPropertyValue>('animation-name');

/**
 * Sets animation play state.
 *
 * - `running` — playing (default)
 * - `paused` — frozen at current frame
 */
export const animationPlayState = declProp<
  'running' | 'paused' | CssPropertyValue
>('animation-play-state');

/**
 * Sets timing function for animation.
 *
 * - `linear` — constant speed
 * - `ease` — slow start, fast middle, slow end (default)
 * - `ease-in` — slow start
 * - `ease-out` — slow end
 * - `ease-in-out` — slow start and end
 * - `cubic-bezier(x1, y1, x2, y2)` — custom curve
 * - `steps(n, <jump>)` — jump: `jump-start` | `jump-end` | `jump-both` | `jump-none`
 *
 * ```ts
 * animationTimingFunction('ease-in-out')
 * animationTimingFunction('cubic-bezier(0.4, 0, 0.2, 1)')
 * ```
 */
export const animationTimingFunction = declProp<
  'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | CssPropertyValue
>('animation-timing-function');

/**
 * Sets animation timeline range (for scroll-driven animations).
 *
 * - shorthand: `<timeline-range-name>` `<percentage>` for start and end
 */
export const animationRange = declProp<CssPropertyValue>('animation-range');

/**
 * Sets animation range start.
 *
 * - `<timeline-range-name>` `<percentage>` | `normal`
 */
export const animationRangeStart = declProp<CssPropertyValue>('animation-range-start');

/**
 * Sets animation range end.
 *
 * - `<timeline-range-name>` `<percentage>` | `normal`
 */
export const animationRangeEnd = declProp<CssPropertyValue>('animation-range-end');

/**
 * Sets animation timeline (scroll-driven animations).
 *
 * - `none`
 * - `auto` — uses document timeline (time-based)
 * - `scroll()` — scroll progress as timeline
 * - `view()` — element visibility in scrollport as timeline
 *
 * ```ts
 * animationTimeline('scroll()')
 * animationTimeline('view()')
 * ```
 */
export const animationTimeline = declProp<CssPropertyValue>('animation-timeline');
