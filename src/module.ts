import { Context } from "./context";
import { Rule } from "./rule";

let _nextId = 0;

function _noRules(context: Context): Rule[] {
  return [];
}

export class Module {
  readonly id: number;
  dependencies: Module[];
  private _rules: ((context: Context) => Rule[]) | null;
  private _init: ((context: Context) => void) | null;

  constructor() {
    this.id = _nextId++;
    this.dependencies = [];
    this._rules = _noRules;
    this._init = null;
  }

  require(dependencies: Module | Module[]): Module {
    if (Array.isArray(dependencies)) {
      this.dependencies = this.dependencies.concat(dependencies);
    } else {
      this.dependencies.push(dependencies);
    }
    return this;
  }

  init(init: (context: Context) => void): Module {
    this._init = init;
    return this;
  }

  rules(build: (context: Context) => Rule[]): Module {
    this._rules = build;
    return this;
  }

  build(context: Context): Rule[] {
    if (this._init !== null) {
      this._init(context);
    }
    if (this._rules !== null) {
      return this._rules(context);
    }
    return [];
  }
}
