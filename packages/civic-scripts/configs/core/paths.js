const { realpathSync, existsSync } = require('fs');
const { resolve, join } = require('path');

const logger = require('@hackoregon/civic-logger');

const coreRoot = resolve(__dirname, '..');
const applicationPath = realpathSync(process.cwd());

// resolve configurations to this module, civic-scripts/configs
function resolveArch(relativePath) {
  return resolve(coreRoot, relativePath);
}

// resolve configurations to the application
function resolveApp(relativePath) {
  return resolve(applicationPath, relativePath);
}

// check existence of app configs
function appFileExists(pathToFile) {
  const toCheck = resolveApp(pathToFile);
  if (existsSync(toCheck)) {
    return toCheck;
  }

  // default params don't dig on null, return an empty string instead
  return '';
}

// npm being somewhat non-deterministic may install our dependencis in the application's
// node_modules versus our own, resolve that here
function resolveNodeModule({ appNodeModules, archNodeModules }) {
  return function withAppliedDirectories(modulePath) {
    const maybeModuleExistsAsAppDep = join(appNodeModules, modulePath);

    return existsSync(maybeModuleExistsAsAppDep)
      ? maybeModuleExistsAsAppDep
      : join(archNodeModules, modulePath);
  };
}

// if an app's configuration directory exists and the configuration is present, we'll send it on as
// a full path
function appConfigExists(rootcivicConfigDir) {
  return function configFileExists(configFile) {
    const toCheck = resolveApp(rootcivicConfigDir);

    if (configFile === null) {
      return toCheck;
    }

    if (!existsSync(toCheck)) {
      return '';
    }

    return appFileExists(join(rootcivicConfigDir, configFile));
  };
}

const globalNodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

function civicArchetypePaths({
  production: isProduction = false,
  civicAppConfig: resolveAppConfig = appConfigExists('./.civic'),
  appRoot = applicationPath,
  appPublicPath = resolveApp('./public'),
  appServerPath = '',
  archRoot = coreRoot,
  archNodeModules = resolveArch('../node_modules'),
  webpackDevPort = 3001,
  portOverride,
  baseUrl = '',
}) {
  if (isProduction) {
    process.env.NODE_ENV = 'production';
  }

  let appPackageJson;
  try {
  // eslint-disable-next-line
  appPackageJson = require(resolveApp('package.json'));
  } catch (e) {
    logger.error('could not find application\'s package.json at:');
    logger.padLeft(resolveApp('package.json'));
    logger.warn('try running `npm init`');
    process.exit(1);
  }

  const webpackFileName = isProduction
    ? 'webpack.config.prod.js'
    : 'webpack.config.dev.js';

  const appClientEntry = isProduction
    ? resolveApp('./src/client.prod.js')
    : resolveApp('./src/client.dev.js');

  const defaultPort = isProduction ? 8080 : 3000;

  const appServerPort = process.env.PORT || portOverride || defaultPort;

  const appNodeModules = resolveApp('node_modules');
  const civicNodeModules = join(appNodeModules, '@hackoregon/civic/node_modules');
  const resolveExecutable = resolveNodeModule({ archNodeModules, appNodeModules });
  const webpackDevAddress = 'http://localhost';

  const executables = {
    babel: resolveExecutable('babel-cli/bin/babel.js'),
    babelLoader: resolveExecutable('babel-loader'),
    babelRegister: resolveExecutable('babel-register'),
    eslint: resolveExecutable('eslint/bin/eslint.js'),
    eslintLoader: resolveExecutable('eslint-loader'),
    mocha: resolveExecutable('mocha/bin/mocha'),
    multiFormatter: resolveExecutable('@hackoregon/eslint-multi-formatter'),
  };

  const configs = {
    appWebpack: resolveAppConfig(webpackFileName),
    appMochaConf: resolveAppConfig('mocha.conf.js'),
    appBabelrc: resolveApp('.babelrc'),
    appEslintrc: resolveApp('.eslintrc'),
    appServer: resolveApp('lib/server.js'),

    archBabelrc: resolveArch('babel/.babelrc'),
    archEslintrc: resolveArch('eslint/.eslintrc'),
    archMochaConf: resolveArch('mocha/mocha.conf.js'),
  };

  return {
    baseUrl,
    appRoot,
    appPublicPath,
    appServerPath,
    appServerPort,
    appClientEntry,
    appNodeModules,
    appPackageJson,

    webpackDevPort,
    webpackDevAddress,

    executables,
    configs,

    archRoot,
    archNodeModules,

    globalNodePaths,
    civicNodeModules,
  };
}

module.exports = civicArchetypePaths;
