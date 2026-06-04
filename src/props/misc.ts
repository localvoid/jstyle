import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets image rendering algorithm.
 *
 * - `auto` — browser default
 * - `smooth` — bilinear smoothing
 * - `high-quality` — smooth, high-quality scaling
 * - `crisp-edges` — keep sharp edges, no antialiasing (good for pixel art)
 * - `pixelated` — nearest-neighbor, sharp pixels when scaled up
 */
export const imageRendering = declProp<
  'auto' | 'smooth' | 'high-quality' | 'crisp-edges' | 'pixelated' | CssPropertyValue
>('image-rendering');

/**
 * Sets quotation marks for nested quotes.
 *
 * - `none` — no quotes
 * - 2-value shorthand: open-quote, close-quote (for one level)
 * - 4-value shorthand: outer-open, outer-close, inner-open, inner-close
 *
 * ```ts
 * quotes('"' '"' "'" "'")
 * quotes('none')
 * ```
 */
export const quotes = declProp<CssPropertyValue>('quotes');

/**
 * Sets view transition name for an element (used with View Transitions API for animated transitions between pages/states).
 *
 * - `none` — no transition
 * - `<custom-ident>` — unique name, matched between old/new states
 *
 * ```ts
 * viewTransitionName('hero-image')
 * viewTransitionName('none')
 * ```
 */
export const viewTransitionName = declProp<CssPropertyValue>('view-transition-name');

/**
 * Sets whether an element's rendering may be adjusted to fit different color schemes.
 *
 * - `normal` — no adjustment
 * - `exact` — adjust to match color scheme
 * - `morph` — morphism to adjusted palette
 * - `switch` — switch palette when possible
 */
export const colorAdjust = declProp<
  'normal' | 'exact' | 'morph' | 'switch' | CssPropertyValue
>('color-adjust');

/**
 * Sets whether an element's rendering may be adjusted to fit different color schemes (print-specific variant).
 *
 * - `normal` — no adjustment
 * - `exact` — allow color/size adjustment
 */
export const printColorAdjust = declProp<'normal' | 'exact' | CssPropertyValue>(
  'print-color-adjust',
);

/**
 * Sets element behavior in forced-color mode (high contrast).
 *
 * - `auto` — use forced colors if enabled (default)
 * - `none` — preserve original colors
 * - `preserve-parent-color` — inherit parent's currentColor
 */
export const forcedColorAdjust = declProp<
  'auto' | 'none' | 'preserve-parent-color' | CssPropertyValue
>('forced-color-adjust');

/**
 * Sets the scroll timeline name (for scroll-driven animations).
 *
 * - `none`
 * - `<custom-ident>` — timeline name
 */
export const scrollTimelineName = declProp<CssPropertyValue>('scroll-timeline-name');

/**
 * Sets the scroll timeline axis.
 *
 * - `block` — block axis (default)
 * - `inline` — inline axis
 * - `x` — horizontal
 * - `y` — vertical
 */
export const scrollTimelineAxis = declProp<
  'block' | 'inline' | 'x' | 'y' | CssPropertyValue
>('scroll-timeline-axis');

/**
 * Sets the scroll timeline shorthand.
 *
 * - `<axis> <name>?` — e.g. `y my-scroll`, `block`
 *
 * ```ts
 * scrollTimeline('y my-scroll')
 * scrollTimeline('block')
 * ```
 */
export const scrollTimeline = declProp<CssPropertyValue>('scroll-timeline');

/**
 * Sets the view timeline name (for scroll-driven animations).
 *
 * - `none`
 * - `<custom-ident>` — timeline name
 */
export const viewTimelineName = declProp<CssPropertyValue>('view-timeline-name');

/**
 * Sets the view timeline axis.
 *
 * - `block` — block axis (default)
 * - `inline` — inline axis
 * - `x` — horizontal
 * - `y` — vertical
 */
export const viewTimelineAxis = declProp<
  'block' | 'inline' | 'x' | 'y' | CssPropertyValue
>('view-timeline-axis');

/**
 * Sets the view timeline inset (distance from viewport edges).
 *
 * - `auto`
 * - `<length>` | `<percentage>`
 * - 2-value shorthand (block, inline)
 *
 * ```ts
 * viewTimelineInset('100px')
 * viewTimelineInset('auto 50px')
 * ```
 */
export const viewTimelineInset = declProp<CssPropertyValue>('view-timeline-inset');

/**
 * Sets the view timeline shorthand.
 *
 * - `<axis> <name>? <inset>?`
 */
export const viewTimeline = declProp<CssPropertyValue>('view-timeline');

/**
 * Sets timeline-scope (limits scope of named timelines).
 *
 * - `none`
 * - `<custom-ident>` — timeline name
 */
export const timelineScope = declProp<CssPropertyValue>('timeline-scope');

/**
 * Sets anchor-scope (limits which anchor elements can be referenced).
 *
 * - `none` | `all`
 * - `<custom-ident>` — anchor name
 */
export const anchorScope = declProp<CssPropertyValue>('anchor-scope');

/**
 * Sets interpolate-size (allows interpolating intrinsic size keywords).
 *
 * - `normal` — default, no interpolation of intrinsic sizes
 * - `allow-keywords` — interpolate min/max-content, fit-content
 */
export const interpolateSize = declProp<'normal' | 'allow-keywords' | CssPropertyValue>(
  'interpolate-size',
);

/**
 * Sets math-style for math elements (affects height/depth calculations).
 *
 * - `normal` — default compact
 * - `compact` — tighter spacing
 */
export const mathStyle = declProp<'normal' | 'compact' | CssPropertyValue>('math-style');

/**
 * Sets ruby-align (alignment of ruby annotations).
 *
 * - `start` — start-aligned
 * - `center` — center-aligned
 * - `space-around` — distributed
 * - `space-between` — justified between annotations
 */
export const rubyAlign = declProp<
  'start' | 'center' | 'space-around' | 'space-between' | CssPropertyValue
>('ruby-align');

/**
 * Sets ruby-position (position of ruby annotations).
 *
 * - `over` — above text (default)
 * - `under` — below text
 */
export const rubyPosition = declProp<'over' | 'under' | CssPropertyValue>('ruby-position');

/**
 * Sets the overlay property (controls stacking context for positioned elements).
 *
 * - `none` (default)
 * - `top` — stack above all
 * - `bottom` — stack below all
 */
export const overlay = declProp<'none' | 'top' | 'bottom' | CssPropertyValue>('overlay');
