import * as fs from 'node:fs/promises';
import { dirname, join, resolve as presolve, relative } from 'node:path';
import { styleText } from 'node:util';
import { compressAsset } from 'assetcraft/compress';
import {
  calculateHash,
  cleanDirRecursive,
  formatFileSize,
  pathIsWithin,
  uniqueFileName,
  updateFile,
} from 'assetcraft/file';
import {
  type Manifest,
  importManifests,
  MANIFEST_ASSET_COMPRESSED_BROTLI,
  MANIFEST_ASSET_COMPRESSED_GZIP,
  MANIFEST_ASSET_COMPRESSED_ZSTD,
  MANIFEST_ASSET_IMMUTABLE,
} from 'assetcraft/manifest';
import { ManifestBuilder } from 'assetcraft/manifest/build';
import { transform } from 'lightningcss';

import type { CssClassMap, CssNode } from './css/core.js';
import { emitCssCode } from './emit/css.js';
import { emitJS } from './emit/js.js';
import { emitRust } from './emit/rust.js';
import { CssMap } from './map/index.js';

export interface EmitCssOptions {
  readonly input: EmitCssInputEntry[];
  readonly outDir: string;
  readonly renderURL: (name: string, sha256: string) => string;
  readonly manifest?: string;
  readonly map?: string;
  readonly js?: string;
  readonly rust?: string;
  readonly assets?: string[];
  readonly headers?: Record<string, string>;
  readonly minify?: boolean;
  readonly clean?: EmitCssCleanOptions | true;
}

export interface EmitCssInputEntry {
  readonly name: string;
  readonly build: BuildCssFunction;
  readonly tags?: string[];
  readonly headers?: Record<string, string>;
}

export interface EmitCssCleanOptions {
  readonly css?: boolean;
  readonly js?: boolean;
}

export interface BuildCssContext {
  resolve(name: string): string;
}

export interface BuildCssArtifact {
  readonly css: CssNode;
  readonly links?: string;
  readonly headers?: Record<string, string>;
}

export type BuildCssFunction = (ctx: BuildCssContext) => Promise<BuildCssArtifact>;

export async function emitCss(options: EmitCssOptions): Promise<Manifest> {
  const outDir = options.outDir;
  const manifestRelPath = options.manifest ?? join(outDir, 'manifest.json');
  const manifestAbsDirname = dirname(presolve(manifestRelPath));
  const renderURL = options.renderURL;
  const cssMapPath = options.map;
  const minify = options.minify ?? false;

  let cleanCSS = false;
  let cleanJS = false;
  if (options.clean !== void 0) {
    if (typeof options.clean === 'boolean') {
      if (options.clean === true) {
        cleanCSS = true;
        cleanJS = true;
      }
    } else {
      cleanCSS = options.clean.css ?? false;
      cleanJS = options.clean.js ?? false;
    }
  }

  let prevManifest: any;
  try {
    prevManifest = JSON.parse(await fs.readFile(manifestRelPath, 'utf8'));
  } catch {}
  const manifestBuilder = new ManifestBuilder(prevManifest);

  if (options.assets) {
    for (const manifest of await importManifests(options.assets)) {
      manifestBuilder.import(manifest.manifest);
    }
  }

  const cssMap = new CssMap();
  if (cssMapPath) {
    try {
      const mapData = await fs.readFile(cssMapPath, 'utf8');
      cssMap.deserialize(mapData);
    } catch {}
  }

  const resolve = (name: string): string => {
    const entry = manifestBuilder.getByName(name);
    if (entry === void 0) {
      throw new Error(`Unable to find asset with a name '${name}'.`);
    }
    if (typeof entry.url === 'string') {
      return entry.url;
    }
    return entry.url.origin + entry.url.path;
  };

  const ctx: BuildCssContext = { resolve };
  const generatedFiles = [];
  if (pathIsWithin(outDir, manifestRelPath)) {
    generatedFiles.push(relative(outDir, manifestRelPath));
  }
  for (const entry of options.input) {
    const classMaps = new Map<string, CssClassMap[]>();
    const name = entry.name;
    const result = await entry.build(ctx);
    const links = result.links;
    const code = UTF8_ENCODER.encode(emitCssCode(cssMap, classMaps, result.css));
    const sha256 = calculateHash(code);
    const fileBaseName = uniqueFileName(name, sha256);
    const filePath = join(outDir, fileBaseName);
    const path = relative(manifestAbsDirname, filePath);
    const url = renderURL(name, sha256);
    let flags = MANIFEST_ASSET_IMMUTABLE;
    let headers = options.headers;
    if (result.headers) {
      headers = { ...headers, ...result.headers };
    }
    if (entry.headers) {
      headers = { ...headers, ...entry.headers };
    }

    const transformed = transform({
      filename: name,
      code,
      minify,
      visitor: {
        Url(url) {
          const n = url.url;
          if (n.startsWith('url:')) {
            url.url = resolve(n.slice(4));
          }
        },
      },
    });

    generatedFiles.push(fileBaseName);

    if (await updateFile(filePath, transformed.code, true)) {
      let logLine = `[CSS] ${name}: ${fileBaseName} (${formatFileSize(code.length)})`;
      for (const c of compressAsset(transformed.code)) {
        switch (c.format) {
          case 'gzip':
            await fs.writeFile(join(outDir, filePath + '.gz'), c.content);
            flags |= MANIFEST_ASSET_COMPRESSED_GZIP;
            logLine += ' gzip';
            break;
          case 'brotli':
            await fs.writeFile(join(outDir, filePath + '.br'), c.content);
            flags |= MANIFEST_ASSET_COMPRESSED_BROTLI;
            logLine += ' brotli';
            break;
          case 'zstd':
            await fs.writeFile(join(outDir, filePath + '.zst'), c.content);
            flags |= MANIFEST_ASSET_COMPRESSED_ZSTD;
            logLine += ' zstd';
            break;
        }
      }
      manifestBuilder.add({
        type: 'css',
        mime: 'text/css',
        flags,
        url,
        path,
        sha256,
        name,
        headers,
      });
      console.log(styleText('green', `${logLine}\n`));
    } else {
      manifestBuilder.updateByPath(path, (entry) => {
        if (entry.type !== 'css') {
          throw new Error(`Invalid manifest entry type '${entry.type}', expected 'css' type.`);
        }
        return {
          ...entry,
          url,
          name,
          links,
          headers,
        };
      });
    }

    await updateFile(manifestRelPath, JSON.stringify(manifestBuilder.entries, void 0, 2), true);
    if (cleanCSS) {
      await cleanDirRecursive(outDir, generatedFiles);
    }
    if (cssMapPath) {
      await updateFile(cssMapPath, cssMap.serialize());
    }

    if (options.js) {
      const generatedJS = [];
      for (const m of cssMap.namespaces.values()) {
        const { js, ts } = emitJS(cssMap, m, classMaps.get(m.id));
        const fileName = m.id.replaceAll('.', '/');
        const path = join(options.js, fileName);

        generatedJS.push(fileName + '.js');
        await updateFile(path + '.js', js, true);
        generatedJS.push(fileName + '.d.ts');
        await updateFile(path + '.d.ts', ts, true);
      }
      if (cleanJS) {
        await cleanDirRecursive(options.js, generatedJS);
      }
    }

    if (options.rust) {
      await updateFile(options.rust, emitRust(cssMap), true);
    }
  }

  return manifestBuilder.entries;
}

const UTF8_ENCODER = new TextEncoder();
