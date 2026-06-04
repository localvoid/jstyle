import type { CssClassSelector } from '../css/selector.js';
import type { CssMap, CssMapNamespace } from '../map/index.js';
import { type CssClassMap, CssClassMapState, type CssClassMapStateEntry } from '../css/core.js';
import { indent } from './utils.js';

export function emitJS(
  map: CssMap,
  ns: CssMapNamespace,
  classMaps?: CssClassMap[],
): { js: string; ts: string } {
  let js = '';
  let ts = '';

  for (const [k, v] of ns.classes.entries()) {
    const name = k.toUpperCase();
    js += `export const ${name} = "${v}";\n`;
    ts += `export const ${name}: string;\n`;
  }

  for (const [k, v] of ns.idents.entries()) {
    const name = k.toUpperCase();
    js += `export const ${name} = "${v}";\n`;
    ts += `export const ${name}: string;\n`;
  }

  for (const [k, v] of ns.dasheds.entries()) {
    const name = k.toUpperCase();
    js += `export const ${name} = "${v}";\n`;
    ts += `export const ${name}: string;\n`;
  }

  if (classMaps !== void 0) {
    for (const cm of classMaps) {
      const [mjs, mts] = emitClassMapScripts(map, cm);
      js += mjs;
      ts += mts;
    }
  }

  return { js, ts };
}

function emitClassMapScripts(map: CssMap, cm: CssClassMap): [js: string, ts: string] {
  const { name, states, inline } = cm;
  const fnPrefix = `/** ClassMap {@link ${name}} */\n` + `export const ${name}`;
  let i;
  let shift;
  let js = '';
  let ts = fnPrefix + ': (\n';

  if (inline) {
    js = fnPrefix + ' = (\n';

    for (const s of states) {
      js += `  ${s.name},\n`;
    }
    js += `) => (\n  `;
    js += classMapEmitCondExpr(
      map,
      cm.exclude,
      cm.states,
      0,
      new CssClassMapState(null, 'base', true, map.getClassId(cm.base.ns.id, cm.base.id)),
      0,
    );
    js += `\n);\n`;
  } else {
    const table = classMapCreateTable(map, cm);
    js += `const __CLASS_MAP_${name} = [\n`;
    for (const s of table) {
      js += `  "${s}",\n`;
    }
    js += `];\n`;
    js += fnPrefix + ' = (\n';

    for (const s of states) {
      js += `  ${s.name},\n`;
    }
    js += `) => (__CLASS_MAP_${name}[\n`;
    i = 0;
    shift = 0;
    while (i < states.length) {
      const s = states[i++];
      if (Array.isArray(s.value)) {
        if (shift === 0) {
          js += `  ${s.name}`;
        } else {
          js += `  (${s.name} << ${shift})`;
        }
        shift += Math.ceil(Math.log2(s.value.length));
      } else {
        js += `  (${s.name} === true ? ${1 << shift} : 0)`;
        shift++;
      }
      js += i !== states.length ? ' |\n' : '\n';
    }
    js += `]);\n`;
  }

  for (const s of states) {
    if (Array.isArray(s.value)) {
      ts += `  ${s.name}: number,\n`;
    } else {
      ts += `  ${s.name}: boolean,\n`;
    }
  }
  ts += `) => string;\n`;

  return [js, ts];
}

function classMapPopulateTable(
  map: CssMap,
  exclude: undefined | ((state: CssClassMapState) => boolean),
  states: CssClassMapStateEntry[],
  result: string[],
  stateIndex: number,
  shift: number,
  prevState: CssClassMapState,
  prevStateBits: number,
): void {
  if (exclude !== void 0 && exclude(prevState)) {
    return;
  }
  if (stateIndex === states.length) {
    result[prevStateBits] = prevState.toString();
  } else {
    const v = states[stateIndex];
    if (Array.isArray(v.value)) {
      stateIndex++;
      const j = shift + Math.ceil(Math.log2(v.value.length));
      for (let k = 0; k < v.value.length; k++) {
        const cls = v.value[k];
        classMapPopulateTable(
          map,
          exclude,
          states,
          result,
          stateIndex,
          j,
          cls == null ? prevState : prevState.push(v.name, k, map.getClassId(cls.ns.id, cls.id)),
          prevStateBits | (k << shift),
        );
      }
    } else {
      const j = stateIndex + 1;
      classMapPopulateTable(map, exclude, states, result, j, shift + 1, prevState, prevStateBits);
      classMapPopulateTable(
        map,
        exclude,
        states,
        result,
        j,
        shift + 1,
        prevState.push(v.name, true, map.getClassId(v.value.ns.id, v.value.id)),
        prevStateBits | (1 << shift),
      );
    }
  }
}

function classMapCreateTable(map: CssMap, cm: CssClassMap): string[] {
  const table = Array.from({ length: 2 ** cm.bitSize }, () => '');
  classMapPopulateTable(
    map,
    cm.exclude,
    cm.states,
    table,
    0,
    0,
    new CssClassMapState(null, 'base', true, map.getClassId(cm.base.ns.id, cm.base.id)),
    0,
  );
  while (table.length > 0) {
    if (table[table.length - 1] === '') {
      table.pop();
    } else {
      break;
    }
  }
  return table;
}

function classMapEmitCondExpr(
  map: CssMap,
  exclude: undefined | ((state: CssClassMapState) => boolean),
  states: CssClassMapStateEntry[],
  i: number,
  prevState: CssClassMapState,
  prevStateBits: number,
  depth: number = 1,
): string {
  while (i < states.length) {
    const s = states[i];
    const nextStateMask = prevStateBits | (1 << i);
    i++;
    if (exclude === void 0 || !exclude(prevState)) {
      const classSelector = s.value as CssClassSelector;
      const nextState = prevState.push(
        s.name,
        true,
        map.getClassId(classSelector.ns.id, classSelector.id),
      );
      const depth1 = depth + 1;
      let out = indent(0, `(${s.name} === true\n`);
      out += indent(depth1, '? ');
      out += classMapEmitCondExpr(map, exclude, states, i, nextState, nextStateMask, depth1);
      out += '\n';
      out += indent(depth1, ': ');
      out += classMapEmitCondExpr(map, exclude, states, i, prevState, prevStateBits, depth1);
      out += '\n';
      out += indent(depth, ')');
      return out;
    }
  }
  return `"${prevState.toString()}"`;
}
