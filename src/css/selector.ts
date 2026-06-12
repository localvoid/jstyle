import type { CssClassId, CssIdent } from './core.js';

export type CssSelectorCombinator = ' ' | '>' | '+' | '~';

export type CssSelectorPart =
  | { type: 'tag'; name: string }
  | { type: 'universal' }
  | { type: 'self' }
  | { type: 'id'; id: string | CssIdent }
  | { type: 'class'; id: string | CssClassId }
  | { type: 'attr'; name: string; op?: string; value?: string }
  | { type: 'pseudo-class'; name: string; args?: CssSelectorQuery }
  | { type: 'pseudo-element'; name: string; args?: CssSelectorQuery }
  | { type: 'combinator'; combinator: CssSelectorCombinator };

/** Selector query: a CssSelector or array of queries (comma-separated). */
export type CssSelectorQuery = string | CssSelector | CssSelectorQuery[];

// Compound Selector hierarchy:
// type ➔ id ➔ class ➔ attribute ➔ pseudo-class ➔ pseudo-element

export interface CssBaseSelector {
  readonly parts: CssSelectorPart[];

  descendant(other: CssSelector): CssBaseSelector;
  child(other: CssSelector): CssBaseSelector;
  nextSibling(other: CssSelector): CssBaseSelector;
  sibling(other: CssSelector): CssBaseSelector;
}
export interface CssPseudoElementSelector extends CssBaseSelector {
  get before(): CssPseudoElementSelector;
  get after(): CssPseudoElementSelector;
  get backdrop(): CssPseudoElementSelector;
  get firstLetter(): CssPseudoElementSelector;
  get firstLine(): CssPseudoElementSelector;
  get selection(): CssPseudoElementSelector;
  get placeholder(): CssPseudoElementSelector;
  get marker(): CssPseudoElementSelector;
  get cue(): CssPseudoElementSelector;
  get webkitScrollbar(): CssPseudoElementSelector;
  get targetText(): CssPseudoElementSelector;
  get spellingError(): CssPseudoElementSelector;
  get grammarError(): CssPseudoElementSelector;
  get viewTransitionGroup(): CssPseudoElementSelector;
  get viewTransitionImagePair(): CssPseudoElementSelector;
  get viewTransitionOld(): CssPseudoElementSelector;
  get viewTransitionNew(): CssPseudoElementSelector;
  get fileSelectorButton(): CssPseudoElementSelector;

  highlight(v: string): CssPseudoElementSelector;
  part(name: string): CssPseudoElementSelector;
  slotted(name: string): CssPseudoElementSelector;
}

export interface CssPseudoClassSelector extends CssPseudoElementSelector {
  get hover(): CssPseudoClassSelector;
  get active(): CssPseudoClassSelector;
  get focus(): CssPseudoClassSelector;
  get focusVisible(): CssPseudoClassSelector;
  get focusWithin(): CssPseudoClassSelector;
  get firstChild(): CssPseudoClassSelector;
  get lastChild(): CssPseudoClassSelector;
  get firstOfType(): CssPseudoClassSelector;
  get lastOfType(): CssPseudoClassSelector;
  get disabled(): CssPseudoClassSelector;
  get readOnly(): CssPseudoClassSelector;
  get readWrite(): CssPseudoClassSelector;
  get checked(): CssPseudoClassSelector;
  get indeterminate(): CssPseudoClassSelector;
  get valid(): CssPseudoClassSelector;
  get invalid(): CssPseudoClassSelector;
  get required(): CssPseudoClassSelector;
  get optional(): CssPseudoClassSelector;
  get fullscreen(): CssPseudoClassSelector;
  get anyLink(): CssPseudoClassSelector;
  get link(): CssPseudoClassSelector;
  get visited(): CssPseudoClassSelector;
  get autofill(): CssPseudoClassSelector;
  get placeholderShown(): CssPseudoClassSelector;
  get inRange(): CssPseudoClassSelector;
  get outOfRange(): CssPseudoClassSelector;
  get userValid(): CssPseudoClassSelector;
  get userInvalid(): CssPseudoClassSelector;
  get blank(): CssPseudoClassSelector;
  get pictureInPicture(): CssPseudoClassSelector;

  nthChild(a: number, b?: number): CssPseudoClassSelector;
  nthLastChild(a: number, b?: number): CssPseudoClassSelector;
  nthOfType(a: number, b?: number): CssPseudoClassSelector;
  nthLastOfType(a: number, b?: number): CssPseudoClassSelector;

  dir(v: string): CssPseudoClassSelector;
  lang(v: string): CssPseudoClassSelector;
  has(args: CssSelectorQuery): CssPseudoClassSelector;
  is(args: CssSelectorQuery): CssPseudoClassSelector;
  where(args: CssSelectorQuery): CssPseudoClassSelector;
  not(args: CssSelectorQuery): CssPseudoClassSelector;
}
export interface CssAttrSelector extends CssPseudoClassSelector {
  attr(name: string): CssAttrSelector;
  attr(name: string, value: string, op: string): CssAttrSelector;
}
export interface CssClassSelector extends CssAttrSelector {
  class(id: string | CssClassId): CssClassSelector;
}
export interface CssIdSelector extends CssClassSelector {
  id(id: string | CssIdent): CssIdSelector;
}
export interface CssTypeSelector extends CssIdSelector {}

export class CssSelector implements CssTypeSelector {
  readonly parts: CssSelectorPart[];

  constructor(parts: CssSelectorPart[] = []) {
    this.parts = parts;
  }

  id(id: string | CssIdent) {
    return new CssSelector([...this.parts, { type: 'id', id }]);
  }

  class(id: string | CssClassId) {
    return new CssSelector([...this.parts, { type: 'class', id }]);
  }

  attr(name: string, value?: string, op: string = '=') {
    return new CssSelector([...this.parts, { type: 'attr', name, op, value }]);
  }

  _withPseudoClass(name: string, args?: CssSelectorQuery) {
    return new CssSelector([...this.parts, { type: 'pseudo-class', name, args }]);
  }

  _withPseudoElement(name: string, args?: CssSelectorQuery) {
    return new CssSelector([...this.parts, { type: 'pseudo-element', name, args }]);
  }

  get hover() {
    return this._withPseudoClass('hover');
  }
  get active() {
    return this._withPseudoClass('active');
  }
  get focus() {
    return this._withPseudoClass('focus');
  }
  get focusVisible() {
    return this._withPseudoClass('focus-visible');
  }
  get focusWithin() {
    return this._withPseudoClass('focus-within');
  }
  get firstChild() {
    return this._withPseudoClass('first-child');
  }
  get lastChild() {
    return this._withPseudoClass('last-child');
  }
  get firstOfType() {
    return this._withPseudoClass('first-of-type');
  }
  get lastOfType() {
    return this._withPseudoClass('last-of-type');
  }
  get disabled() {
    return this._withPseudoClass('disabled');
  }
  get readOnly() {
    return this._withPseudoClass('read-only');
  }
  get readWrite() {
    return this._withPseudoClass('read-write');
  }
  get checked() {
    return this._withPseudoClass('checked');
  }
  get indeterminate() {
    return this._withPseudoClass('indeterminate');
  }
  get valid() {
    return this._withPseudoClass('valid');
  }
  get invalid() {
    return this._withPseudoClass('invalid');
  }
  get required() {
    return this._withPseudoClass('required');
  }
  get optional() {
    return this._withPseudoClass('optional');
  }
  get fullscreen() {
    return this._withPseudoClass('fullscreen');
  }
  get anyLink() {
    return this._withPseudoClass('any-link');
  }
  get link() {
    return this._withPseudoClass('link');
  }
  get visited() {
    return this._withPseudoClass('visited');
  }
  get autofill() {
    return this._withPseudoClass('autofill');
  }
  get placeholderShown() {
    return this._withPseudoClass('placeholder-shown');
  }
  get inRange() {
    return this._withPseudoClass('in-range');
  }
  get outOfRange() {
    return this._withPseudoClass('out-of-range');
  }
  get userValid() {
    return this._withPseudoClass('user-valid');
  }
  get userInvalid() {
    return this._withPseudoClass('user-invalid');
  }
  get blank() {
    return this._withPseudoClass('blank');
  }
  get pictureInPicture() {
    return this._withPseudoClass('picture-in-picture');
  }

  nthChild(a: number, b: number = 0) {
    return this._withPseudoClass(`nth-child`, anb(a, b));
  }
  nthLastChild(a: number, b: number = 0) {
    return this._withPseudoClass(`nth-last-child`, anb(a, b));
  }
  nthOfType(a: number, b: number = 0) {
    return this._withPseudoClass(`nth-of-type`, anb(a, b));
  }
  nthLastOfType(a: number, b: number = 0) {
    return this._withPseudoClass(`nth-last-of-type`, anb(a, b));
  }

  dir(v: string) {
    return this._withPseudoClass(`dir`, v);
  }
  lang(v: string) {
    return this._withPseudoClass(`lang`, v);
  }
  has(args: CssSelectorQuery) {
    return this._withPseudoClass('has', args);
  }
  is(args: CssSelectorQuery) {
    return this._withPseudoClass('is', args);
  }
  where(args: CssSelectorQuery) {
    return this._withPseudoClass('where', args);
  }
  not(args: CssSelectorQuery) {
    return this._withPseudoClass('not', args);
  }

  get before() {
    return this._withPseudoElement('before');
  }
  get after() {
    return this._withPseudoElement('after');
  }
  get backdrop() {
    return this._withPseudoElement('backdrop');
  }
  get firstLetter() {
    return this._withPseudoElement('first-letter');
  }
  get firstLine() {
    return this._withPseudoElement('first-line');
  }
  get selection() {
    return this._withPseudoElement('selection');
  }
  get placeholder() {
    return this._withPseudoElement('placeholder');
  }
  get marker() {
    return this._withPseudoElement('marker');
  }
  get cue() {
    return this._withPseudoElement('cue');
  }
  get webkitScrollbar() {
    return this._withPseudoElement('-webkit-scrollbar');
  }
  get targetText() {
    return this._withPseudoElement('target-text');
  }
  get spellingError() {
    return this._withPseudoElement('spelling-error');
  }
  get grammarError() {
    return this._withPseudoElement('grammar-error');
  }
  get viewTransitionGroup() {
    return this._withPseudoElement('view-transition-group');
  }
  get viewTransitionImagePair() {
    return this._withPseudoElement('view-transition-image-pair');
  }
  get viewTransitionOld() {
    return this._withPseudoElement('view-transition-old');
  }
  get viewTransitionNew() {
    return this._withPseudoElement('view-transition-new');
  }
  get fileSelectorButton() {
    return this._withPseudoElement('file-selector-button');
  }

  highlight(v: string) {
    return this._withPseudoElement(`::highlight`, v);
  }
  part(name: string) {
    return this._withPseudoElement(`::part`, name);
  }
  slotted(name: string) {
    return this._withPseudoElement(`::slotted`, name);
  }

  descendant(other: CssSelector) {
    return new CssSelector([
      ...this.parts,
      { type: 'combinator', combinator: ' ' },
      ...other.parts,
    ]);
  }

  child(other: CssSelector) {
    return new CssSelector([
      ...this.parts,
      { type: 'combinator', combinator: '>' },
      ...other.parts,
    ]);
  }

  nextSibling(other: CssSelector) {
    return new CssSelector([
      ...this.parts,
      { type: 'combinator', combinator: '+' },
      ...other.parts,
    ]);
  }

  sibling(other: CssSelector) {
    return new CssSelector([
      ...this.parts,
      { type: 'combinator', combinator: '~' },
      ...other.parts,
    ]);
  }
}

function anb(a: number, b: number) {
  if (a === 0) return `${b}`;
  if (b === 0) return a === 1 ? 'n' : `${a}n`;
  return `${a}n${b > 0 ? '+' : ''}${b}`;
}

export const q = {
  get self(): CssSelector {
    return new CssSelector([{ type: 'self' }]);
  },

  get universal(): CssSelector {
    return new CssSelector([{ type: 'universal' }]);
  },

  tag(name: string): CssTypeSelector {
    return new CssSelector([{ type: 'tag', name }]);
  },

  id(id: string | CssIdent): CssIdSelector {
    return new CssSelector([{ type: 'id', id }]);
  },

  class(id: string | CssClassId): CssClassSelector {
    return new CssSelector([{ type: 'class', id }]);
  },
};
