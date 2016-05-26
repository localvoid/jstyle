const jstyle = require("jstyle");

const main = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select(c.className("MyButton"), [
      p.margin(0),
      p.padding(0),
    ])
  ]);

module.exports = {
  chunks: [
    jstyle.chunk("main.css", main),
  ],
  minifyClassNames: true,
};
