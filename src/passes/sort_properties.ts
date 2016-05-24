import {Visitor} from "../visitor";
import {Rule, SelectorRule} from "../rule";
import {Property} from "../property";

const PrefixRegexp = /^-[a-zA-Z0-9]+-/;

class SortProperties extends Visitor {
  constructor() {
    super();
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule | null {
    const ret = super.visitSelectorRule(rule);
    if (ret === null) {
      return ret;
    }
    return new SelectorRule(
      ret.selector,
      ret.children.sort((a: Property, b: Property) =>
        a.name.replace(PrefixRegexp, "").localeCompare(b.name.replace(PrefixRegexp, ""))));
  }
}

export function sortProperties(rule: Rule): Rule | null {
  const visitor = new SortProperties();
  return visitor.visitRule(rule);
}
