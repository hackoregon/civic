---
to: packages/<%=year%>-<%=packageTitle%>/webpack.config.js
---
const path = require("path");
const { standard } = require("@hackoregon/webpack-common");

module.exports = standard({
  outputPrefix: path.resolve(__dirname)
});
