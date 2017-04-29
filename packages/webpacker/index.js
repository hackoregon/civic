const defaultConfig = require('./lib/webpack.config').default;
const reduceConfig = require('./lib/reduceConfig').default;
const mergeAssets = require('./lib/mergeAssets').default;
const getPaths = require('./lib/getPaths').default;
const removeEmpty = require('./lib/utils').removeEmpty;

/*
*  example usage:
*  reduceConfig(defaultConfig, {...}, {...});
*
*/

module.exports = {
  getPaths,
  mergeAssets,
  removeEmpty,
  reduceConfig,
  defaultConfig,
};