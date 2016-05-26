export {Property, PropertyFactory, DefaultPropertyFactory} from "./property";
export {RuleChildren, Rule, SelectorRule, MediaRule, KeyframesRule} from "./rule";
export {Context} from "./context";
export {Module} from "./module";
export {Visitor} from "./visitor";
export {emitCss} from "./emit_css";
export {Chunk, BundledChunk, bundle} from "./bundle";
export {uniqueProperties} from "./passes/unique_properties";
export {CompiledChunk, CompilationArtifact, compile, DefaultCompilationPasses} from "./compiler";

import {RuleChildren, SelectorRule, MediaRule, KeyframesRule} from "./rule";
import {Placeholder} from "./placeholder";
import {Module} from "./module";
import {Chunk} from "./bundle";

export function select(selectors: string | string[] | Placeholder, children: RuleChildren): SelectorRule {
  if (Array.isArray(selectors) || selectors instanceof Placeholder) {
    return new SelectorRule(selectors, children);
  }
  return new SelectorRule([selectors], children);
}

export function media(expressions: string, children: RuleChildren): MediaRule {
  return new MediaRule(expressions, children);
}

export function keyframes(id: string, children: RuleChildren): KeyframesRule {
  return new KeyframesRule(id, children);
}

export function chunk(fileName: string, modules: Module | Module[]): Chunk {
  return new Chunk(fileName, modules);
}
