import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import replace from "@rollup/plugin-replace";
import nodeGlobals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import visualizer from "rollup-plugin-visualizer";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const input = "./src/index.js";
const globals = {
  react: ["React", "useState"],
  "react-dom": "ReactDOM",
  "@emotion/core": "css",
  "emotion-theming": "ThemeProvider"
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
};
const babelOptions = {
  babelHelpers: "runtime",
  exclude: /node_modules/,
  skipPreflightCheck: true
};

export default {
  input,
  output: {
    dir: "./dist",
    format: "es",
    globals,
    name: "ui-charts"
  },
  external: Object.keys(globals),
  plugins: [
    nodeResolve(),
    babel(babelOptions),
    commonjs(commonjsOptions),
    postcss(),
    image(),
    nodeGlobals(),
    builtins(),
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    sizeSnapshot({ snapshotPath: "size-snapshot.json" }),
    visualizer()
    // uglify or terser after sizeSnapshot
  ]
};
