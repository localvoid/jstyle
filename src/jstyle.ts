export {Property, PropertyFactory, DefaultPropertyFactory} from "./property";
export {RuleChildren, Rule, SelectorRule, MediaRule, KeyframesRule} from "./rule";
export {Context} from "./context";
export {Module} from "./module";
export {Visitor} from "./visitor";
export {emitCss} from "./emit_css";
export {bundle} from "./bundle";
export {flattenProperties} from "./passes/flatten_properties";
export {uniqueProperties} from "./passes/unique_properties";
export {cleanTree} from "./passes/clean_tree";
export {sortProperties} from "./passes/sort_properties";

import {RuleChildren, SelectorRule, MediaRule, KeyframesRule} from "./rule";
import {Placeholder} from "./placeholder";

export function select(selectors: string | string[] | Placeholder, children: RuleChildren): SelectorRule {
  if (Array.isArray(selectors) || selectors instanceof Placeholder) {
    return new SelectorRule(selectors, children);
  }
  return new SelectorRule([selectors], children);
}

export function media(expressions: string, children: RuleChildren): MediaRule {
  return new MediaRule(expressions, children);
}

export function keyframes(id: string, children: RuleChildren): KeyframesRule {
  return new KeyframesRule(id, children);
}