import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Shorthand to set all CSS properties at once.
 */
export const all = declProp<CssPropertyValue>('all');

/**
 * Hints to the browser which properties will be animated.
 * Set before `transition` or `animation` so the browser can optimize ahead of time.
 *
 * - `transform`
 * - `opacity`
 * - `scroll-position`
 * - `contents`
 */
export const willChange = declProp<CssPropertyValue>('will-change');

/**
 * Sets text directionality.
 *
 * - `ltr` — left-to-right (default for Latin scripts)
 * - `rtl` — right-to-left (Arabic, Hebrew, etc.)
 */
export const direction = declProp<'ltr' | 'rtl' | CssPropertyValue>('direction');

/**
 * Indicates preferred color scheme for user agent UI.
 *
 * - `normal` — no preference
 * - `light` — light mode
 * - `dark` — dark mode
 * - `light dark` — supports both schemes
 * - `only light` / `only dark` — restrict to single scheme
 */
export const colorScheme = declProp<
  'normal' | 'light' | 'dark' | 'light dark' | 'only light' | 'only dark' | CssPropertyValue
>('color-scheme');

/**
 * Sets cursor appearance on hover.
 *
 * - `auto` — browser default
 * - `default` — arrow
 * - `pointer` — hand
 * - `text` — I-beam
 * - `wait` — spinner
 * - `help` — question mark
 * - `not-allowed` — blocked
 * - `grab` / `grabbing` — open/closed hand
 * - `crosshair`, `move`, `cell`, `context-menu`, `progress`, `alias`, `copy`, `no-drop`
 * - directional: `e-resize`, `n-resize`, `ne-resize`, etc.
 * - `zoom-in` / `zoom-out`
 * - `url(path.png), pointer` — custom image with fallback
 */
export const cursor = declProp<
  | 'auto'
  | 'default'
  | 'pointer'
  | 'text'
  | 'wait'
  | 'help'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'crosshair'
  | 'move'
  | 'cell'
  | 'context-menu'
  | 'progress'
  | 'alias'
  | 'copy'
  | 'no-drop'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ns-resize'
  | 'ew-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'zoom-in'
  | 'zoom-out'
  | 'col-resize'
  | 'row-resize'
  | CssPropertyValue
>('cursor');

/**
 * Sets whether an element responds to pointer events.
 *
 * - `auto` — responds (default)
 * - `none` — ignores all events, event passes through
 * - `visiblePainted` / `visibleFill` / `visibleStroke` / `visible` — visible + painted/fill/stroke
 * - `painted` / `fill` / `stroke` — painted/fill/stroke regardless of visibility
 * - `all` — responds to all events
 */
export const pointerEvents = declProp<
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | CssPropertyValue
>('pointer-events');

/**
 * Sets touch action behavior for panning/zooming on touch devices.
 *
 * - `auto` — browser default
 * - `none` — no gestures, JS handles all
 * - `pan-x` — horizontal scroll only
 * - `pan-y` — vertical scroll only
 * - `pan-left` / `pan-right` / `pan-up` / `pan-down` — directional panning
 * - `pinch-zoom` — allows pinch zoom
 * - `manipulation` — pan + pinch zoom, no double-tap zoom
 */
export const touchAction = declProp<
  | 'auto'
  | 'none'
  | 'pan-x'
  | 'pan-left'
  | 'pan-right'
  | 'pan-y'
  | 'pan-up'
  | 'pan-down'
  | 'pinch-zoom'
  | 'manipulation'
  | CssPropertyValue
>('touch-action');

/**
 * Controls whether user can select text.
 *
 * - `auto` — browser default, usually selectable
 * - `text` — selectable
 * - `none` — not selectable, clicks pass through
 * - `all` — entire element as one selection
 * - `contain` — selection limited to element contents
 */
export const userSelect = declProp<
  'auto' | 'text' | 'none' | 'all' | 'contain' | CssPropertyValue
>('user-select');

/**
 * Controls native appearance of form controls and UI widgets.
 *
 * - `none` — strips native styling, full CSS control
 * - `auto` — browser default appearance
 * - `menulist-button` — drop-down arrow only
 */
export const appearance = declProp<
  'none' | 'auto' | 'menulist-button' | CssPropertyValue
>('appearance');

/**
 * Creates a new stacking context and isolation from outside scope.
 * Useful for scoping `mix-blend-mode` and `z-index`.
 *
 * - `auto` — no isolation
 * - `isolate` — creates new stacking context
 */
export const isolation = declProp<'auto' | 'isolate' | CssPropertyValue>('isolation');

/**
 * Sets box model calculation method.
 *
 * - `content-box` — width/height = content only, padding/border added outside
 * - `border-box` — width/height = content + padding + border
 */
export const boxSizing = declProp<'content-box' | 'border-box' | CssPropertyValue>('box-sizing');

/**
 * Sets generated content for pseudo-elements (`::before`, `::after`).
 *
 * - `normal` / `none`
 * - `"string"` — literal text
 * - `attr(data-text)` — insert attribute value
 * - `counter()` — insert counter value
 * - `open-quote` / `close-quote`
 */
export const content = declProp<CssPropertyValue>('content');

// Interaction

/** `cursor: pointer` — hand cursor for interactive elements. */
export const CURSOR_POINTER = cursor('pointer');
/** `pointer-events: none` — element ignores all pointer events. */
export const POINTER_EVENTS_NONE = pointerEvents('none');
/** `pointer-events: auto` — element responds to pointer events (default). */
export const POINTER_EVENTS_AUTO = pointerEvents('auto');
/** `user-select: none` — prevents text selection. */
export const USER_SELECT_NONE = userSelect('none');
/** `isolation: isolate` — creates a new stacking context. */
export const ISOLATE = isolation('isolate');
/** `appearance: none` — removes native UI styling from form controls. */
export const APPEARANCE_NONE = appearance('none');
/** `box-sizing: border-box` — padding and border included in element width/height. */
export const BORDER_BOX = boxSizing('border-box');
