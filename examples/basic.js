const jstyle = require("../dist/js/jstyle");

const moduleA = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select(`div`, [
      p.background("red"),
    ])
  ]);

const moduleB = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select(`a`, [
      p.background("green"),
    ])
  ]);

const moduleC = new jstyle.Module()
  .require([moduleA, moduleB])
  .rules((c, p) => [
    jstyle.select(`p`, [
      p.background("blue"),
    ])
  ]);

const main = new jstyle.Module()
  .require([moduleA, moduleC])
  .rules((c, p) => [
    jstyle.select("html, body", [
      p.margin("0"),
      p.padding("0"),
    ])
  ]);

const context = new jstyle.Context();
const bundle = jstyle.bundle(main, context);

console.log(bundle.map((r) => jstyle.emitCss(r)).join(""));