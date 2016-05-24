import {Rule, RuleChildren, SelectorRule, MediaRule, KeyframesRule} from "./rule";
import {Property} from "./property";

export abstract class Visitor {
  visitChildren(children: RuleChildren): RuleChildren {
    const newChildren = [] as RuleChildren;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (Array.isArray(child)) {
        newChildren.push(this.visitChildren(child));
      } else if (child instanceof Rule) {
        newChildren.push(this.visitRule(child));
      } else if (child instanceof Property) {
        newChildren.push(this.visitProperty(child));
      }
    }
    return newChildren;
  }

  visitRule(rule: Rule): Rule {
    if (rule instanceof SelectorRule) {
      return this.visitSelectorRule(rule);
    } else if (rule instanceof MediaRule) {
      return this.visitMediaRule(rule);
    } else if (rule instanceof KeyframesRule) {
      return this.visitKeyframesRule(rule);
    }
    return rule;
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule {
    return new SelectorRule(rule.selector, this.visitChildren(rule.children));
  }

  visitMediaRule(rule: MediaRule): MediaRule {
    return new MediaRule(rule.query, this.visitChildren(rule.children));
  }

  visitKeyframesRule(rule: KeyframesRule): KeyframesRule {
    return new KeyframesRule(rule.id, this.visitChildren(rule.children));
  }

  visitProperty(property: Property): Property {
    return property;
  }
}
