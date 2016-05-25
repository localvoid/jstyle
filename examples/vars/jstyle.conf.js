const jstyle = require("jstyle");

const main = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select("html, body", [
      p.margin(c.get("margin", 0)),
      p.padding(0),
    ])
  ]);

module.exports = {
  entries: {
    "main.css": main,
  },
  env: {
    "margin": 10,
  },
};
