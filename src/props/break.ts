import { declProp, type CssPropertyValue } from '../css/core.js';

/**
 * Sets page/column break before an element.
 *
 * - `auto` — browser decides
 * - `avoid` — prevent break inside/near
 * - `always` — always force break
 * - `all` — force break on all pages/columns
 * - `page` — break before a page
 * - `recto` — right page in two-sided
 * - `verso` — left page
 * - `left` | `right`
 */
export const breakBefore = declProp<
  | 'auto'
  | 'avoid'
  | 'always'
  | 'all'
  | 'page'
  | 'recto'
  | 'verso'
  | 'left'
  | 'right'
  | CssPropertyValue
>('break-before');

/**
 * Sets page/column break after an element.
 *
 * - `auto` | `avoid` | `always` | `all` | `page` | `recto` | `verso` | `left` | `right`
 */
export const breakAfter = declProp<
  | 'auto'
  | 'avoid'
  | 'always'
  | 'all'
  | 'page'
  | 'recto'
  | 'verso'
  | 'left'
  | 'right'
  | CssPropertyValue
>('break-after');

/**
 * Sets page/column break behavior inside an element.
 *
 * - `auto` — browser decides
 * - `avoid` — avoid breaking inside
 * - `avoid-page` | `avoid-column` | `avoid-region` — specific type avoidance
 */
export const breakInside = declProp<
  'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | CssPropertyValue
>('break-inside');
