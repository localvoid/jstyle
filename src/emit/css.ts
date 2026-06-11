import type { CssPropertyValue } from '../css/core.js';
import type { CssMap } from '../map/index.js';
import {
  CssAtRule,
  CssClassMap,
  CssDashedIdent,
  CssIdent,
  CssKeyframeStep,
  CssProperty,
  CssPropertyTemplate,
  CssStyleRule,
  type CssNode,
} from '../css/core.js';
import {
  CssClassSelector,
  CssComplexSelector,
  CssSelector,
  type CssFunctionalPseudo,
  type CssSelectorPart,
  type CssSelectorQuery,
} from '../css/selector.js';
import { indent } from './utils.js';

function emitPropertyValue(map: CssMap, value: CssPropertyValue): string {
  if (value instanceof CssPropertyTemplate) {
    let s = '';
    for (const part of value.template) {
      if (typeof part === 'string') {
        s += part;
      } else if (part instanceof CssClassSelector) {
        s += map.getClassId(part.ns.id, part.id);
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

function emitPseudoPart(map: CssMap, p: string | CssFunctionalPseudo): string {
  if (typeof p === 'string') {
    return p;
  }
  return `${p.name}(${emitSelectorQuery(map, p.args)})`;
}

function emitSelectorComment(query: CssSelectorQuery): string {
  if (Array.isArray(query)) {
    return query.map((v) => emitSelectorComment(v)).join(', ');
  }
  if (query instanceof CssComplexSelector) {
    const left = emitSelectorComment(query.left);
    const right = emitSelectorComment(query.right);
    return left + ' ' + query.combinator + ' ' + right;
  }
  if (query instanceof CssClassSelector) {
    const pseudo = query.pseudo ? query.pseudo.map(emitPseudoComment).join('') : '';
    return `${query.ns.id}.${query.id}${pseudo}`;
  }
  if (query instanceof CssSelector) {
    return emitSelectorCommentFromParts(query);
  }
  return '';
}

function emitSelectorCommentFromParts(sel: CssSelector): string {
  const left = sel.parts.map(emitSelectorPartComment).join('');
  const pseudo = sel.pseudo ? sel.pseudo.map(emitPseudoComment).join('') : '';
  return left + pseudo;
}

function emitPseudoComment(p: string | CssFunctionalPseudo): string {
  if (typeof p === 'string') {
    return p;
  }
  return `${p.name}(${emitSelectorComment(p.args)})`;
}

function emitSelectorPartComment(part: CssSelectorPart): string {
  switch (part.type) {
    case 'tag':
      return part.name;
    case 'universal':
      return '*';
    case 'class':
      return `${part.ns.id}.${part.id}`;
    case 'attr':
      return part.value !== undefined
        ? `[${part.name}${part.op ?? '='}"${part.value}"]`
        : `[${part.name}]`;
    case 'pseudo-class':
      return part.args ? `${part.name}(${emitSelectorComment(part.args)})` : part.name;
    case 'pseudo-element':
      return part.name;
    case 'self':
      return '&';
  }
}

function emitSelectorQuery(map: CssMap, query: CssSelectorQuery): string {
  if (Array.isArray(query)) {
    return query.map((v) => emitSelectorQuery(map, v)).join(', ');
  }
  if (query instanceof CssComplexSelector) {
    const left = emitSelectorQuery(map, query.left);
    const right = emitSelectorQuery(map, query.right);
    return left + ' ' + query.combinator + ' ' + right;
  }
  if (query instanceof CssClassSelector) {
    const pseudo = query.pseudo ? query.pseudo.map((p) => emitPseudoPart(map, p)).join('') : '';
    return `.${map.getClassId(query.ns.id, query.id)}${pseudo}`;
  }
  if (query instanceof CssSelector) {
    const left = query.parts.map((p) => emitSelectorPart(map, p)).join('');
    const pseudo = query.pseudo ? query.pseudo.map((p) => emitPseudoPart(map, p)).join('') : '';
    return left + pseudo;
  }
  return '';
}

function emitSelectorPart(map: CssMap, part: CssSelectorPart): string {
  switch (part.type) {
    case 'tag':
      return part.name;
    case 'universal':
      return '*';
    case 'class':
      return `.${map.getClassId(part.ns.id, part.id)}`;
    case 'attr':
      return part.value !== undefined
        ? `[${part.name}${part.op ?? '='}"${part.value}"]`
        : `[${part.name}]`;
    case 'pseudo-class':
      return part.args ? `${part.name}(${emitSelectorQuery(map, part.args)})` : part.name;
    case 'pseudo-element':
      return part.name;
    case 'self':
      return '&';
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
