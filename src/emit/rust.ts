import type { CssMap, CssMapNamespace } from '../map/index.js';
import { indent } from './utils.js';

interface RustModule {
  children: Map<string, RustModule>;
  id: string;
  ns: CssMapNamespace | null;
}

export function emitRust(map: CssMap): string {
  const root: RustModule = { children: new Map(), id: '', ns: null };
  let c = '#![allow(non_snake_case, non_upper_case_globals)]\n\n';

  for (const ns of map.namespaces.values()) {
    const path = ns.id.split('.');
    let node = root;
    for (let i = 0; i < path.length; i++) {
      const id = path[i];
      let n = node.children.get(id);
      if (n === void 0) {
        node.children.set(id, (n = { children: new Map(), id, ns: null }));
      }
      node = n;
    }
    node.ns = ns;
  }

  for (const m of root.children.values()) {
    c += _emitRust(m, 0);
  }

  return c;
}

function _emitRust(module: RustModule, depth: number): string {
  const ns = module.ns;
  const children = module.children;
  const depth1 = depth + 2;
  let c = indent(depth, `pub mod ${module.id} {\n`);

  if (ns !== null) {
    for (const [k, v] of ns.classes.entries()) {
      c += indent(depth1, `pub const ${k}: &'static str = "${v}";\n`);
    }
    for (const [k, v] of ns.idents.entries()) {
      c += indent(depth1, `pub const ${k}: &'static str = "${v}";\n`);
    }
    for (const [k, v] of ns.dasheds.entries()) {
      c += indent(depth1, `pub const ${k}: &'static str = "${v}";\n`);
    }
  }
  if (children.size > 0) {
    for (const m of children.values()) {
      c += _emitRust(m, depth1);
    }
  }

  c += indent(depth, '}\n');

  return c;
}
