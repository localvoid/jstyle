import type { CssPropertyValue } from '../css/core.js';
import type { CssMap } from '../map/index.js';
import {
  CssAtRule,
  CssClassId,
  CssClassMap,
  CssDashedIdent,
  CssIdent,
  CssKeyframeStep,
  CssProperty,
  CssPropertyTemplate,
  CssStyleRule,
  type CssNode,
} from '../css/core.js';
import { CssSelector, type CssSelectorPart, type CssSelectorQuery } from '../css/selector.js';
import { indent } from './utils.js';

function emitPropertyValue(map: CssMap, value: CssPropertyValue): string {
  if (value instanceof CssPropertyTemplate) {
    let s = '';
    for (const part of value.template) {
      if (typeof part === 'string') {
        s += part;
      } else if (part instanceof CssClassId) {
        s += map.getClassId(part);
      } else if (part instanceof CssIdent) {
        s += map.getIdentId(part);
      } else if (part instanceof CssDashedIdent) {
        s += '--' + map.getDashedId(part);
      }
    }
    return s;
  }
  if (value instanceof CssIdent) {
    return map.getIdentId(value);
  }
  return String(value);
}

function emitSelectorComment(query: CssSelectorQuery): string {
  if (Array.isArray(query)) {
    return query.map(emitSelectorComment).join(', ');
  }
  if (query instanceof CssSelector) {
    return query.parts.map(emitSelectorPartComment).join('');
  }
  return '';
}

function emitSelectorPartComment(part: CssSelectorPart): string {
  switch (part.type) {
    case 'tag':
      return part.name;
    case 'universal':
      return '*';
    case 'self':
      return '&';
    case 'id':
      return `#${typeof part.id === 'string' ? part.id : `${part.id.ns.id}/${part.id.id}`}`;
    case 'class':
      return `.${typeof part.id === 'string' ? part.id : `${part.id.ns.id}/${part.id.id}`}`;
    case 'attr':
      return part.value !== undefined
        ? `[${part.name}${part.op ?? '='}"${part.value}"]`
        : `[${part.name}]`;
    case 'pseudo-class':
      return part.args ? `${part.name}(${emitSelectorComment(part.args)})` : part.name;
    case 'pseudo-element':
      return part.args ? `${part.name}(${emitSelectorComment(part.args)})` : part.name;
    case 'combinator':
      return ` ${part.combinator} `;
  }
}

function emitSelectorQuery(map: CssMap, query: CssSelectorQuery): string {
  if (Array.isArray(query)) {
    return query.map((v) => emitSelectorQuery(map, v)).join(', ');
  }
  if (query instanceof CssSelector) {
    return query.parts.map((p) => emitSelectorPart(map, p)).join('');
  }
  return query;
}

function emitSelectorPart(map: CssMap, part: CssSelectorPart): string {
  switch (part.type) {
    case 'tag':
      return part.name;
    case 'universal':
      return '*';
    case 'self':
      return '&';
    case 'id':
      return `#${typeof part.id === 'string' ? part.id : map.getIdentId(part.id)}`;
    case 'class':
      return `.${typeof part.id === 'string' ? part.id : map.getClassId(part.id)}`;
    case 'attr':
      return part.value !== void 0
        ? `[${part.name}${part.op ?? '='}"${part.value}"]`
        : `[${part.name}]`;
    case 'pseudo-class':
      return part.args ? `:${part.name}(${emitSelectorQuery(map, part.args)})` : part.name;
    case 'pseudo-element':
      return part.args ? `::${part.name}(${emitSelectorQuery(map, part.args)})` : part.name;
    case 'combinator':
      return ` ${part.combinator} `;
  }
}

export function emitCssCode(
  map: CssMap,
  classMaps: Map<string, CssClassMap[]>,
  n: CssNode,
  depth: number = 0,
): string {
  if (n == null || n === false) {
    return '';
  }
  if (Array.isArray(n)) {
    return n.map((n) => emitCssCode(map, classMaps, n, depth)).join('');
  }
  if (n instanceof CssProperty) {
    let s = typeof n.key === 'string' ? n.key : map.getDashedId(n.key);
    s += ': ' + emitPropertyValue(map, n.value);
    if (n.important) {
      s += ' !important';
    }
    return indent(depth, s + ';\n');
  }
  if (n instanceof CssStyleRule) {
    return (
      indent(depth, '/* ' + emitSelectorComment(n.query) + ' */\n') +
      indent(depth, emitSelectorQuery(map, n.query) + ' {\n') +
      emitCssCode(map, classMaps, n.children, depth + 1) +
      indent(depth, '}\n')
    );
  }
  if (n instanceof CssAtRule) {
    const rule =
      n.rule === void 0
        ? ''
        : typeof n.rule === 'string'
          ? n.rule
          : n.rule instanceof CssIdent
            ? map.getIdentId(n.rule)
            : '--' + map.getDashedId(n.rule);
    const prelude = ` ${rule}`;
    if (n.children == null) {
      return indent(depth, `@${n.id}${prelude};\n`);
    }
    return (
      indent(depth, `@${n.id}${prelude} {\n`) +
      emitCssCode(map, classMaps, n.children, depth + 1) +
      indent(depth, '}\n')
    );
  }
  if (n instanceof CssKeyframeStep) {
    return (
      indent(depth, `${n.selector} {\n`) +
      emitCssCode(map, classMaps, n.children, depth + 1) +
      indent(depth, '}\n')
    );
  }
  if (n instanceof CssClassMap) {
    let m = classMaps.get(n.ns.id);
    if (m === void 0) {
      classMaps.set(n.ns.id, (m = []));
    }
    m.push(n);
  }
  return '';
}
