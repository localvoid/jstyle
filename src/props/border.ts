import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for border-width, border-style, border-color.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 *
 * ```ts
 * border('1px solid #000')
 * border('2px dashed red')
 * ```
 */
export const border = declProp<CssPropertyValue>('border');

/**
 * Sets top border.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderTop = declProp<CssPropertyValue>('border-top');

/**
 * Sets right border.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderRight = declProp<CssPropertyValue>('border-right');

/**
 * Sets bottom border.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderBottom = declProp<CssPropertyValue>('border-bottom');

/**
 * Sets left border.
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderLeft = declProp<CssPropertyValue>('border-left');

/**
 * Sets border radius on all corners.
 *
 * - `<length>` | `<percentage>`
 * - 1-4 value shorthand (top-left, top-right, bottom-right, bottom-left)
 * - `/` syntax for elliptical radii: `10px / 20px`
 *
 * ```ts
 * borderRadius('8px')
 * borderRadius('50%')
 * ```
 */
export const borderRadius = declProp<CssPropertyValue>('border-radius');

/**
 * Sets border width on all sides.
 *
 * - `<length>` | `thin` | `medium` (default) | `thick`
 * - 1-4 value shorthand
 */
export const borderWidth = declProp<CssPropertyValue>('border-width');

/**
 * Sets border color on all sides.
 *
 * - CSS `<color>` value
 * - 1-4 value shorthand
 */
export const borderColor = declProp<CssPropertyValue>('border-color');

/**
 * Sets border style on all sides.
 *
 * - `none` — no border
 * - `hidden` — none, but overrides in border-collapse
 * - `dotted` | `dashed` | `solid` | `double` — two lines with gap
 * - `groove` — 3D ridged
 * - `ridge` — 3D groove
 * - `inset` — 3D inset
 * - `outset` — 3D outset
 */
export const borderStyle = declProp<
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('border-style');

/**
 * Sets top border width.
 *
 * - `<length>` | `thin` | `medium` | `thick`
 */
export const borderTopWidth = declProp<CssPropertyValue>('border-top-width');

/**
 * Sets top border color.
 *
 * - CSS `<color>` value
 */
export const borderTopColor = declProp<CssPropertyValue>('border-top-color');

/**
 * Sets top border style.
 *
 * - `none` | `hidden` | `dotted` | `dashed` | `solid` | `double` | `groove` | `ridge` | `inset` | `outset`
 */
export const borderTopStyle = declProp<
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('border-top-style');

/**
 * Sets right border width.
 *
 * - `<length>` | `thin` | `medium` | `thick`
 */
export const borderRightWidth = declProp<CssPropertyValue>('border-right-width');

/**
 * Sets right border color.
 *
 * - CSS `<color>` value
 */
export const borderRightColor = declProp<CssPropertyValue>('border-right-color');

/**
 * Sets right border style.
 *
 * - `none` | `hidden` | `dotted` | `dashed` | `solid` | `double` | `groove` | `ridge` | `inset` | `outset`
 */
export const borderRightStyle = declProp<
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('border-right-style');

/**
 * Sets bottom border width.
 *
 * - `<length>` | `thin` | `medium` | `thick`
 */
export const borderBottomWidth = declProp<CssPropertyValue>('border-bottom-width');

/**
 * Sets bottom border color.
 *
 * - CSS `<color>` value
 */
export const borderBottomColor = declProp<CssPropertyValue>('border-bottom-color');

/**
 * Sets bottom border style.
 *
 * - `none` | `hidden` | `dotted` | `dashed` | `solid` | `double` | `groove` | `ridge` | `inset` | `outset`
 */
export const borderBottomStyle = declProp<
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('border-bottom-style');

/**
 * Sets left border width.
 *
 * - `<length>` | `thin` | `medium` | `thick`
 */
export const borderLeftWidth = declProp<CssPropertyValue>('border-left-width');

/**
 * Sets left border color.
 *
 * - CSS `<color>` value
 */
export const borderLeftColor = declProp<CssPropertyValue>('border-left-color');

/**
 * Sets left border style.
 *
 * - `none` | `hidden` | `dotted` | `dashed` | `solid` | `double` | `groove` | `ridge` | `inset` | `outset`
 */
export const borderLeftStyle = declProp<
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('border-left-style');

/**
 * Sets border collapse model for table cells.
 *
 * - `separate` — borders are separate (default)
 * - `collapse` — adjacent borders merge into one
 */
export const borderCollapse = declProp<'separate' | 'collapse' | CssPropertyValue>(
  'border-collapse',
);

/**
 * Sets spacing between table cell borders when `border-collapse: separate`.
 *
 * - `<length>`
 * - 2-value shorthand: horizontal and vertical spacing
 */
export const borderSpacing = declProp<CssPropertyValue>('border-spacing');

/**
 * Sets inline-axis borders (start and end in LTR/RTL).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderInline = declProp<CssPropertyValue>('border-inline');

/**
 * Sets inline-start border (left in LTR, right in RTL).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderInlineStart = declProp<CssPropertyValue>('border-inline-start');

/**
 * Sets inline-end border (right in LTR, left in RTL).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderInlineEnd = declProp<CssPropertyValue>('border-inline-end');

/**
 * Sets block-axis borders (top and bottom in horizontal writing mode).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderBlock = declProp<CssPropertyValue>('border-block');

/**
 * Sets block-start border (top in horizontal writing mode).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderBlockStart = declProp<CssPropertyValue>('border-block-start');

/**
 * Sets block-end border (bottom in horizontal writing mode).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 */
export const borderBlockEnd = declProp<CssPropertyValue>('border-block-end');

/**
 * Sets outline (drawn outside border, does not affect layout or box model).
 *
 * - shorthand: `<line-width>`? `<line-style>`? `<color>`?
 *
 * ```ts
 * outline('2px solid blue')
 * outline('none')
 * ```
 */
export const outline = declProp<CssPropertyValue>('outline');

/**
 * Sets outline offset from the border edge.
 *
 * - `<length>` — positive = outward, negative = inward
 */
export const outlineOffset = declProp<CssPropertyValue>('outline-offset');

/**
 * Sets box shadow.
 *
 * - `none`
 * - `[inset]? <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>?`
 * - blur radius makes shadow softer, spread radius expands/contracts shadow
 *
 * ```ts
 * boxShadow('0 4px 6px rgba(0,0,0,0.1)')
 * boxShadow('inset 0 2px 4px rgba(0,0,0,0.2)')
 * ```
 */
export const boxShadow = declProp<CssPropertyValue>('box-shadow');

/**
 * Sets whether box decoration breaks across page/fragment boundaries.
 *
 * - `clone` — each fragment gets its own border/padding
 * - `slice` — single box, split content
 */
export const boxDecorationBreak = declProp<'clone' | 'slice' | CssPropertyValue>(
  'box-decoration-break',
);

/**
 * Sets top-left border radius.
 *
 * - `<length>` | `<percentage>` | `<length> <length>` (elliptical)
 */
export const borderTopLeftRadius = declProp<CssPropertyValue>('border-top-left-radius');

/**
 * Sets top-right border radius.
 *
 * - `<length>` | `<percentage>` | `<length> <length>` (elliptical)
 */
export const borderTopRightRadius = declProp<CssPropertyValue>('border-top-right-radius');

/**
 * Sets bottom-left border radius.
 *
 * - `<length>` | `<percentage>` | `<length> <length>` (elliptical)
 */
export const borderBottomLeftRadius = declProp<CssPropertyValue>('border-bottom-left-radius');

/**
 * Sets bottom-right border radius.
 *
 * - `<length>` | `<percentage>` | `<length> <length>` (elliptical)
 */
export const borderBottomRightRadius = declProp<CssPropertyValue>('border-bottom-right-radius');

/**
 * Sets outline width.
 *
 * - `<length>` | `thin` | `medium` | `thick`
 */
export const outlineWidth = declProp<CssPropertyValue>('outline-width');

/**
 * Sets outline style.
 *
 * - `none` | `auto` | `dotted` | `dashed` | `solid` | `double` | `groove` | `ridge` | `inset` | `outset`
 */
export const outlineStyle = declProp<
  | 'none'
  | 'auto'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CssPropertyValue
>('outline-style');

/**
 * Sets outline color.
 *
 * - CSS `<color>` value
 * - `auto` — uses foreground color
 */
export const outlineColor = declProp<CssPropertyValue>('outline-color');

// Border

/** `border: none` — no border. */
export const BORDER_NONE = border('none');
