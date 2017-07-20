const { resolve } = require('path');
const { readFileSync } = require('fs');

const pathToBabelrc = resolve(__dirname, '../babel/.babelrc');

const defaultBabelConfig = JSON.parse(
  readFileSync(pathToBabelrc).toString()
);

require('babel-register')(defaultBabelConfig);
require('babel-polyfill');
