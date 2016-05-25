#!/usr/bin/env node

import {Context} from "../lib/context";
import {Module} from "../lib/module";
import {Rule} from "../lib/rule";
import {bundle} from "../lib/bundle";
import {flattenProperties} from "../lib/passes/flatten_properties";
import {uniqueProperties} from "../lib/passes/unique_properties";
import {cleanTree} from "../lib/passes/clean_tree";
import {emitCss} from "../lib/emit_css";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  alias: {
    "d": "define",
    "c": "config",
    "o": "output",
  },
  string: ["define", "config", "output"],
});

function usage() {
  process.stdout.write("Usage: jstyle -c jstyle.conf.js\n\n");
  process.stdout.write("\t-c --config\t\t\tConfig file [string]\n");
  process.stdout.write("\t-o --output\t\t\tOutput directory [string]\n");
  process.stdout.write("\t-d --define\t\t\tDefine variable [key:string=value:string]\n");
}

let configPath = args["config"] || "jstyle.conf.js";
let outputPath = args["output"] || ".";

if (!path.isAbsolute(configPath)) {
  configPath = path.join(process.cwd(), configPath);
}

if (!fs.existsSync(configPath)) {
  process.stdout.write(`Cannot find config file: ${configPath}\n\n`);
  usage();
  process.exit(1);
}

if (!path.isAbsolute(outputPath)) {
  outputPath = path.join(process.cwd(), outputPath);
}

const env = {} as {[name: string]: string};
if (args["define"] !== undefined) {
  if (Array.isArray(args["define"])) {
    args["define"].map((d: string) => d.split("=")).forEach((v: [string, string]) => {
      const [key, value] = v;
      env[key] = value;
    });
  } else {
    const [key, value] = args["define"].split("=");
    env[key] = value;
  }
}

export interface CompilerConfig {
  entries: {[cssName: string]: Module};
  minifyTagNames?: string | boolean;
  minifyClassNames?: string | boolean;
}

export class CompiledEntry {
  readonly fileName: string;
  readonly result: string;

  constructor(fileName: string, result: string) {
    this.fileName = fileName;
    this.result = result;
  }
}

export class Compiler {
  readonly context: Context;
  readonly passes: Array<(rule: Rule) => Rule | null>;

  constructor() {
    this.context = new Context();
    this.passes = [flattenProperties, uniqueProperties, cleanTree];
  }

  compileEntries(entries: {[cssName: string]: Module}): Promise<Compiler> {
    const results = [] as CompiledEntry[];
    const entryFileNames = Object.keys(entries);
    for (let i = 0; i < entryFileNames.length; i++) {
      const fileName = entryFileNames[i];
      const entry = entries[fileName];

      // bundle
      let rules = bundle(entry, this.context);

      // apply transformations
      for (let i = 0; i < this.passes.length; i++) {
        let newRules = [] as Rule[];
        for (let j = 0; j < rules.length; j++) {
          const rule = this.passes[i](rules[j]);
          if (rule !== null) {
            newRules.push(rule);
          }
        }
        rules = newRules;
      }

      // emit css
      const result = rules.map((r) => emitCss(r)).join("");

      results.push(new CompiledEntry(fileName, result));
    }

    return new Promise<Compiler>((resolve, reject) => {
      let i = 0;
      const next = () => {
        if (i < results.length) {
          const entryResult = results[i++];
          const fullDirPath = path.join(outputPath, path.dirname(entryResult.fileName));
          mkdirp(fullDirPath, (err) => {
            if (err) {
             reject(err);
            } else {
              fs.writeFile(path.join(outputPath, entryResult.fileName), entryResult.result, next);
            }
          });
        } else {
          resolve(this);
        }
      };
      next();
    });
  }

  writeTagNames(outFile: string): Promise<Compiler> {
    return new Promise<Compiler>((resolve, reject) => {
      const outDir = path.dirname(outFile);
      mkdirp(outDir, (err) => {
        if (err) {
          reject(err);
        } else {
          const result = JSON.stringify(this.context.tagNameRegistry);
          fs.writeFile(outFile, result, () => resolve(this));
        }
      });
    });
  }

  writeClassNames(outFile: string): Promise<Compiler> {
    return new Promise<Compiler>((resolve, reject) => {
      const outDir = path.dirname(outFile);
      mkdirp(outDir, (err) => {
        if (err) {
          reject(err);
        } else {
          const result = JSON.stringify(this.context.classNameRegistry);
          fs.writeFile(outFile, result, () => resolve(this));
        }
      });
    });
  }
}

const configModule = require(configPath) as CompilerConfig;
const config = (typeof configModule === "function") ? configModule(env) : configModule;
const compiler = new Compiler();

if (config.entries) {
  let next = compiler.compileEntries(config.entries);
  if (config.minifyTagNames !== undefined) {
    const fileName = (typeof config.minifyTagNames === "string") ?
      config.minifyTagNames :
      "tag_names.json";
    next = next.then((c) => c.writeTagNames(path.join(outputPath, fileName)));
  }
  if (config.minifyClassNames !== undefined) {
    const fileName = (typeof config.minifyClassNames === "string") ?
      config.minifyClassNames :
      "class_names.json";
    next = next.then((c) => c.writeClassNames(path.join(outputPath, fileName)));
  }
  next.then(() => process.exit(0));
} else {
  process.exit(0);
}
