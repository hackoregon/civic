const custom = require("./webpack.config.js");

const STORYBOOK_ENV = process.env.STORYBOOK_ENV || "default";
const isNew = STORYBOOK_ENV === "new";

const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf"
};

module.exports = {
  stories: [
    isNew && "../**/index.story.js",
    !isNew && "../packages/component-library/stories/**/*.story.js"
  ].filter(Boolean),
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource"
  ],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.story\.jsx?$/,
      loaders: [
        {
          loader: require.resolve("@storybook/source-loader"),
          options: {
            prettierConfig: {
              prettierConfig
            }
          }
        }
      ],
      enforce: "pre"
    });

    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules }
    };
  }
};
