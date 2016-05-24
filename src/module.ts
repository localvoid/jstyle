import {Context} from "./context";
import {Rule} from "./rule";
import {PropertyFactory, PropertyFactoryOptions, DefaultPropertyFactory} from "./property";

let _nextId = 0;

function _noRules(context: Context): Rule[] {
  return [];
}

export class Module {
  readonly id: number;
  dependencies: Module[];
  private _build: (context: Context, prop: PropertyFactory) => Rule[];
  private _propertyFactory: PropertyFactory;

  constructor() {
    this.id = _nextId++;
    this.dependencies = [];
    this._build = _noRules;
    this._propertyFactory = DefaultPropertyFactory;
  }

  propertyFactoryOptions(propertyFactoryOptions: PropertyFactoryOptions): Module {
    this._propertyFactory = new PropertyFactory(propertyFactoryOptions);
    return this;
  }

  require(dependencies: Module[]): Module {
    this.dependencies = this.dependencies.concat(dependencies);
    return this;
  }

  rules(build: (context: Context, prop: PropertyFactory) => Rule[]): Module {
    this._build = build;
    return this;
  }

  build(context: Context): Rule[] {
    return this._build(context, this._propertyFactory);
  }
}
