const flow = require('lodash.flow');
const logger = require('@hackoregon/civic-logger');

const sharedConfig = require('./slice/shared');
const prodConfig = require('./slice/prod');
const devConfig = require('./slice/dev');
const hotConfig = require('./slice/hot');
const dashboardConfig = require('./slice/dash');
const colocatedStyles = require('./slice/colocatedStyles');


// we'll take either an object or a function and allow it to exend the the webpack configuration
// eslint-disable-next-line consistent-return
function appWebpackExtender(relativePathToExtension) {
  if (!relativePathToExtension) {
    return null;
  }

  logger.info('using webpack configuration extension at:');
  logger.padLeft(relativePathToExtension);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const transientExtension = require(relativePathToExtension);

  if (typeof transientExtension === 'function') {
    return () => transientExtension;
  }

  logger.error('webpack extension must a function');
  process.exit(1);
}

function createWebpackConfig(cliOpts, civicPaths) {
  const {
    dashboard,
    styles,
    hot,
    production: isProduction,
  } = cliOpts;

  const { configs: { appWebpack } } = civicPaths;

  const configExtension = appWebpackExtender(appWebpack);

  const flowFns = [
    // allow the application to extend the configuration, but do so last.
    configExtension,
    // allow the application to co-locate stylesheets, will not add loaders
    styles && colocatedStyles,
    dashboard && dashboardConfig,
    // if running a dash board, it's assumed we're hot
    (hot || dashboard) && hotConfig,
    isProduction ? prodConfig : devConfig,
  ].filter(Boolean).map(fn => fn(civicPaths, cliOpts));

  // create the initial configuration and flow through a chain of configuration slices
  return flow(...flowFns)(sharedConfig(cliOpts, civicPaths));
}

module.exports = createWebpackConfig;
