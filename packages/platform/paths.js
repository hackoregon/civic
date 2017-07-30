const { resolve } = require('path');

const ROOT_DIR  = process.cwd();
const SRC_DIR   = resolve(ROOT_DIR, 'src');
const BUILD_DIR = resolve(ROOT_DIR, 'build');
const ASSETS    = resolve(SRC_DIR, 'assets');

const app = {
  ROOT_DIR,
  SRC_DIR,
  BUILD_DIR,
  ASSETS,
};

module.exports = app;
