import { CssProperty, CssPropertyTemplate, type CssPropertyTemplateValue } from './css/core.js';

export { CssProperty, CssPropertyTemplate };
export type { CssPropertyTemplateValue } from './css/core.js';

/** Creates a CSS property template for use in selectors. */
export const t = (
  strings: TemplateStringsArray,
  ...vars: CssPropertyTemplateValue[]
): CssPropertyTemplate => {
  const q = <CssPropertyTemplateValue[]>[];
  q.push(strings[0]);
  let i = 1;
  while (i < strings.length) {
    const v = vars[i++];
    q.push(v, strings[i]);
  }
  return new CssPropertyTemplate(q);
};

export * from './props/general.js';
export * from './props/typography.js';
export * from './props/color.js';
export * from './props/spacing.js';
export * from './props/positioning.js';
export * from './props/layout.js';
export * from './props/flex.js';
export * from './props/grid.js';
export * from './props/sizing.js';
export * from './props/background.js';
export * from './props/border.js';
export * from './props/overflow.js';
export * from './props/contain.js';
export * from './props/scroll.js';
export * from './props/transform.js';
export * from './props/animation.js';
export * from './props/transition.js';
export * from './props/table.js';
export * from './props/list.js';
export * from './props/column.js';
export * from './props/svg.js';
export * from './props/clip.js';
export * from './props/visibility.js';
export * from './props/break.js';
export * from './props/misc.js';
