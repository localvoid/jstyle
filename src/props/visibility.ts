import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets element visibility.
 *
 * - `visible` — element is visible (default)
 * - `hidden` — element is invisible but still takes up layout space
 * - `collapse` — for table rows/columns: removes element while preserving table geometry
 */
export const visibility = declProp<
  'visible' | 'hidden' | 'collapse' | CssPropertyValue
>('visibility');

/**
 * Sets text writing mode.
 *
 * - `horizontal-tb` — horizontal, top-to-bottom (default for Latin)
 * - `vertical-rl` — vertical, right-to-left (e.g. Japanese)
 * - `vertical-lr` — vertical, left-to-right (e.g. Mongolian)
 * - `sideways-rl` | `sideways-lr` — rotated glyphs
 */
export const writingMode = declProp<
  | 'horizontal-tb'
  | 'vertical-rl'
  | 'vertical-lr'
  | 'sideways-rl'
  | 'sideways-lr'
  | CssPropertyValue
>('writing-mode');

/**
 * Sets Unicode bidirectional isolation (controls how mixed-direction text is handled).
 *
 * - `normal` — no explicit isolation, elements participate in paragraph embedding
 * - `embed` — creates inline embedding level
 * - `isolate` — isolates element's content from surrounding bidirectional text
 * - `bidi-override` — forces direction for all contained text
 * - `isolate-override` — isolate + bidi-override
 * - `plaintext` — determines direction from first strong character
 */
export const unicodeBidi = declProp<
  | 'normal'
  | 'embed'
  | 'isolate'
  | 'bidi-override'
  | 'isolate-override'
  | 'plaintext'
  | CssPropertyValue
>('unicode-bidi');

// Visibility

/** `visibility: visible` — element is visible (default). */
export const VISIBLE = visibility('visible');
/** `visibility: hidden` — element is invisible but retains layout space. */
export const HIDDEN = visibility('hidden');
