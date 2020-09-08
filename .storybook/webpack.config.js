const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const {
  createConfig,
  match,
  css,
  postcss,
  file,
  customConfig
} = require("webpack-blocks");

module.exports = createConfig([
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
  customConfig({
    externals: [
      {
        xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
      }
    ]
  }),
  match(["*.story.js"], [storySourceLoader()])
]);

function storySourceLoader() {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [
          Object.assign(
            {
              test: /\.stories\.jsx?$/,
              exclude: /\.node_modules\./,
              loaders: [require.resolve("@storybook/addon-storysource/loader")],
              enforce: "pre"
            },
            context.match // carries `test`, `exclude` & `include` as set by `match()`
          )
        ]
      }
    });
}
