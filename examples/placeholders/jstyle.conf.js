const jstyle = require("jstyle");

const moduleA = new jstyle.Module()
  .rules((c, p) => [
    jstyle.select(c.placeholder("buttons"), [
      p.background("red"),
    ])
  ]);

const main = new jstyle.Module()
  .require([moduleA])
  .init((c) => {
    c.placeholder("buttons")
      .add(c.className("MyButton1"))
      .add(c.className("MyButton2"));
  })
  .rules((c, p) => [
    jstyle.select("html, body", [
      p.margin(0),
      p.padding(0),
    ])
  ]);

module.exports = {
  chunks: [
    jstyle.chunk("main.css", main),
  ],
};
