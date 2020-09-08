const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const {
  createConfig,
  entryPoint,
  setMode,
  setOutput,
  babel,
  file,
  css,
  postcss,
  match,
  setEnv,
  env,
  addPlugins,
  sourceMaps,
  url
} = require("webpack-blocks");

const autoprefixer = require("autoprefixer");
const { resolve } = require("path");

// When calling css as a function, the emotion babel plugin injects
// a sourceMap parameter that ruins everything.
const cssLoader = css;

const path = filePath => resolve(__dirname, filePath);

const isProd = process.env.NODE_ENV === "production";
const isFast = process.env.REFRESH_MODE === "fast";
const entryPoints = [];

if (!isProd) {
  entryPoints.unshift("webpack-hot-middleware/client?reload=true");
}

module.exports = {
  standard(opts) {
    const options = Object.assign(
      {
        entryPoint: "./src/client",
        outputPrefix: path("./")
      },
      opts
    );
    return createConfig([
      setMode(process.env.NODE_ENV || "development"),
      entryPoint([...entryPoints, options.entryPoint]),
      setOutput({
        path: `${options.outputPrefix}${isProd ? "/dist" : "/build"}`,
        publicPath: "/",
        filename: "[name].bundle.js"
      }),
      match(
        ["*.js", "!*node_modules*"],
        [
          babel({
            rootMode: "upward",
            plugins: [
              !isProd && isFast && require.resolve("react-refresh/babel")
            ].filter(Boolean)
          })
        ]
      ),
      match(
        ["*.css"],
        [
          cssLoader({ sourceMap: true }),
          postcss({
            plugins: [
              autoprefixer({ overrideBrowserslist: ["last 2 versions"] })
            ]
          })
        ]
      ),
      match(
        ["*.svg", "*.png", "*.gif", "*.jpg", "*.jpeg", "*.mp3", "*.mp4"],
        [file()]
      ),
      match(["*.ttf", "*.woff", "*.woff2", "*.eot"], [url({ limit: 100000 })]),
      setEnv({
        NODE_ENV: process.env.NODE_ENV
      }),
      addPlugins([
        new HtmlWebpackPlugin({
          inject: true,
          template: "./index.html"
        })
      ]),
      env("development", [
        sourceMaps(),
        addPlugins(
          [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new BundleAnalyzerPlugin({ openAnalyzer: false }),
            !isProd &&
              isFast &&
              new ReactRefreshWebpackPlugin({
                overlay: {
                  sockIntegration: "whm"
                }
              })
          ].filter(Boolean)
        )
      ]),
      env("production", [])
    ]);
  }
};
