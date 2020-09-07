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
    isNew && "../**/*.stories.js",
    !isNew && "../packages/component-library/stories/**/*.story.js"
  ].filter(Boolean),
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
    "@storybook/addon-docs",
    "@storybook/addon-controls"
  ]
};
