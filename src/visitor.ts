import {Rule, RuleChildren, SelectorRule, MediaRule, KeyframesRule} from "./rule";
import {Property} from "./property";

export abstract class Visitor {
  visit(rules: Array<Rule | null>): Rule[] {
    const newRules = [] as Rule[];
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule !== null) {
        const ret = this.visitRule(rule);
        if (ret !== null) {
          newRules.push(ret);
        }
      }
    }
    return newRules;
  }

  visitChildren(children: RuleChildren): RuleChildren {
    let newChildren = [] as RuleChildren;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      let ret: Rule | Property | null = null;
      if (Array.isArray(child)) {
        newChildren = newChildren.concat(this.visitChildren(child));
      } else if (child instanceof Rule) {
        ret = this.visitRule(child);
      } else if (child instanceof Property) {
        ret = this.visitProperty(child);
      }
      if (ret !== null) {
        newChildren.push();
      }
    }
    return newChildren;
  }

  visitRule(rule: Rule): Rule | null {
    if (rule instanceof SelectorRule) {
      return this.visitSelectorRule(rule);
    } else if (rule instanceof MediaRule) {
      return this.visitMediaRule(rule);
    } else if (rule instanceof KeyframesRule) {
      return this.visitKeyframesRule(rule);
    }
    return rule;
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule | null {
    return new SelectorRule(rule.selector, this.visitChildren(rule.children));
  }

  visitMediaRule(rule: MediaRule): MediaRule | null {
    return new MediaRule(rule.query, this.visitChildren(rule.children));
  }

  visitKeyframesRule(rule: KeyframesRule): KeyframesRule | null {
    return new KeyframesRule(rule.id, this.visitChildren(rule.children));
  }

  visitProperty(property: Property): Property | null {
    return property;
  }
}
