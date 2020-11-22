const webpack = require("webpack");
const {
  createConfig,
  match,
  postcss,
  file,
  customConfig,
  babel
} = require("webpack-blocks");

module.exports = createConfig([
  babel({ rootMode: "upward" }),
  match(
    ["*.css"],
    [
      postcss({
        sourceMap: true,
        config: "../"
      })
    ]
  ),
  match(["*.svg", "*.png", "*.gif", "*.jpg", "*.jpeg"], [file()]),
  match(["*.md", ".mdx"], [rawLoader()]),
  customConfig({
    externals: [
      {
        xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
      }
    ]
  })
]);

function rawLoader() {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [
          Object.assign(
            {
              test: /\.md?$/,
              loaders: [require.resolve("raw-loader")],
              enforce: "pre"
            },
            context.match // carries `test`, `exclude` & `include` as set by `match()`
          )
        ]
      }
    });
}
