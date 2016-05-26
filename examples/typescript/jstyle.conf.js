require("ts-node").register({
  disableWarnings: true
});

const jstyle = require("jstyle");

module.exports = {
  chunks: [
    jstyle.chunk("main.css", require("./main").default),
  ],
};
