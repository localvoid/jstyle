export {Property, PropertyFactory, DefaultPropertyFactory} from "./property";
export {RuleChildren, Rule, SelectorRule, MediaRule, KeyframesRule} from "./rule";
export {Context} from "./context";
export {Module} from "./module";
export {Visitor} from "./visitor";
export {emitCss} from "./emit_css";
export {bundle} from "./bundle";
export {Compiler} from "./compiler";

import {RuleChildren, SelectorRule, MediaRule, KeyframesRule} from "./rule";

export function select(selectors: string | string[], children: RuleChildren): SelectorRule {
  if (Array.isArray(selectors)) {
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
