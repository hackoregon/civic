const path = require("path");
const { standard } = require("@hackoregon/webpack-common");

module.exports = standard({
  entryPoint: "./src/index.js",
  outputPrefix: path.resolve(__dirname)
});
