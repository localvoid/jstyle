import type { CssDashedIdent, CssIdent } from '../css/core.js';
import { IDSet, tagNameIndexToId } from './uid.js';

export class CssMapNamespace {
  readonly id: string;
  readonly classes: Map<string, string>;
  readonly idents: Map<string, string>;
  readonly dasheds: Map<string, string>;
  readonly tags: Map<string, string>;

  constructor(id: string) {
    this.id = id;
    this.classes = new Map();
    this.idents = new Map();
    this.dasheds = new Map();
    this.tags = new Map();
  }
}

export class CssMap {
  readonly namespaces: Map<string, CssMapNamespace>;
  readonly classes: IDSet;
  readonly idents: IDSet;
  readonly dasheds: IDSet;
  readonly tags: IDSet;

  constructor() {
    this.namespaces = new Map();
    this.classes = new IDSet();
    this.idents = new IDSet();
    this.dasheds = new IDSet();
    this.tags = new IDSet(tagNameIndexToId);

    this.classes.exclude(/^ad/);
    this.classes.add('translated-rtl'); // Added by Google Translate

    for (const i of RESERVED_IDENTS) {
      this.idents.add(i);
      this.dasheds.add(i);
    }
  }

  getClassId(namespace: string, id: string): string {
    const ns = this._getNamespace(namespace);
    let mapped = ns.classes.get(id);
    if (mapped === void 0) {
      ns.classes.set(id, (mapped = this.classes.next()));
    }
    return mapped;
  }

  getIdentId(v: CssIdent): string {
    const ns = this._getNamespace(v.ns.id);
    let id = ns.idents.get(v.id);
    if (id === void 0) {
      ns.idents.set(v.id, (id = this.idents.next()));
    }
    return id;
  }

  getDashedId(v: CssDashedIdent): string {
    const ns = this._getNamespace(v.ns.id);
    let id = ns.dasheds.get(v.id);
    if (id === void 0) {
      ns.dasheds.set(v.id, (id = this.dasheds.next()));
    }
    return id;
  }

  getTagId(v: CssDashedIdent): string {
    const ns = this._getNamespace(v.ns.id);
    let id = ns.tags.get(v.id);
    if (id === void 0) {
      ns.tags.set(v.id, (id = this.tags.next()));
    }
    return id + '_';
  }

  deserialize(data: string): void {
    const serializableMap: Record<string, SerializableMapModule> = JSON.parse(data);
    const { classes, idents, dasheds, tags } = this;
    for (const [moduleId, sm] of Object.entries(serializableMap)) {
      const m = this._getNamespace(moduleId);
      if (sm.c !== void 0) {
        for (const [k, v] of Object.entries(sm.c)) {
          classes.add(v);
          m.classes.set(k, v);
        }
      }
      if (sm.i !== void 0) {
        for (const [k, v] of Object.entries(sm.i)) {
          idents.add(k);
          m.idents.set(k, v);
        }
      }
      if (sm.d !== void 0) {
        for (const [k, v] of Object.entries(sm.d)) {
          dasheds.add(k);
          m.dasheds.set(k, v);
        }
      }
      if (sm.t !== void 0) {
        for (const [k, v] of Object.entries(sm.t)) {
          tags.add(k);
          m.tags.set(k, v);
        }
      }
    }
  }

  serialize(): string {
    const serializableMap: Record<string, SerializableMapModule> = {};
    for (const ns of this.namespaces.values()) {
      const sm: SerializableMapModule = {};
      if (ns.classes.size > 0) {
        sm.c = Object.fromEntries(ns.classes.entries());
      }
      if (ns.idents.size > 0) {
        sm.i = Object.fromEntries(ns.idents.entries());
      }
      if (ns.dasheds.size > 0) {
        sm.d = Object.fromEntries(ns.dasheds.entries());
      }
      if (ns.tags.size > 0) {
        sm.t = Object.fromEntries(ns.tags.entries());
      }
      serializableMap[ns.id] = sm;
    }
    return JSON.stringify(serializableMap, void 0, '  ');
  }

  private _getNamespace(ns: string): CssMapNamespace {
    let n = this.namespaces.get(ns);
    if (n === void 0) {
      this.namespaces.set(ns, (n = new CssMapNamespace(ns)));
    }
    return n;
  }
}

export interface SerializableMapModule {
  c?: Record<string, string>;
  i?: Record<string, string>;
  d?: Record<string, string>;
  t?: Record<string, string>;
}

const RESERVED_IDENTS = [
  'unset',
  'initial',
  'inherit',
  'none',
  'inline',
  'outside',
  'span',
  'auto',
  'scroll-position',
  'contents',

  'disc',
  'circle',
  'square',
  'decimal',
  'cjk-decimal',
  'decimal-leading-zero',
  'lower-roman',
  'upper-roman',
  'lower-greek',
  'lower-alpha',
  'lower-latin',
  'upper-alpha',
  'upper-latin',
  'arabic-indic',
  'armenian',
  'bengali',
  'cambodian',
  'cjk-earthly-branch',
  'cjk-heavenly-stem',
  'cjk-ideographic',
  'devanagari',
  'ethiopic-numeric',
  'georgian',
  'gujarati',
  'gurmukhi',
  'hebrew',
  'hiragana',
  'hiragana-iroha',
  'japanese-formal',
  'japanese-informal',
  'kannada',
  'katakana',
  'katakana-iroha',
  'khmer',
  'korean-hangul-formal',
  'korean-hanja-formal',
  'korean-hanja-informal',
  'lao',
  'lower-armenian',
  'malayalam',
  'mongolian',
  'myanmar',
  'oriya',
  'persian',
  'simp-chinese-formal',
  'simp-chinese-informal',
  'tamil',
  'telugu',
  'thai',
  'tibetan',
  'trad-chinese-formal',
  'trad-chinese-informal',
  'upper-armenian',
  'disclosure-open',
  'disclosure-close',
];
