import type { CssSelector, CssSelectorQuery } from './selector.js';
import type { Size } from './size.js';
import { CssClassSelector } from './selector.js';

/**
 * CSS namespace for scoping class names, idents, and dashed idents.
 * Each namespace has a unique id used for serialization and class name mapping.
 */
export class CssNamespace {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Css Class
   */
  class(name: string): CssClassSelector {
    return new CssClassSelector(this, name);
  }

  /**
   * Ident.
   */
  ident(name: string): CssIdent {
    return new CssIdent(this, name);
  }

  /**
   * Dashed Ident.
   */
  dashedIdent(name: string): CssDashedIdent {
    return new CssDashedIdent(this, name);
  }

  /**
   * Creates a class map for state-based conditional class switching.
   * Class maps generate lookup tables that map state combinations to class names.
   */
  classMap(options: CssClassMapOptions): CssClassMap {
    return new CssClassMap(this, options);
  }
}

/** Shorthand for creating a {@link CssNamespace}. */
export function ns(id: string): CssNamespace {
  return new CssNamespace(id);
}

/**
 * CSS ident (custom identifier) used for values like animation names, layer names, etc.
 */
export class CssIdent {
  readonly ns: CssNamespace;
  readonly id: string;

  constructor(ns: CssNamespace, id: string) {
    this.ns = ns;
    this.id = id;
  }
}

/**
 * CSS dashed ident for custom properties (CSS variables) and @property rules.
 * Automatically prefixed with `--` when emitted.
 */
export class CssDashedIdent {
  readonly ns: CssNamespace;
  readonly id: string;

  constructor(ns: CssNamespace, id: string) {
    this.ns = ns;
    this.id = id;
  }

  prop(value: CssPropertyValue) {
    return new CssProperty(this, value);
  }
}

/** A CSS rule: style rule, at-rule, class map, or nested array of rules. */
export type CssRule = CssStyleRule | CssAtRule | CssClassMap | CssRule[];
/** A CSS AST node: nullable, a property, rule, class map, keyframe step, or nested array of nodes. */
export type CssNode =
  | null
  | undefined
  | false
  | CssProperty
  | CssRule
  | CssClassMap
  | CssKeyframeStep
  | CssNode[];

/** Valid CSS property value types. */
export type CssPropertyValue = (string & {}) | CssIdent | CssPropertyTemplate | Size;

/** A single CSS property declaration (key-value pair). */
export class CssProperty {
  readonly key: string | CssDashedIdent;
  readonly value: CssPropertyValue;
  readonly important: boolean;

  constructor(key: string | CssDashedIdent, value: CssPropertyValue, important = false) {
    this.key = key;
    this.value = value;
    this.important = important;
  }
}

/** Creates a factory for a `CssProperty`. */
export function declProp<T extends CssPropertyValue>(name: string): (v: T) => CssProperty {
  return (v: T): CssProperty => new CssProperty(name, v);
}

/** Marks a CSS property as `!important`. */
export function important(prop: CssProperty): CssProperty {
  return new CssProperty(prop.key, prop.value, true);
}

/** Creates a `var()` expression referencing a typed custom property. */
export function $(name: CssDashedIdent, fallback?: CssPropertyValue): CssPropertyTemplate {
  return fallback !== undefined
    ? new CssPropertyTemplate(['var(', name, ', ', fallback, ')'])
    : new CssPropertyTemplate(['var(', name, ')']);
}

/** Creates an `env()` expression for user-agent environment values. */
export function env(name: string, fallback?: string): CssPropertyTemplate {
  return fallback !== undefined
    ? new CssPropertyTemplate([`env(${name}, ${fallback})`])
    : new CssPropertyTemplate([`env(${name})`]);
}

/** Template literal for composing property values with interpolated class/ident references. */
export type CssPropertyTemplateValue =
  | string
  | CssSelector
  | CssIdent
  | CssDashedIdent
  | CssPropertyValue;
export class CssPropertyTemplate {
  readonly template: CssPropertyTemplateValue[];

  constructor(template: CssPropertyTemplateValue[]) {
    this.template = template;
  }
}

/** A CSS style rule: `selector { ... }`. */
export class CssStyleRule {
  readonly query: CssSelectorQuery;
  readonly children: CssNode;

  constructor(query: CssSelectorQuery, children: CssNode) {
    this.query = query;
    this.children = children;
  }
}

/** A CSS at-rule (`@media`, `@keyframes`, `@layer`, etc.) with optional prelude and children. */
export class CssAtRule {
  readonly id: string;
  readonly rule: string | CssIdent | CssDashedIdent | undefined;
  readonly children: CssNode;

  constructor(
    name: string,
    rule: string | CssIdent | CssDashedIdent | undefined,
    children: CssNode,
  ) {
    this.id = name;
    this.rule = rule;
    this.children = children;
  }
}

/** A single keyframe step with a selector (percentage or `from`/`to`) and declarations. */
export class CssKeyframeStep {
  readonly selector: string;
  readonly children: CssNode;

  constructor(selector: string, children: CssNode) {
    this.selector = selector;
    this.children = children;
  }
}

/** Creates a keyframe step at a specific percentage. */
export function pct(percent: number, children: CssNode): CssKeyframeStep {
  return new CssKeyframeStep(`${percent}%`, children);
}

/** Creates a `from` (0%) keyframe step. */
export function from(children: CssNode): CssKeyframeStep {
  return new CssKeyframeStep('from', children);
}

/** Creates a `to` (100%) keyframe step. */
export function to(children: CssNode): CssKeyframeStep {
  return new CssKeyframeStep('to', children);
}

/** Creates a CSS style rule. */
export function style(query: CssSelectorQuery, children: CssNode): CssStyleRule {
  return new CssStyleRule(query, children);
}

/** Creates a `@media` at-rule. */
export function media(query: string, children: CssNode): CssAtRule {
  return new CssAtRule('media', query, children);
}

/** Creates a `@container` at-rule. */
export function container(query: string, children: CssNode): CssAtRule {
  return new CssAtRule('container', query, children);
}

/** Creates a `@keyframes` at-rule. */
export function keyframes(query: string, children: CssNode): CssAtRule {
  return new CssAtRule('keyframes', query, children);
}

/** Creates a `@layer` at-rule. */
export function layer(id: CssIdent, children?: CssNode): CssAtRule {
  return new CssAtRule('layer', id, children);
}

/** Creates a `@property` at-rule for registered custom properties. */
export function property(id: CssDashedIdent, children: CssNode): CssAtRule {
  return new CssAtRule('property', id, children);
}

/** Creates a `@scope` at-rule. */
export function scope(query: string, children: CssNode): CssAtRule {
  return new CssAtRule('scope', query, children);
}

/** Creates a `@supports` at-rule. */
export function supports(query: string, children: CssNode): CssAtRule {
  return new CssAtRule('supports', query, children);
}

/** Creates a `@view-transition` at-rule. */
export function viewTransition(children: CssNode): CssAtRule {
  return new CssAtRule('view-transition', void 0, children);
}

/** Creates a `@font-face` at-rule. */
export function fontFace(children: CssNode): CssAtRule {
  return new CssAtRule('font-face', void 0, children);
}

/** Creates a `@starting-style` at-rule for entry animations and view transitions. */
export function startingStyle(children: CssNode): CssAtRule {
  return new CssAtRule('starting-style', void 0, children);
}

/** Creates a `@counter-style` at-rule for custom counter definitions. */
export function counterStyle(id: CssIdent, children: CssNode): CssAtRule {
  return new CssAtRule('counter-style', id, children);
}

/** Creates a `@font-feature-values` at-rule for font feature configuration. */
export function fontFeatureValues(fontFamily: string, children: CssNode): CssAtRule {
  return new CssAtRule('font-feature-values', fontFamily, children);
}

/** Creates a `@font-palette-values` at-rule for font palette customization. */
export function fontPaletteValues(id: CssIdent, children: CssNode): CssAtRule {
  return new CssAtRule('font-palette-values', id, children);
}

/** Creates a `@page` at-rule for print-specific styles. */
export function page(selector: string | undefined, children: CssNode): CssAtRule {
  return new CssAtRule('page', selector, children);
}

/**
 * Configuration for a {@link CssClassMap}.
 * @property base - Default class applied when no states are active.
 * @property name - Optional override for the generated function name.
 * @property states - Map of state names to class(es). Use an array for multi-value states.
 * @property exclude - Predicate to exclude specific state combinations from the output.
 * @property inline - Force inline (ternary) or table-based code generation.
 */
export interface CssClassMapOptions {
  readonly base: CssClassSelector;
  readonly name?: string;
  readonly states: Record<string, CssClassSelector | (null | CssClassSelector)[]>;
  readonly exclude?: (state: CssClassMapState) => boolean;
  readonly inline?: boolean;
}

/**
 * Immutable linked-list node representing a single state in a class map evaluation.
 * Each node tracks the state name, value, and resulting class name.
 */
export class CssClassMapState {
  readonly parent: CssClassMapState | null;
  readonly name: string;
  readonly value: boolean | number;
  readonly className: string;

  constructor(
    parent: CssClassMapState | null,
    name: string,
    value: boolean | number,
    className: string,
  ) {
    this.parent = parent;
    this.name = name;
    this.value = value;
    this.className = className;
  }

  /**
   * Looks up a state value by walking up the parent chain.
   * Returns the value of the first matching state, or undefined.
   */
  get(state: string): undefined | boolean | number {
    let node: CssClassMapState | null = this;
    do {
      if (node.name === state) {
        return node.value;
      }
      node = node.parent;
    } while (node !== null);
    return void 0;
  }

  /** Returns a new state node with this node as parent. */
  push(name: string, value: boolean | number, className: string) {
    return new CssClassMapState(this, name, value, className);
  }

  /** Serializes the full state chain to a space-separated class name string. */
  toString() {
    let node: CssClassMapState | null = this;
    let s = [];
    do {
      s.push(node.className);
      node = node.parent;
    } while (node !== null);
    return s.reverse().join(' ');
  }
}

/** A single state entry in a class map: a name and its class or array of nullable classes. */
export interface CssClassMapStateEntry {
  name: string;
  value: CssClassSelector | (CssClassSelector | null)[];
}

/**
 * Maps boolean/numeric states to CSS class names.
 * Generates either inline ternary expressions (few states) or lookup tables (many states).
 */
export class CssClassMap {
  readonly ns: CssNamespace;
  readonly name: string;
  readonly base: CssClassSelector;
  readonly states: CssClassMapStateEntry[];
  readonly exclude: undefined | ((state: CssClassMapState) => boolean);
  readonly inline: boolean;
  readonly bitSize: number;

  constructor(ns: CssNamespace, options: CssClassMapOptions) {
    const states: CssClassMapStateEntry[] = [];
    const base = options.base;
    const name = options.name ?? base.id;
    const exclude = options.exclude;
    const stateEntries = Object.entries(options.states);
    let inline = options.inline ?? stateEntries.length < 4;
    let bitSize = 0;
    for (let i = 0; i < stateEntries.length; i++) {
      const [name, value] = stateEntries[i];
      if (name === 'base') {
        throw Error("'base' state is reserved for a base state");
      }
      if (Array.isArray(value)) {
        inline = false;
        bitSize += Math.ceil(Math.log2(value.length));
      } else {
        bitSize++;
      }
      states.push({
        name,
        value,
      });
    }
    this.ns = ns;
    this.name = name;
    this.base = base;
    this.states = states;
    this.exclude = exclude;
    this.inline = inline;
    this.bitSize = bitSize;
  }

  /**
   * Retrieves the class for a named state.
   * For multi-value states, pass an index or string id to select a specific variant.
   */
  getState(name: string, i?: number | string): CssClassSelector {
    if (name === 'base') {
      return this.base;
    }
    for (const s of this.states) {
      if (s.name === name) {
        if (Array.isArray(s.value)) {
          if (i === void 0) {
            throw Error(`Unable to find a class map state: ${name}[${i}]`);
          }
          let cls;
          if (typeof i === 'number') {
            if (i < s.value.length) {
              cls = s.value[i];
            } else {
              throw Error(`Unable to find a class map state: ${name}[${i}]`);
            }
          } else {
            for (const c of s.value) {
              if (c !== null && c.id === i) {
                cls = c;
              }
            }
            if (cls === void 0) {
              throw Error(`Unable to find a class map state: ${name}[${i}]`);
            }
          }
          if (cls === null) {
            throw Error(`Class map state ${name}[${i}] doesn't have any class name`);
          }
          return cls;
        }
        return s.value;
      }
    }
    throw Error('Unable to find a class map state with a name: ' + name);
  }
}
