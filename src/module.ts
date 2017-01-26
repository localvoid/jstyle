import { Context } from "./context";
import { Rule } from "./rule";
import { PropertyFactory, PropertyFactoryOptions, DefaultPropertyFactory } from "./property";

let _nextId = 0;

function _noRules(context: Context): Rule[] {
  return [];
}

export class Module {
  readonly id: number;
  dependencies: Module[];
  private _rules: ((context: Context, prop: PropertyFactory) => Rule[]) | null;
  private _init: ((context: Context, prop: PropertyFactory) => void) | null;
  private _propertyFactory: PropertyFactory;

  constructor() {
    this.id = _nextId++;
    this.dependencies = [];
    this._rules = _noRules;
    this._init = null;
    this._propertyFactory = DefaultPropertyFactory;
  }

  propertyFactoryOptions(propertyFactoryOptions: PropertyFactoryOptions): Module {
    this._propertyFactory = new PropertyFactory(propertyFactoryOptions);
    return this;
  }

  require(dependencies: Module | Module[]): Module {
    if (Array.isArray(dependencies)) {
      this.dependencies = this.dependencies.concat(dependencies);
    } else {
      this.dependencies.push(dependencies);
    }
    return this;
  }

  init(init: (context: Context, prop: PropertyFactory) => void): Module {
    this._init = init;
    return this;
  }

  rules(build: (context: Context, prop: PropertyFactory) => Rule[]): Module {
    this._rules = build;
    return this;
  }

  build(context: Context): Rule[] {
    if (this._init !== null) {
      this._init(context, this._propertyFactory);
    }
    if (this._rules !== null) {
      return this._rules(context, this._propertyFactory);
    }
    return [];
  }
}
