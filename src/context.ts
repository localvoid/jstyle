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
}

export class Context {
  private readonly _minifyTagNames: boolean;
  private readonly _minifyClassNames: boolean;
  private readonly tagNameRegistry: {[name: string]: string};
  private readonly classNameRegistry: {[name: string]: string};
  private readonly _tagNameReverseIndex: {[name: string]: string};
  private readonly _classNameReverseIndex: {[name: string]: string};
  private readonly _tagNamePrefix: string;
  private _nextTagNameId: number;
  private _nextClassNameId: number;

  constructor(options?: ContextOptions) {
    let minifyTagNames = false;
    let minifyClassNames = false;
    let tagNamePrefix = "x";

    if (options !== undefined) {
      if (options.minifyTagNames !== undefined) {
        minifyTagNames = options.minifyTagNames;
      }
      if (options.minifyClassNames !== undefined) {
        minifyClassNames = options.minifyClassNames;
      }
      if (options.tagNamePrefix !== undefined && options.tagNamePrefix.length > 0) {
        tagNamePrefix = options.tagNamePrefix;
      }
    }

    this._minifyTagNames = minifyTagNames;
    this._minifyClassNames = minifyClassNames;
    this.tagNameRegistry = {};
    this.classNameRegistry = {};
    this._tagNameReverseIndex = {};
    this._classNameReverseIndex = {};
    this._tagNamePrefix = tagNamePrefix;
    this._nextTagNameId = 0;
    this._nextClassNameId = 0;
  }

  tagName(tagName: string): string {
    if (this._minifyTagNames) {
      let lowCaseTagName = tagName.toLowerCase();
      if (ReservedTagNames.has(lowCaseTagName)) {
        return tagName;
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
        } while (this._tagNameReverseIndex[result] !== undefined || ReservedTagNames.has(result));

        this.tagNameRegistry[lowCaseTagName] = result;
        this._tagNameReverseIndex[result] = lowCaseTagName;
        return result;
      }
    }

    return tagName;
  }

  className(className: string): string {
    if (this._minifyClassNames) {
      let result = this.classNameRegistry[className];
      if (result !== undefined) {
        return result;
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
        } while (this._classNameReverseIndex[result] !== undefined || ReservedClassNames.has(result));

        this.classNameRegistry[className] = result;
        this._classNameReverseIndex[result] = className;
        return result;
      }
    }

    return className;
  }
}
