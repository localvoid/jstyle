import type { CssNamespace } from './core.js';

/** A functional pseudo-class entry with a name and selector arguments. */
export class CssFunctionalPseudo {
  readonly name: string;
  readonly args: CssSelectorQuery;

  constructor(name: string, args: CssSelectorQuery) {
    this.name = name;
    this.args = args;
  }
}

/**
 * AnB notation for `:nth-child(an+b)` pseudo-class selectors.
 * Produces CSS like `2n+1`, `3n`, `odd`, `even`, or plain numbers.
 */
export class AnB {
  readonly a: number;
  readonly b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  toString(): string {
    if (this.a === 0) return `${this.b}`;
    if (this.b === 0) return this.a === 1 ? 'n' : `${this.a}n`;
    return `${this.a}n${this.b > 0 ? '+' : ''}${this.b}`;
  }
}

/** Creates an `an+b` value for `:nth-child()` and related pseudo-classes. */
export function anb(a: number, b: number): AnB {
  return new AnB(a, b);
}

export type CssCombinator = ' ' | '>' | '+' | '~';

export type CssSelectorPart =
  | { type: 'tag'; name: string }
  | { type: 'universal' }
  | { type: 'class'; ns: CssNamespace; id: string }
  | { type: 'attr'; name: string; op?: string; value?: string }
  | { type: 'pseudo-class'; name: string; args?: CssSelectorQuery }
  | { type: 'pseudo-element'; name: string };

/** Selector query: a CssSelector or array of queries (comma-separated). */
export type CssSelectorQuery = string | CssSelector | CssSelectorQuery[];

/**
 * Abstract base class for all CSS selectors.
 * Provides shared pseudo-class/pseudo-element getters and combinator methods.
 * Pseudo getters return `CssSelector` (stricter typing — class-specific methods like `join()` are lost).
 */
export abstract class CssSelector {
  readonly parts: CssSelectorPart[];
  readonly pseudo: (string | CssFunctionalPseudo)[];
  readonly combinator?: CssCombinator;
  readonly right?: CssSelector;

  protected constructor(
    parts: CssSelectorPart[] = [],
    pseudo: (string | CssFunctionalPseudo)[] = [],
    combinator?: CssCombinator,
    right?: CssSelector,
  ) {
    this.parts = parts;
    this.pseudo = pseudo;
    this.combinator = combinator;
    this.right = right;
  }

  abstract _withPseudo(name: string, args?: CssSelectorQuery): CssSelector;

  get hover(): CssSelector {
    return this._withPseudo(':hover');
  }
  get active(): CssSelector {
    return this._withPseudo(':active');
  }
  get focus(): CssSelector {
    return this._withPseudo(':focus');
  }
  get focusVisible(): CssSelector {
    return this._withPseudo(':focus-visible');
  }
  get focusWithin(): CssSelector {
    return this._withPseudo(':focus-within');
  }
  get firstChild(): CssSelector {
    return this._withPseudo(':first-child');
  }
  get lastChild(): CssSelector {
    return this._withPseudo(':last-child');
  }
  get firstOfType(): CssSelector {
    return this._withPseudo(':first-of-type');
  }
  get lastOfType(): CssSelector {
    return this._withPseudo(':last-of-type');
  }
  get disabled(): CssSelector {
    return this._withPseudo(':disabled');
  }
  get readOnly(): CssSelector {
    return this._withPseudo(':read-only');
  }
  get readWrite(): CssSelector {
    return this._withPseudo(':read-write');
  }
  get checked(): CssSelector {
    return this._withPseudo(':checked');
  }
  get indeterminate(): CssSelector {
    return this._withPseudo(':indeterminate');
  }
  get valid(): CssSelector {
    return this._withPseudo(':valid');
  }
  get invalid(): CssSelector {
    return this._withPseudo(':invalid');
  }
  get required(): CssSelector {
    return this._withPseudo(':required');
  }
  get optional(): CssSelector {
    return this._withPseudo(':optional');
  }
  get fullscreen(): CssSelector {
    return this._withPseudo(':fullscreen');
  }
  get anyLink(): CssSelector {
    return this._withPseudo(':any-link');
  }
  get link(): CssSelector {
    return this._withPseudo(':link');
  }
  get visited(): CssSelector {
    return this._withPseudo(':visited');
  }
  get autofill(): CssSelector {
    return this._withPseudo(':autofill');
  }
  get placeholderShown(): CssSelector {
    return this._withPseudo(':placeholder-shown');
  }
  get inRange(): CssSelector {
    return this._withPseudo(':in-range');
  }
  get outOfRange(): CssSelector {
    return this._withPseudo(':out-of-range');
  }
  get userValid(): CssSelector {
    return this._withPseudo(':user-valid');
  }
  get userInvalid(): CssSelector {
    return this._withPseudo(':user-invalid');
  }
  get blank(): CssSelector {
    return this._withPseudo(':blank');
  }
  get pictureInPicture(): CssSelector {
    return this._withPseudo(':picture-in-picture');
  }

  nthChild(anb: string | AnB): CssSelector {
    return this._withPseudo(`:nth-child(${String(anb)})`);
  }
  nthLastChild(anb: string | AnB): CssSelector {
    return this._withPseudo(`:nth-last-child(${String(anb)})`);
  }
  nthOfType(anb: string | AnB): CssSelector {
    return this._withPseudo(`:nth-of-type(${String(anb)})`);
  }
  nthLastOfType(anb: string | AnB): CssSelector {
    return this._withPseudo(`:nth-last-of-type(${String(anb)})`);
  }
  dir(v: string): CssSelector {
    return this._withPseudo(`:dir(${v})`);
  }
  lang(v: string): CssSelector {
    return this._withPseudo(`:lang(${v})`);
  }
  has(args: CssSelectorQuery): CssSelector {
    return this._withPseudo(':has', args);
  }
  is(args: CssSelectorQuery): CssSelector {
    return this._withPseudo(':is', args);
  }
  where(args: CssSelectorQuery): CssSelector {
    return this._withPseudo(':where', args);
  }
  not(args: CssSelectorQuery): CssSelector {
    return this._withPseudo(':not', args);
  }

  get before(): CssSelector {
    return this._withPseudo('::before');
  }
  get after(): CssSelector {
    return this._withPseudo('::after');
  }
  get backdrop(): CssSelector {
    return this._withPseudo('::backdrop');
  }
  get firstLetter(): CssSelector {
    return this._withPseudo('::first-letter');
  }
  get firstLine(): CssSelector {
    return this._withPseudo('::first-line');
  }
  get selection(): CssSelector {
    return this._withPseudo('::selection');
  }
  get placeholder(): CssSelector {
    return this._withPseudo('::placeholder');
  }
  get marker(): CssSelector {
    return this._withPseudo('::marker');
  }
  get cue(): CssSelector {
    return this._withPseudo('::cue');
  }
  get webkitScrollbar(): CssSelector {
    return this._withPseudo('::-webkit-scrollbar');
  }
  get targetText(): CssSelector {
    return this._withPseudo('::target-text');
  }
  get spellingError(): CssSelector {
    return this._withPseudo('::spelling-error');
  }
  get grammarError(): CssSelector {
    return this._withPseudo('::grammar-error');
  }
  get viewTransitionGroup(): CssSelector {
    return this._withPseudo('::view-transition-group');
  }
  get viewTransitionImagePair(): CssSelector {
    return this._withPseudo('::view-transition-image-pair');
  }
  get viewTransitionOld(): CssSelector {
    return this._withPseudo('::view-transition-old');
  }
  get viewTransitionNew(): CssSelector {
    return this._withPseudo('::view-transition-new');
  }
  get fileSelectorButton(): CssSelector {
    return this._withPseudo('::file-selector-button');
  }

  highlight(v: string): CssSelector {
    return this._withPseudo(`::highlight(${v})`);
  }
  part(name: string): CssSelector {
    return this._withPseudo(`::part(${name})`);
  }
  slotted(name: string): CssSelector {
    return this._withPseudo(`::slotted(${name})`);
  }

  descendant(other: CssSelector): CssComplexSelector {
    return new CssComplexSelector(this, ' ', other);
  }

  child(other: CssSelector): CssComplexSelector {
    return new CssComplexSelector(this, '>', other);
  }

  nextSibling(other: CssSelector): CssComplexSelector {
    return new CssComplexSelector(this, '+', other);
  }

  sibling(other: CssSelector): CssComplexSelector {
    return new CssComplexSelector(this, '~', other);
  }
}

/**
 * CSS class selector with namespace and id.
 * Created by `ns.class('name')`.
 */
export class CssClassSelector extends CssSelector {
  readonly ns: CssNamespace;
  readonly id: string;

  constructor(ns: CssNamespace, id: string, pseudo?: (string | CssFunctionalPseudo)[]) {
    super([], pseudo);
    this.ns = ns;
    this.id = id;
  }

  _withPseudo(name: string, args?: CssSelectorQuery): CssSelector {
    const pseudo = args === void 0 ? name : new CssFunctionalPseudo(name, args);
    return new CssClassSelector(
      this.ns,
      this.id,
      this.pseudo ? [...this.pseudo, pseudo] : [pseudo],
    );
  }

  join(name: string): CssClassSelector {
    return new CssClassSelector(this.ns, this.id + '_' + name, this.pseudo);
  }
}

/**
 * CSS element type selector (e.g., `div`, `span`).
 * Created by `div()`.
 */
export class CssElementSelector extends CssSelector {
  readonly tag: string;

  constructor(tag: string, pseudo?: (string | CssFunctionalPseudo)[]) {
    super([{ type: 'tag', name: tag }], pseudo);
    this.tag = tag;
  }

  _withPseudo(name: string, args?: CssSelectorQuery): CssSelector {
    const pseudo = args === void 0 ? name : new CssFunctionalPseudo(name, args);
    return new CssElementSelector(this.tag, this.pseudo ? [...this.pseudo, pseudo] : [pseudo]);
  }

  class(c: CssClassSelector): CssCompoundSelector {
    return new CssCompoundSelector(
      [
        { type: 'tag', name: this.tag },
        { type: 'class', ns: c.ns, id: c.id },
      ],
      this.pseudo,
    );
  }

  attr(name: string): CssCompoundSelector;
  attr(name: string, value: string, op: string): CssCompoundSelector;
  attr(name: string, value?: string, op: string = '='): CssCompoundSelector {
    return new CssCompoundSelector(
      [
        { type: 'tag', name: this.tag },
        { type: 'attr', name, op, value },
      ],
      this.pseudo,
    );
  }
}

/**
 * CSS compound selector (multiple parts without whitespace).
 * Created by `.class()` or `.attr()` on element/compound selectors.
 */
export class CssCompoundSelector extends CssSelector {
  constructor(parts: CssSelectorPart[], pseudo?: (string | CssFunctionalPseudo)[]) {
    super(parts, pseudo);
  }

  _withPseudo(name: string, args?: CssSelectorQuery): CssSelector {
    const pseudo = args === void 0 ? name : new CssFunctionalPseudo(name, args);
    return new CssCompoundSelector(this.parts, this.pseudo ? [...this.pseudo, pseudo] : [pseudo]);
  }

  class(cls: CssClassSelector): CssCompoundSelector {
    return new CssCompoundSelector(
      [...this.parts, { type: 'class', ns: cls.ns, id: cls.id }],
      this.pseudo,
    );
  }

  addAttr(name: string): CssCompoundSelector {
    return new CssCompoundSelector([...this.parts, { type: 'attr', name }], this.pseudo);
  }

  addAttrValue(name: string, value: string, op: string = '='): CssCompoundSelector {
    return new CssCompoundSelector([...this.parts, { type: 'attr', name, op, value }], this.pseudo);
  }
}

/**
 * CSS complex selector (compound selectors connected by combinators).
 * Created by `.descendant()`, `.child()`, `.nextSibling()`, `.sibling()`.
 */
export class CssComplexSelector extends CssSelector {
  readonly left: CssSelector;
  override readonly combinator: CssCombinator;
  override readonly right: CssSelector;

  constructor(left: CssSelector, combinator: CssCombinator, right: CssSelector) {
    super([], []);
    this.left = left;
    this.combinator = combinator;
    this.right = right;
  }

  _withPseudo(name: string, args?: CssSelectorQuery): CssSelector {
    return new CssComplexSelector(this.left, this.combinator, this.right._withPseudo(name, args));
  }
}

/** Creates a `div` element type selector. */
export function div(): CssElementSelector {
  return new CssElementSelector('div');
}
