require("ts-node").register({
  disableWarnings: true
});

module.exports = {
  entries: {
    "main.css": require("./main").default,
  },
};
