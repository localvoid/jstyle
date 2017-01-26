import { Placeholder } from "./placeholder";

export interface ContextOptions {
  env?: Map<string | Symbol, any>;
}

export class Context {
  private _placeholders: Map<string | Symbol, Placeholder>;
  private _env: Map<string | Symbol, any>;

  constructor(options?: ContextOptions) {
    this._placeholders = new Map<string | Symbol, Placeholder>();
    this._env = options && options.env || new Map<string | Symbol, any>();
  }

  placeholder(name: string | Symbol): Placeholder {
    let result = this._placeholders.get(name);
    if (result === undefined) {
      result = new Placeholder();
      this._placeholders.set(name, result);
    }
    return result;
  }

  get<V>(name: string | Symbol, defaultValue?: V): V {
    const r = this._env.get(name);
    if (r === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`Variable "${name}" is undefined.`);
      }
      return defaultValue;
    }
    return r as V;
  }
}
