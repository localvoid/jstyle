import { Rule, SelectorRule, MediaRule, KeyframesRule } from "./rule";
import { Property } from "./property";
import { Visitor } from "./visitor";

class EmitCssVisitor extends Visitor {
  result: string;
  private depth: number;

  constructor() {
    super();
    this.result = "";
    this.depth = 0;
  }

  visitSelectorRule(rule: SelectorRule): SelectorRule | null {
    this._writePadding();
    this.result += Array.isArray(rule.selector) ? rule.selector.join(", ") : rule.selector.toString();
    this.result += " {\n";
    this.depth++;
    const ret = super.visitSelectorRule(rule);
    this.depth--;
    this._writePadding();
    this.result += "}\n\n";
    return ret;
  }

  visitMediaRule(rule: MediaRule): MediaRule | null {
    this._writePadding();
    this.result += `@media ${rule.query} {\n`;
    this.depth++;
    const ret = super.visitMediaRule(rule);
    this.depth--;
    this._writePadding();
    this.result += "}\n\n";

    return ret;
  }

  visitKeyframesRule(rule: KeyframesRule): KeyframesRule | null {
    this._writePadding();
    this.result += `@keyframes ${rule.id} {\n`;
    this.depth--;
    const ret = super.visitKeyframesRule(rule);
    this.depth--;
    this._writePadding();
    this.result += "}\n\n";

    return ret;
  }

  visitProperty(property: Property): Property | null {
    this._writePadding();
    this.result += `${property.name}: ${property.value};\n`;

    return property;
  };

  _writePadding() {
    for (let i = 0; i < this.depth; i++) {
      this.result += "  ";
    }
  }
}

export function emitCss(rules: Rule[]): string {
  const visitor = new EmitCssVisitor();
  visitor.visit(rules);
  return visitor.result;
}
