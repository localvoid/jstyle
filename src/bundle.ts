import {Module} from "./module";

class ModuleData {
  readonly module: Module;
  readonly chunks: Set<number>;
  chunksLength: number;

  constructor(module: Module) {
    this.module = module;
    this.chunks = new Set<number>();
    this.chunksLength = 0;
  }

  addChunkId(entryId: number): void {
    this.chunks.add(entryId);
    this.chunksLength += 1;
  }
}

function _collectDeps(chunkId: number, module: Module, registry: Map<number, ModuleData>,
    sortedModules: ModuleData[]): void {
  let data = registry.get(module.id);
  let addModule = false;
  if (data === undefined) {
    data = new ModuleData(module);
    registry.set(module.id, data);
    addModule = true;
  } else if (data.chunks.has(chunkId)) {
    return;
  }
  data.addChunkId(chunkId);

  for (let i = 0; i < module.dependencies.length; i++) {
    _collectDeps(chunkId, module.dependencies[i], registry, sortedModules);
  }

  if (addModule) {
    sortedModules.push(data);
  }
}

export class Chunk {
  readonly fileName: string;
  readonly entry: Module | Module[];

  constructor(fileName: string, entry: Module | Module[]) {
    this.fileName = fileName;
    this.entry = entry;
  }
}

export class BundledChunk {
  readonly fileName: string;
  readonly modules: Module[];

  constructor(fileName: string) {
    this.fileName = fileName;
    this.modules = [];
  }

  addModule(module: Module) {
    this.modules.push(module);
  }
}

export function bundle(chunks: Chunk[], baseChunkFileName: string): BundledChunk[] {
  const moduleRegistry = new Map<number, ModuleData>();
  const sortedModules = [] as ModuleData[];

  const bundledChunks = [] as BundledChunk[];
  bundledChunks.push(new BundledChunk(baseChunkFileName));

  for (let i = 0; i < chunks.length; i++) {
    bundledChunks.push(new BundledChunk(chunks[i].fileName));
  }

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (Array.isArray(chunk.entry)) {
      for (let j = 0; j < chunk.entry.length; j++) {
        const entry = chunk.entry[j];
        _collectDeps(i, entry, moduleRegistry, sortedModules);
      }
    } else {
      _collectDeps(i, chunk.entry, moduleRegistry, sortedModules);
    }
  }

  for (let i = 0; i < sortedModules.length; i++) {
    const moduleData = sortedModules[i];
    if (moduleData.chunksLength > 1) {
      bundledChunks[0].addModule(moduleData.module);
    } else {
      const chunkId = moduleData.chunks.keys().next().value;
      bundledChunks[chunkId + 1].addModule(moduleData.module);
    }
  }

  return bundledChunks;
}
