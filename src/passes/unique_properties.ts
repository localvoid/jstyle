import {Visitor} from "../visitor";
import {Rule, SelectorRule} from "../rule";
import {Property} from "../property";

class UniqueProperties extends Visitor {
  _currentSelector: SelectorRule | null;
  _currentProperties: {[name: string]: Property} | null;

  constructor() {
    super();
    this._currentSelector = null;
    this._currentProperties = null;
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule | null {
    this._currentSelector = rule;
    this._currentProperties = {};
    const ret = super.visitSelectorRule(rule);
    if (ret === null) {
      return ret;
    }
    const properties = [] as Property[];
    const keys = Object.keys(this._currentProperties);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      properties.push(this._currentProperties![key]);
    }
    this._currentSelector = null;
    this._currentProperties = null;
    return new SelectorRule(ret.selector, properties);
  }

  visitProperty(property: Property): Property | null {
    if (property !== null) {
      if (this._currentSelector !== null) {
        this._currentProperties![property.name] = property;
      }
    }
    return property;
  }
}

export function uniqueProperties(rule: Rule): Rule | null {
  const visitor = new UniqueProperties();
  return visitor.visitRule(rule);
}
