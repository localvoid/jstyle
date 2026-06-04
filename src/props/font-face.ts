import { declProp, type CssPropertyValue } from '../css/core.js';

export const fontFamily = declProp<string>('font-family');
export const src = declProp<string>('src');

/**
 * Sets font display strategy (used inside `@font-face`).
 *
 * - `auto` — browser default
 * - `block` — hide text until font loads, max ~3s
 * - `swap` — show fallback immediately, swap font when loaded
 * - `fallback` — like swap, but brief block then swap, shorter timeout
 * - `optional` — only use font if already cached/downloaded quickly
 */
export const fontDisplay = declProp<
  'auto' | 'block' | 'swap' | 'fallback' | 'optional' | CssPropertyValue
>('font-display');

/**
 * Sets Unicode ranges for a `@font-face` rule (which characters the font supports).
 *
 * - `U+0000-00FF` (range), `U+26??` (wildcard), `U+25A0-25FF` (multiple ranges)
 *
 * ```ts
 * unicodeRange('U+0000-00FF, U+0131, U+0152-0153')
 * ```
 */
export const unicodeRange = declProp<CssPropertyValue>('unicode-range');

/**
 * Sets font-weight for a `@font-face` rule.
 *
 * - `normal` | `bold` | `100`-`900`
 * - range: `400 900`
 */
export const fontWeightFace = declProp<CssPropertyValue>('font-weight');

/**
 * Sets font-style for a `@font-face` rule.
 *
 * - `normal` | `italic` | `oblique <angle>`
 * - range: `normal italic`
 */
export const fontStyleFace = declProp<CssPropertyValue>('font-style');

/**
 * Sets font-stretch for a `@font-face` rule.
 *
 * - `normal` | `condensed` | `expanded`
 * - range: `50% 200%`
 */
export const fontStretchFace = declProp<CssPropertyValue>('font-stretch');
