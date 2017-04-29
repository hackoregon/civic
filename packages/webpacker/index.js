const defaultConfig = require('./lib/webpack.config').default;
const composeConfig = require('./lib/composeConfig').default;
const getPaths = require('./lib/getPaths').default;
const removeEmpty = require('./lib/utils').removeEmpty;

module.exports = {
  getPaths,
  removeEmpty,
  composeConfig,
  defaultConfig,
};