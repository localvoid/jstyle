import {Context} from "./context";
import {bundle} from "./bundle";
import {emitCss} from "./emit_css";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

export class Compiler {
  readonly context: Context;

  constructor(context: Context) {
    this.context = context;
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
          const rules = bundle(entry.entry, this.context);
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
