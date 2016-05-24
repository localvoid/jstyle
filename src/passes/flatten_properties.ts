import {Visitor} from "../visitor";
import {RuleChildren, Rule, SelectorRule} from "../rule";
import {Property} from "../property";

class FlattenProperties extends Visitor {
  _currentRule: Rule | null;
  _currentRuleStack: Rule[];

  constructor() {
    super();
    this._currentRule = null;
    this._currentRuleStack = [];
  }

  visitChildren(children: RuleChildren): RuleChildren {
    let newChildren = [] as RuleChildren;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (Array.isArray(child)) {
        if (this._currentRule instanceof SelectorRule) {
          newChildren = newChildren.concat(this.visitChildren(child));
        } else {
          newChildren.push(this.visitChildren(child));
        }
      } else if (child instanceof Rule) {
        newChildren.push(this.visitRule(child));
      } else if (child instanceof Property) {
        newChildren.push(this.visitProperty(child));
      }
    }
    return newChildren;
  }

  visitRule(rule: Rule): Rule {
    this._currentRuleStack.push(rule);
    this._currentRule = rule;
    const ret = super.visitRule(rule);
    this._currentRuleStack.pop();
    if (this._currentRuleStack.length > 0) {
      this._currentRule = this._currentRuleStack[this._currentRuleStack.length - 1];
    } else {
      this._currentRule = null;
    }
    return ret;
  }
}

export function flattenProperties(rule: Rule): Rule {
  const visitor = new FlattenProperties();
  return visitor.visitRule(rule);
}
