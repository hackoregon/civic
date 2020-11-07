const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const {
  createConfig,
  match,
  css,
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
      css(),
      postcss({
        plugins: [autoprefixer({ overrideBrowserslist: ["last 2 versions"] })]
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
