import {Context} from "./context";
import {Rule} from "./rule";
import {bundle} from "./bundle";
import {flattenProperties} from "./passes/flatten_properties";
import {uniqueProperties} from "./passes/unique_properties";
import {cleanTree} from "./passes/clean_tree";
import {sortProperties} from "./passes/sort_properties";
import {emitCss} from "./emit_css";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

export class Compiler {
  readonly context: Context;
  readonly passes: Array<(rule: Rule) => Rule | null>;

  constructor(context: Context) {
    this.context = context;
    this.passes = [flattenProperties, uniqueProperties, cleanTree, sortProperties];
  }

  addPass(pass: (rule: Rule) => Rule | null): Compiler {
    this.passes.push(pass);
    return this;
  }

  compile(file: string, outFile: string): Promise<Compiler> {
    return new Promise<Compiler>((resolve, reject) => {
      if (!path.isAbsolute(file)) {
        file = path.join(process.cwd(), file);
      }
      if (!path.isAbsolute(outFile)) {
        outFile = path.join(process.cwd(), outFile);
      }
      const outDir = path.dirname(outFile);
      mkdirp(outDir, (err) => {
        if (err) {
          reject(err);
        } else {
          const entry = require(file);
          let rules = bundle(entry.entry, this.context);
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
          const result = rules.map((r) => emitCss(r)).join("");
          fs.writeFile(outFile, result, () => resolve(this));
        }
      });
    });
  }

  writeTagNames(outFile: string): Promise<Compiler> {
    return new Promise<Compiler>((resolve, reject) => {
      if (!path.isAbsolute(outFile)) {
        outFile = path.join(process.cwd(), outFile);
      }
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
      if (!path.isAbsolute(outFile)) {
        outFile = path.join(process.cwd(), outFile);
      }
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
