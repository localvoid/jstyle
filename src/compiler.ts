import { Context } from "./context";
import { Rule } from "./rule";
import { Chunk, bundle } from "./bundle";
import { emitCss } from "./emit_css";
import { uniqueProperties } from "./passes/unique_properties";
import * as postcss from "postcss";

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

export interface PostcssConfig {
    plugins?: (typeof postcss.acceptedPlugin)[];
}

const COMPILATION_PASSES = [uniqueProperties];

export function compile(
    chunks: Chunk[],
    env?: Map<string | symbol, any>,
    postcssConfig?: PostcssConfig,
    baseChunkFileName: string = "base.css",
): Promise<CompilationArtifact> {
    const context = new Context({
        env: env,
    });
    const bundledChunks = bundle(chunks, baseChunkFileName);
    const compiledChunks = [] as Promise<CompiledChunk>[];

    for (let i = 0; i < bundledChunks.length; i++) {
        const chunk = bundledChunks[i];
        let chunkRules = [] as Rule[];

        for (let j = 0; j < chunk.modules.length; j++) {
            const module = chunk.modules[j];
            chunkRules = chunkRules.concat(module.build(context));
        }

        let result = chunkRules;
        for (let j = 0; j < COMPILATION_PASSES.length; j++) {
            result = COMPILATION_PASSES[j](chunkRules);
        }

        const css = emitCss(result);

        if (css.length > 0) {
            const postcssPlugins = postcssConfig && postcssConfig.plugins || [];
            compiledChunks.push(postcss(postcssPlugins).process(css).then((r) => {
                return new CompiledChunk(chunk.fileName, r.css);
            }));
        }
    }

    return Promise.all(compiledChunks).then((r) => {
        return new CompilationArtifact(r);
    });
}
