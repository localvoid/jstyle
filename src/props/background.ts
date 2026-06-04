import { declProp, type CssPropertyTemplate, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for background-color, background-image, background-position, etc.
 *
 * ```ts
 * background('url(bg.png) no-repeat center')
 * background('linear-gradient(135deg, #fff, #000)')
 * ```
 */
export const background = declProp<string | CssPropertyTemplate>('background');

/**
 * Sets background color.
 *
 * - CSS `<color>` value
 */
export const backgroundColor = declProp<CssPropertyValue>('background-color');

/**
 * Sets background image.
 *
 * - `none`
 * - `<image>` — url, gradient, image-set, etc.
 *
 * ```ts
 * backgroundImage('url(texture.png)')
 * backgroundImage('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
 * ```
 */
export const backgroundImage = declProp<CssPropertyValue>('background-image');

/**
 * Sets how background image repeats.
 *
 * - `repeat` — repeat in both directions (default)
 * - `repeat-x` — horizontal only
 * - `repeat-y` — vertical only
 * - `no-repeat` — no tiling
 * - `space` — evenly distributed, no clipping
 * - `round` — stretch to fit whole tiles
 */
export const backgroundRepeat = declProp<
  'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'space' | 'round' | CssPropertyValue
>('background-repeat');

/**
 * Sets background image position.
 *
 * - `<position>` — keywords (`left`, `center`, `right`, `top`, `bottom`)
 * - `<length>` | `<percentage>`
 * - 2-value position (`right 10px bottom 10px`)
 *
 * ```ts
 * backgroundPosition('center')
 * backgroundPosition('right 10px bottom 10px')
 * ```
 */
export const backgroundPosition = declProp<CssPropertyValue>('background-position');

/**
 * Sets background image horizontal position.
 *
 * - `<length>` | `<percentage>` | `left` | `center` | `right`
 */
export const backgroundPositionX = declProp<CssPropertyValue>('background-position-x');

/**
 * Sets background image vertical position.
 *
 * - `<length>` | `<percentage>` | `top` | `center` | `bottom`
 */
export const backgroundPositionY = declProp<CssPropertyValue>('background-position-y');

/**
 * Sets background image size.
 *
 * - `auto` — natural size (default)
 * - `cover` — fill container, may crop
 * - `contain` — fit entirely, may letterbox
 * - `<length>` | `<percentage>`
 * - 2-value syntax sets width and height separately
 */
export const backgroundSize = declProp<'auto' | 'cover' | 'contain' | CssPropertyValue>(
  'background-size',
);

/**
 * Sets painting area for the background (clipping region).
 *
 * - `border-box` — extends to border edge (default)
 * - `padding-box` — extends to padding edge
 * - `content-box` — clips to content
 * - `text` — clips to text (non-standard)
 */
export const backgroundClip = declProp<
  'border-box' | 'padding-box' | 'content-box' | 'text' | CssPropertyValue
>('background-clip');

/**
 * Sets positioning area for the background.
 *
 * - `border-box` — position from border edge
 * - `padding-box` — from padding edge (default)
 * - `content-box` — from content edge
 */
export const backgroundOrigin = declProp<
  'border-box' | 'padding-box' | 'content-box' | CssPropertyValue
>('background-origin');

/**
 * Sets whether background scrolls with content or is fixed.
 *
 * - `scroll` — scrolls with element (default)
 * - `fixed` — fixed relative to viewport
 * - `local` — scrolls with element's content, even if element has own scroll
 */
export const backgroundAttachment = declProp<
  'scroll' | 'fixed' | 'local' | CssPropertyValue
>('background-attachment');

/**
 * Sets how background images blend with each other when overlapping.
 *
 * - `normal` — no blending
 * - `multiply` | `screen` | `overlay` | `darken` | `lighten`
 * - `color-dodge` | `color-burn` | `hard-light` | `soft-light`
 * - `difference` | `exclusion` | `hue` | `saturation` | `color` | `luminosity`
 */
export const backgroundBlendMode = declProp<
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'
  | CssPropertyValue
>('background-blend-mode');

/**
 * Sets accent color for native form controls (checkbox, radio, range, etc).
 *
 * - CSS `<color>` value
 * - `auto` — use user agent theme color
 */
export const accentColor = declProp<CssPropertyValue>('accent-color');

/**
 * Sets how element blends with the backdrop behind it.
 *
 * - `normal` — no blending
 * - `multiply` | `screen` | `overlay` | `darken` | `lighten`
 * - `color-dodge` | `color-burn` | `hard-light` | `soft-light`
 * - `difference` | `exclusion` | `hue` | `saturation` | `color` | `luminosity`
 */
export const mixBlendMode = declProp<
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'
  | CssPropertyValue
>('mix-blend-mode');

// Background

/** `background-color: transparent` — fully transparent background. */
export const BG_TRANSPARENT = backgroundColor('transparent');
