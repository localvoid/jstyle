const jstyle = require("jstyle");

const main = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select("html, body", [
      p.margin(c.get("margin", 0)),
      p.padding(0),
    ])
  ]);

module.exports = {
  chunks: [
    jstyle.chunk("main.css", main),
  ],
  env: () => {
    const env = new Map();
    env.set("margin", 10);
    return env;
  },
};
