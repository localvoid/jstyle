import {Visitor} from "../visitor";
import {RuleChildren, Rule, SelectorRule} from "../rule";
import {Property} from "../property";
import {Placeholder} from "../placeholder";

class CleanTree extends Visitor {
  dirty: boolean;

  constructor() {
    super();
    this.dirty = false;
  }

  visitChildren(children: RuleChildren): RuleChildren {
    let newChildren = [] as RuleChildren;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child) {
        if (Array.isArray(child)) {
          newChildren.push(this.visitChildren(child));
        } else if (child instanceof Rule) {
          newChildren.push(this.visitRule(child));
        } else if (child instanceof Property) {
          newChildren.push(this.visitProperty(child));
        }
      } else {
        this.dirty = true;
      }
    }
    return newChildren;
  }

  visitRule(rule: Rule): Rule | null {
    if (rule.children.length === 0) {
      this.dirty = true;
      return null;
    }
    return super.visitRule(rule);
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule | null {
    if (rule.selector instanceof Placeholder && rule.selector.data.length === 0) {
      this.dirty = true;
      return null;
    }
    return super.visitSelectorRule(rule);
  }
}

export function cleanTree(rule: Rule): Rule | null {
  const visitor = new CleanTree();
  let newRule = rule as Rule | null;
  do {
    visitor.dirty = false;
    newRule = visitor.visitRule(newRule!);
  } while (visitor.dirty && newRule !== null);

  return newRule;
}
