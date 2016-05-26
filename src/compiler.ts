import {Context} from "./context";
import {Rule} from "./rule";
import {Chunk, bundle} from "./bundle";
import {emitCss} from "./emit_css";
import {uniqueProperties} from "./passes/unique_properties";

export class CompiledChunk {
  readonly fileName: string;
  readonly content: string;

  constructor(fileName: string, content: string) {
    this.fileName = fileName;
    this.content = content;
  }
}

export class CompilationArtifact {
  readonly chunks: CompiledChunk[];

  constructor(chunks: CompiledChunk[]) {
    this.chunks = chunks;
  }
}

export const DefaultCompilationPasses = [uniqueProperties];

export function compile(chunks: Chunk[], context: Context, passes: Array<(rules: Array<Rule | null>) => Rule[]>,
    baseChunkFileName: string): CompilationArtifact {

  const bundledChunks = bundle(chunks, baseChunkFileName);
  const compiledChunks = [] as CompiledChunk[];

  for (let i = 0; i < bundledChunks.length; i++) {
    const chunk = bundledChunks[i];
    let chunkRules = [] as Rule[];

    for (let j = 0; j < chunk.modules.length; j++) {
      const module = chunk.modules[j];
      chunkRules = chunkRules.concat(module.build(context));
    }

    let result = chunkRules;
    for (let j = 0; j < passes.length; j++) {
      result = passes[j](chunkRules);
    }

    const css = emitCss(result);
    if (css.length > 0) {
      compiledChunks.push(new CompiledChunk(chunk.fileName, css));
    }
  }

  return new CompilationArtifact(compiledChunks);
}
