import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand for font-style, font-variant, font-weight, font-stretch, font-size/line-height, font-family.
 *
 * ```ts
 * font('italic bold 16px/1.5 "Helvetica", sans-serif')
 * ```
 */
export const font = declProp<CssPropertyValue>('font');

/**
 * Sets font family (comma-separated list with optional generic family).
 *
 * - font family names, e.g. `"Inter", sans-serif`
 */
export const fontFamily = declProp<CssPropertyValue>('font-family');

/**
 * Sets font style.
 *
 * - `normal`
 * - `italic` — cursive
 * - `oblique` — synthetic slant
 */
export const fontStyle = declProp<'normal' | 'italic' | 'oblique' | CssPropertyValue>('font-style');

/**
 * Sets font size.
 *
 * - absolute: `xx-small` | `x-small` | `small` | `medium` | `large` | `x-large` | `xx-large` | `xxx-large`
 * - relative: `larger` | `smaller`
 * - `<length>` | `<percentage>` — relative to parent font size
 */
export const fontSize = declProp<CssPropertyValue>('font-size');

/**
 * Sets font weight (thickness).
 *
 * - `normal` (400) | `bold` (700)
 * - `bolder` / `lighter` — relative to parent
 * - `100` (Thin) | `200` (Extra Light) | `300` (Light) | `400` (Normal) | `500` (Medium)
 * - `600` (Semi Bold) | `700` (Bold) | `800` (Extra Bold) | `900` (Black)
 */
export const fontWeight = declProp<
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | CssPropertyValue
>('font-weight');

/**
 * Sets font stretch (how condensed or expanded the glyphs are).
 *
 * - `normal` (100%)
 * - `semi-condensed` (75%) | `condensed` (50%) | `extra-condensed` (62.5%) | `ultra-condensed` (50%)
 * - `semi-expanded` (112.5%) | `expanded` (125%) | `extra-expanded` (150%) | `ultra-expanded` (200%)
 * - `<percentage>`
 */
export const fontStretch = declProp<
  | 'normal'
  | 'semi-condensed'
  | 'condensed'
  | 'extra-condensed'
  | 'ultra-condensed'
  | 'semi-expanded'
  | 'expanded'
  | 'extra-expanded'
  | 'ultra-expanded'
  | CssPropertyValue
>('font-stretch');

/**
 * Sets font variant (typographic alternates).
 *
 * - `normal`
 * - `small-caps` — small uppercase letters, lowercase scaled up
 * - `all-small-caps` — all letters as small caps
 * - `petite-caps` | `unicase` | `titling-caps`
 */
export const fontVariant = declProp<
  | 'normal'
  | 'small-caps'
  | 'all-small-caps'
  | 'petite-caps'
  | 'unicase'
  | 'titling-caps'
  | CssPropertyValue
>('font-variant');

/**
 * Controls OpenType font features (ligatures, kerning, etc).
 *
 * - `normal` — use font defaults
 * - space-separated: `"liga" 1` (enable ligatures), `"kern" 1` (enable kerning)
 * - `"smcp" 1` (small caps), `"c2sc" 1` (capitals to small caps)
 * - `"onum" 1` (old-style numerals), `"tnum" 1` (tabular numerals)
 *
 * ```ts
 * fontFeatureSettings('"liga" 1, "kern" 1')
 * ```
 */
export const fontFeatureSettings = declProp<CssPropertyValue>('font-feature-settings');

/**
 * Controls optical sizing of variable fonts (adjusts for size-specific design).
 *
 * - `none` — disable optical sizing
 * - `auto` — let font decide based on size
 */
export const fontOpticalSizing = declProp<'none' | 'auto' | CssPropertyValue>(
  'font-optical-sizing',
);

/**
 * Controls variable font axis values (custom axes defined by the font).
 *
 * - `normal` — use font defaults
 * - comma-separated axis definitions: `"wght" 400, "slnt" -12`
 *
 * ```ts
 * fontVariationSettings('"wght" 700, "opsz" 24')
 * ```
 */
export const fontVariationSettings = declProp<CssPropertyValue>('font-variation-settings');

/**
 * Adjusts font size relative to x-height, useful for maintaining readable font size across different font families.
 *
 * - `none` — no adjustment
 * - `ex-height` — adjust based on x-height
 * - `cap-height` — adjust based on cap height
 * - `ic-width` — adjust based on ideographic width
 * - `ic-height`
 * - `<number>` — explicit ratio
 */
export const fontSizeAdjust = declProp<CssPropertyValue>('font-size-adjust');

/**
 * Sets whitespace handling.
 *
 * - `normal` — collapses whitespace, wraps at line breaks
 * - `nowrap` — collapses whitespace, no wrapping except at `<br>`
 * - `pre` — preserves whitespace, no wrapping (like `<pre>`)
 * - `pre-wrap` — preserves whitespace, wraps at line opportunities
 * - `pre-line` — collapses spaces but preserves newlines
 * - `break-spaces` — like pre-wrap but trailing spaces cause breaks
 */
export const whitespace = declProp<
  'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | CssPropertyValue
>('white-space');

/**
 * Sets hyphenation behavior.
 *
 * - `manual` — only hyphenate where explicit hyphens exist
 * - `auto` — browser decides where to hyphenate
 * - `none` — no hyphenation
 */
export const hyphens = declProp<'manual' | 'auto' | 'none' | CssPropertyValue>('hyphens');

/**
 * Sets width of tab characters.
 *
 * - `<number>` — multiples of space width (default `8`)
 * - `<length>`
 */
export const tabSize = declProp<CssPropertyValue>('tab-size');

/**
 * Sets line height (distance between lines of text).
 *
 * - `normal` — browser default (typically ~1.2)
 * - `<number>` — unitless multiplier of font size
 * - `<length>` | `<percentage>` — of font size
 */
export const lineHeight = declProp<CssPropertyValue>('line-height');

/**
 * Sets text decoration (underline, overline, line-through, or combination).
 *
 * - `none`
 * - `underline` — line below
 * - `overline` — line above
 * - `line-through` — strikethrough
 * - `blink` — deprecated
 * - `<color>` — defaults to currentColor
 *
 * ```ts
 * textDecoration('underline dashed red')
 * ```
 */
export const textDecoration = declProp<CssPropertyValue>('text-decoration');

/**
 * Sets horizontal text alignment.
 *
 * - `start` — inline-start edge (LTR = left)
 * - `end` — inline-end edge (LTR = right)
 * - `left` | `right` | `center`
 * - `justify` — stretches lines to fill width, last line left-aligned
 * - `justify-all` — justify all lines including last
 * - `match-parent` — inherit with parent's resolved value
 */
export const textAlign = declProp<
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'justify-all'
  | 'match-parent'
  | CssPropertyValue
>('text-align');

/**
 * Sets overflow behavior for text that doesn't fit its container.
 *
 * - `clip` — hard clip at container edge
 * - `ellipsis` — shows `...` when text overflows
 * - `<string>` — custom overflow string
 */
export const textOverflow = declProp<'clip' | 'ellipsis' | CssPropertyValue>('text-overflow');

/**
 * Sets text wrapping behavior.
 *
 * - `normal` — wraps at soft wrap opportunities
 * - `wrap` — always wrap
 * - `nowrap` — no wrapping
 * - `balance` — even line lengths, max 6 lines (good for headlines)
 * - `pretty` — optimized for readability, may add hyphens (max 6 lines)
 * - `stable` — wrap doesn't change during editing
 */
export const textWrap = declProp<
  'normal' | 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable' | CssPropertyValue
>('text-wrap');

/**
 * Sets text transformation.
 *
 * - `none`
 * - `capitalize` — first letter of each word uppercase
 * - `uppercase` — all letters uppercase
 * - `lowercase` — all letters lowercase
 * - `full-width` — full-width variants, for CJK compatibility
 * - `full-size-kana` — converts small kana to normal size
 */
export const textTransform = declProp<
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'full-width'
  | 'full-size-kana'
  | CssPropertyValue
>('text-transform');

/**
 * Sets text shadow.
 *
 * - `none`
 * - `[inset]? <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>?`
 * - blur radius makes shadow softer, spread radius expands/contracts it
 *
 * ```ts
 * textShadow('1px 1px 2px rgba(0,0,0,0.5)')
 * ```
 */
export const textShadow = declProp<CssPropertyValue>('text-shadow');

/**
 * Sets indentation of the first line.
 *
 * - `<length>` | `<percentage>`
 * - `each-line` — indent each line after first
 * - `hanging` — outdent all lines
 * - `hanging each-line`
 *
 * ```ts
 * textIndent('2em')
 * textIndent('hanging 2em')
 * ```
 */
export const textIndent = declProp<CssPropertyValue>('text-indent');

/**
 * Sets text-decoration line style.
 *
 * - `none`
 * - `underline` | `overline` | `line-through` | `blink` (deprecated)
 * - values can be combined, e.g. `'underline overline'`
 */
export const textDecorationLine = declProp<
  'none' | 'underline' | 'overline' | 'line-through' | 'blink' | CssPropertyValue
>('text-decoration-line');

/**
 * Sets text-decoration line style.
 *
 * - `solid` | `double` | `dotted` | `dashed` | `wavy`
 */
export const textDecorationStyle = declProp<
  'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | CssPropertyValue
>('text-decoration-style');

/**
 * Sets text-decoration color.
 *
 * - CSS `<color>` value (defaults to `currentColor`)
 */
export const textDecorationColor = declProp<CssPropertyValue>('text-decoration-color');

/**
 * Sets text-decoration thickness.
 *
 * - `auto` — browser default
 * - `from-font` — use font's recommended thickness
 * - `<length>` | `<percentage>` — of font size
 */
export const textDecorationThickness = declProp<CssPropertyValue>('text-decoration-thickness');

/**
 * Sets underline position.
 *
 * - `auto` — browser decides
 * - `under` — below baseline, avoids descenders
 * - `from-font` — use font metric
 * - `<length>` | `<percentage>`
 */
export const textUnderlinePosition = declProp<CssPropertyValue>('text-underline-position');

/**
 * Sets text rendering optimization.
 *
 * - `auto` — browser default
 * - `optimizeSpeed` — fastest rendering
 * - `optimizeLegibility` — antialiased, better for readable text
 * - `geometricPrecision` — precise subpixel positioning
 */
export const textRendering = declProp<
  'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision' | CssPropertyValue
>('text-rendering');

/**
 * Sets text justification behavior.
 *
 * - `auto` — browser default
 * - `inter-word` — adjusts word spacing
 * - `inter-character` — adjusts letter spacing, used for CJK
 * - `none` — no justification
 */
export const textJustify = declProp<
  'auto' | 'inter-word' | 'inter-character' | 'none' | CssPropertyValue
>('text-justify');

/**
 * Sets spacing between characters.
 *
 * - `normal` — default spacing
 * - `<length>` | `<percentage>` — of font size
 */
export const letterSpacing = declProp<CssPropertyValue>('letter-spacing');

/**
 * Sets spacing between words.
 *
 * - `normal` — default spacing
 * - `<length>` | `<percentage>` — of font size
 */
export const wordSpacing = declProp<CssPropertyValue>('word-spacing');

/**
 * Sets line break behavior within CJK text.
 *
 * - `auto` — browser default
 * - `loose` — most permissive, for short lines
 * - `normal` — standard
 * - `strict` — most restrictive
 * - `anywhere` — break at any opportunity, ignores CJK rules
 */
export const lineBreak = declProp<
  'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | CssPropertyValue
>('line-break');

/**
 * Sets whether words may break across lines when exceeding container width.
 *
 * - `normal` — break only at normal line break points
 * - `break-word` — deprecated, same as `overflow-wrap: break-word`
 * - `anywhere` — break at any character if needed, including mid-word
 */
export const overflowWrap = declProp<'normal' | 'break-word' | 'anywhere' | CssPropertyValue>(
  'overflow-wrap',
);

/**
 * Sets word break behavior.
 *
 * - `normal` — CJK breaks between characters, Latin only at normal break points
 * - `break-all` — allows breaks at any character
 * - `keep-all` — no CJK line breaks, only normal Latin breaks
 * - `auto-phrase` — avoids breaks within phrases
 */
export const wordBreak = declProp<
  'normal' | 'break-all' | 'keep-all' | 'auto-phrase' | CssPropertyValue
>('word-break');

/**
 * Adjusts text size to prevent layout reflow on viewport width changes.
 * Returns vendor-prefixed and standard properties.
 *
 * - `auto` — browser default, may scale text on viewport change
 * - `none` — prevent text size adjustment
 * - `<percentage>` | `<length>`
 */
export const textSizeAdjust = declProp<CssPropertyValue>('text-size-adjust');

/**
 * Sets hanging punctuation for typographic alignment (pulls quote marks and bullets into margin).
 *
 * - `none`
 * - `first` — hangs opening quote
 * - `last` — hangs closing quote
 * - `allow-end` — hangs ending punctuation if it fits
 * - `force-end` — always hangs ending
 */
export const hangingPunctuation = declProp<CssPropertyValue>('hanging-punctuation');

/**
 * Controls font smoothing on macOS WebKit.
 *
 * - `auto` — browser default
 * - `antialiased` — smoother, no subpixel rendering
 * - `subpixel-antialiased` — crisper on non-retina displays
 */
export const webkitFontSmoothing = declProp<CssPropertyValue>('-webkit-font-smoothing');

/**
 * Sets the color of the tap highlight on mobile (shown on tap/click).
 *
 * - CSS color value
 * - `transparent` — remove highlight
 */
export const webkitTapHighlightColor = declProp<CssPropertyValue>('-webkit-tap-highlight-color');

/**
 * Sets text orientation (for vertical writing modes).
 *
 * - `mixed` — horizontal glyphs in vertical, default
 * - `upright` — vertical glyphs, upright
 * - `sideways` — rotated 90deg
 * - `sideways-right` | `use-glyph-orientation`
 */
export const textOrientation = declProp<
  'mixed' | 'upright' | 'sideways' | 'sideways-right' | 'use-glyph-orientation' | CssPropertyValue
>('text-orientation');

/**
 * Sets text emphasis marks and position (combined shorthand).
 *
 * - `none`
 * - `<style> <color>?` — style: `dot`, `circle`, `double-circle`, `triangle`, `sesame`
 * - emphasis position: `over` (above) | `under` (below) + `right` | `left`
 *
 * ```ts
 * textEmphasis('filled red over')
 * ```
 */
export const textEmphasis = declProp<CssPropertyValue>('text-emphasis');

/**
 * Sets text emphasis color.
 *
 * - CSS `<color>` value
 */
export const textEmphasisColor = declProp<CssPropertyValue>('text-emphasis-color');

/**
 * Sets text emphasis position (above or below text).
 *
 * - `over` — above text (default)
 * - `under` — below text
 * - `left` | `right` — for vertical writing
 */
export const textEmphasisPosition = declProp<CssPropertyValue>('text-emphasis-position');

/**
 * Sets text emphasis style.
 *
 * - `none`
 * - `filled` | `open`
 * - `dot` | `circle` | `double-circle` | `triangle` | `sesame`
 */
export const textEmphasisStyle = declProp<CssPropertyValue>('text-emphasis-style');

/**
 * Sets what the text-decoration line should skip (for long text decorations).
 *
 * - `none`
 * - `objects` — skip inline boxes
 * - `spaces` — skip whitespace
 * - `edges` — skip edges of box
 * - `box-decoration` — skip box decoration
 * - `leading-spaces` | `trailing-spaces`
 */
export const textDecorationSkip = declProp<CssPropertyValue>('text-decoration-skip');

/**
 * Sets whether text-decoration should skip ink (descenders) when underlining.
 *
 * - `auto` — browser decides
 * - `ink` — skip ink (modern default)
 * - `no-ink` — don't skip ink
 * - `objects` — skip inline boxes
 */
export const textDecorationSkipInk = declProp<CssPropertyValue>('text-decoration-skip-ink');

/**
 * Sets line clamp (limits text to N lines with ellipsis).
 * Returns vendor-prefixed properties.
 *
 * - `none` — no clamping
 * - `<integer>` — max number of lines
 *
 * ```ts
 * lineClamp('3')
 * ```
 */
export const lineClamp = declProp<CssPropertyValue>('line-clamp');

/**
 * Sets text-box-trim (removes whitespace above/below text).
 *
 * - `none` — no trimming
 * - `both` — trim both top and bottom
 * - `top` — trim above
 * - `bottom` — trim below
 * - `text` — trim to text metrics
 * - `ex` | `cap` | `alphabetic` | `leading` | `text-edge`
 *
 * ```ts
 * textBoxTrim('both')
 * ```
 */
export const textBoxTrim = declProp<CssPropertyValue>('text-box-trim');

/**
 * Sets text-box-edge (specifies trim edges for text-box-trim).
 *
 * - `auto`
 * - `<text-over-trim> <text-under-trim>` — e.g. `cap alphabetic`
 */
export const textBoxEdge = declProp<CssPropertyValue>('text-box-edge');

/**
 * Sets initial letter styling (drop caps, raised caps).
 *
 * - `normal`
 * - `<number>` — line box multiples
 * - `<number> <number>` — size and sink
 *
 * ```ts
 * initialLetter('3')
 * initialLetter('3 2')
 * ```
 */
export const initialLetter = declProp<CssPropertyValue>('initial-letter');

/**
 * Sets whether element is treated as inline or block for text formatting.
 *
 * - `auto` | `isolate` | `isolate-override` | `plaintext` | `normal`
 */
export const unicodeBidiInline = declProp<CssPropertyValue>('unicode-bidi');

// Font

/** `font-weight: 700` — bold weight. */
export const BOLD = fontWeight('700');
/** `font-style: italic` — italic style. */
export const ITALIC = fontStyle('italic');

// Text

/** `text-align: left` — align text to the start edge. */
export const TEXT_LEFT = textAlign('left');
/** `text-align: center` — center-align text. */
export const TEXT_CENTER = textAlign('center');
/** `text-align: right` — align text to the end edge. */
export const TEXT_RIGHT = textAlign('right');
/** `text-decoration: underline` — add underline. */
export const UNDERLINE = textDecoration('underline');
/** `text-decoration: line-through` — add strikethrough. */
export const LINE_THROUGH = textDecoration('line-through');
/** `white-space: nowrap` — prevent text wrapping. */
export const NOWRAP = whitespace('nowrap');
