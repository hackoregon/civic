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
    "../packages/ui-docs/docs/AboutUs/*.stories.mdx",
    "../**/src/**/*.stories.js",
    "../**/src/**/*.stories.mdx",
    "../**/docs/**/*.stories.js",
    "../**/docs/**/*.stories.mdx"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links"
  ]
};
