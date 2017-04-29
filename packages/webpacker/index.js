const defaultConfig = require('./lib/webpack.config').default;
const reduceConfig = require('./lib/reduceConfig').default;
const getPaths = require('./lib/getPaths').default;
const removeEmpty = require('./lib/utils').removeEmpty;

/*
*  example usage:
*  reduceConfig(defaultConfig, {...}, {...});
*
*/

module.exports = {
  getPaths,
  reduceConfig,
  defaultConfig,
};