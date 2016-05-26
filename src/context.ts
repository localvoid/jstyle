import {Placeholder} from "./placeholder";

const TagNameAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
const ClassNameAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ReservedTagNames = new Set<string>([
  // HTML Elements
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "command",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "template",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",

  // SVG Elements
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "set",
  "desc",
  "metadata",
  "title",
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "defs",
  "g",
  "svg",
  "symbol",
  "use",
  "linearGradient",
  "radialGradient",
  "a",
  "altGlyphDef",
  "clipPath",
  "color-profile",
  "cursor",
  "filter",
  "font",
  "font-face",
  "foreignObject",
  "image",
  "marker",
  "mask",
  "pattern",
  "script",
  "style",
  "switch",
  "text",
  "view",

  // Other
  "xml",
  "attribute",
  "class",
  "className",
].map((name) => name.toLowerCase()));

const ReservedClassNames = new Set<string>();

export interface ContextOptions {
  minifyTagNames?: boolean;
  minifyClassNames?: boolean;
  tagNamePrefix?: string;
  env?: Map<string | Symbol, any>;
}

const SymbolDescriptionRegexp = /^Symbol\((.*)\)$/;

function getSymbolDescription(symbol: Symbol): string {
  return symbol.toString().match(SymbolDescriptionRegexp)![1];
}

export class Context {
  private readonly _minifyTagNames: boolean;
  private readonly _minifyClassNames: boolean;
  private readonly _symbolNameRegistry: Map<Symbol, string>;
  private _nextSymbolNameId: number;
  public readonly tagNameRegistry: {[name: string]: string};
  public readonly classNameRegistry: {[name: string]: string};
  private readonly _tagNameReverseIndex: Map<string | Symbol, any>;
  private readonly _classNameReverseIndex: Map<string | Symbol, any>;
  private readonly _tagNamePrefix: string;
  private _nextTagNameId: number;
  private _nextClassNameId: number;
  private _placeholders: Map<string | Symbol, Placeholder>;
  private _env: Map<string | Symbol, any>;

  constructor(options?: ContextOptions) {
    const minifyTagNames = options && options.minifyTagNames || false;
    const minifyClassNames = options && options.minifyClassNames || false;
    const tagNamePrefix = options && options.tagNamePrefix || "x";

    this._minifyTagNames = minifyTagNames;
    this._minifyClassNames = minifyClassNames;
    this._symbolNameRegistry = new Map<Symbol, string>();
    this._nextSymbolNameId = 0;
    this.tagNameRegistry = {};
    this.classNameRegistry = {};
    this._tagNameReverseIndex = new Map<string | Symbol, any>();
    this._classNameReverseIndex = new Map<string | Symbol, any>();
    this._tagNamePrefix = tagNamePrefix;
    this._nextTagNameId = 0;
    this._nextClassNameId = 0;
    this._placeholders = new Map<string | Symbol, Placeholder>();
    this._env = options && options.env || new Map<string | Symbol, any>();
  }

  symbolName(symbol: Symbol): string {
    let name = this._symbolNameRegistry.get(symbol);
    if (name === undefined) {
      name = getSymbolDescription(symbol);
      if (name.length === 0) {
        name = "unnamed";
      }
      name += "_" + this._nextSymbolNameId.toString();
      this._symbolNameRegistry.set(symbol, name);
      this._nextSymbolNameId++;
    }

    return name;
  }

  tagName(tagName: string | Symbol): string {
    const name = (typeof tagName === "string") ? tagName : this.symbolName(tagName);

    if (this._minifyTagNames) {
      let lowCaseTagName = name.toLowerCase();
      if (ReservedTagNames.has(lowCaseTagName)) {
        return name;
      }

      let result = this.tagNameRegistry[lowCaseTagName];
      if (result !== undefined) {
        return result;
      } else {
        const alphabetLength = TagNameAlphabet.length;

        do {
          let id = this._nextClassNameId++;
          result = this._tagNamePrefix;
          while (id > alphabetLength) {
            result += TagNameAlphabet[id % alphabetLength];
            id = id / alphabetLength | 0;
          }
          result += TagNameAlphabet[id % alphabetLength];
        } while (this._tagNameReverseIndex.has(result) || ReservedTagNames.has(result));

        this.tagNameRegistry[lowCaseTagName] = result;
        this._tagNameReverseIndex.set(result, lowCaseTagName);
        return result;
      }
    }

    return name;
  }

  className(className: string | Symbol, dotPrefix = true): string {
    const name = (typeof className === "string") ? className : this.symbolName(className);

    if (this._minifyClassNames) {
      let result = this.classNameRegistry[name];
      if (result !== undefined) {
        return dotPrefix ? "." + result : result;
      } else {
        const alphabetLength = ClassNameAlphabet.length;

        do {
          let id = this._nextClassNameId++;
          result = "";
          while (id > alphabetLength) {
            result += ClassNameAlphabet[id % alphabetLength];
            id = id / alphabetLength | 0;
          }
          result += ClassNameAlphabet[id % alphabetLength];
        } while (this._classNameReverseIndex.has(result) || ReservedClassNames.has(result));

        this.classNameRegistry[name] = result;
        this._classNameReverseIndex.set(result, name);
        return dotPrefix ? "." + result : result;
      }
    }

    return dotPrefix ? "." + name : name;
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
