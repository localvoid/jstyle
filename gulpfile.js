const gulp = require("gulp");
const del = require("del");

function build() {
  const ts = require("gulp-typescript");
  const tslint = require("gulp-tslint");
  const merge = require("merge2");
  const tsConfig = require("./tsconfig.json");

  const result = gulp.src(["src/**/*.ts"])
    .pipe(tslint())
    .pipe(tslint.report("verbose", {
      emitError: false,
    }))
    .pipe(ts(Object.assign(tsConfig.compilerOptions, {
      typescript: require("typescript"),
      declaration: true,
    })));

  return merge([
    result.dts.pipe(gulp.dest("dist/typings")),
    result.js.pipe(gulp.dest("dist/js")),
  ]);
}

exports.build = build;
exports.default = build;