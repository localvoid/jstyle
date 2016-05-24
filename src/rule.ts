import {Property} from "./property";

export type RuleChildrenValue = Rule | Property | null | RuleChildren;
export interface RuleChildren extends Array<RuleChildrenValue> {}

export abstract class Rule {
  readonly children: RuleChildren;

  constructor(children: RuleChildren) {
    this.children = children;
  }
}

export class SelectorRule extends Rule {
  readonly selector: string[];

  constructor(selector: string[], children: RuleChildren) {
    super(children);
    this.selector = selector;
  }
}

export class MediaRule extends Rule {
  readonly query: string;

  constructor(query: string, children: RuleChildren) {
    super(children);
    this.query = query;
  }
}

export class KeyframesRule extends Rule {
  readonly id: string;

  constructor(id: string, children: RuleChildren) {
    super(children);
    this.id = id;
  }
}
