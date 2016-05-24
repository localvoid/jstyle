import {Context} from "./context";
import {Module} from "./module";
import {Rule} from "./rule";

function _collectModuleDependencies(m: Module, result: Module[], visited: Map<number, Module>): void {
  visited.set(m.id, m);
  for (let i = 0; i < m.dependencies.length; i++) {
    const dep = m.dependencies[i];
    if (!visited.has(dep.id)) {
      _collectModuleDependencies(dep, result, visited);
    }
  }
  result.push(m);
}

/**
 * Collect module dependencies.
 */
function collectModuleDependencies(m: Module): Module[] {
  const result = [] as Module[];
  _collectModuleDependencies(m, result, new Map<number, Module>());
  return result;
}

/**
 * Build module.
 */
export function bundle(m: Module, context: Context): Rule[] {
  let result = [] as Rule[];
  const dependencies = collectModuleDependencies(m);
  for (let i = 0; i < dependencies.length; i++) {
    result = result.concat(dependencies[i].build(context));
  }
  return result;
}
