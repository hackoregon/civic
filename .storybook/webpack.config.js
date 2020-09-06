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

// function storySourceLoader() {
//   return (context, { merge }) =>
//     merge({
//       module: {
//         rules: [
//           Object.assign(
//             {
//               test: /\.stories\.jsx?$/,
//               exclude: /\.node_modules\./,
//               loaders: [
//                 {
//                   loader: require.resolve("@storybook/source-loader"),
//                   options: {
//                     prettierConfig,
//                     uglyCommentsRegex: [/^eslint-.*/, /^global.*/]
//                   }
//                 }
//               ],
//               enforce: "pre"
//             },
//             context.match // carries `test`, `exclude` & `include` as set by `match()`
//           )
//         ]
//       }
//     });
// }

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
