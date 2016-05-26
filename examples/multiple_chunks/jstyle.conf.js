const jstyle = require("jstyle");

const base = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select("html, body", [
      p.margin(0),
      p.padding(0),
    ]),
  ]);

const A = new jstyle.Module()
  .require([base])
  .rules((c, p) => [
    jstyle.select(`a`, [
      p.background("green"),
    ]),
  ]);

const B = new jstyle.Module()
  .require([base])
  .rules((c, p) => [
    jstyle.select(`p`, [
      p.background("blue"),
    ]),
  ]);

module.exports = {
  chunks: [
    jstyle.chunk("a.css", A),
    jstyle.chunk("b.css", B),
  ],
};
