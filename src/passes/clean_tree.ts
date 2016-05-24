import {Visitor} from "../visitor";
import {RuleChildren, Rule} from "../rule";
import {Property} from "../property";

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
      }
    }
    return newChildren;
  }

  visitRule(rule: Rule): Rule | null {
    if (rule.children.length === 0) {
      this.dirty = true;
      return null;
    }
    return rule;
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
