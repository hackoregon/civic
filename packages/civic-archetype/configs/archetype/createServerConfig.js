const { existsSync } = require('fs');
const { join } = require('path');
const archetypeRenderer = require('./civicRenderer');
const log = require('@hackoregon/civic-logger');

// at this point we might be getting either ESM or CJS
function interOpRequire(modulePath) {
  // eslint-disable-next-line
  const module = require(modulePath);

  return module.default && module.__esModule
    ? module.default
    : module;
}

function createServerConfig(cliOptions, civicPaths) {
  const { ssrDisabled } = cliOptions;

  const {
    appRoot,
    appPackageJson,
    appServerPort,
    configs: { appServer = {} },
  } = civicPaths;

  let appServerConfig = {};
  if (existsSync(appServer)) {
    appServerConfig = interOpRequire(appServer);
  }

  const { serverConfig = {}, lifecycleFns = {} } = appServerConfig;

  const maybeRoutes = join(appRoot, 'lib/routes.js');
  let appRoutes;
  try {
    appRoutes = interOpRequire(maybeRoutes);
  } catch (e) {
    log.error('required files required to start the server were not found\n');
    log.plain(e);
    process.exit(1);
  }

  // fallback to our default renderer if the application doesn't supply it's own.
  const maybeRenderer = join(appRoot, 'lib/civicRenderer.js');
  let appRenderer;
  if (existsSync(maybeRenderer)) {
    appRenderer = interOpRequire(maybeRenderer);
  } else {
    appRenderer = archetypeRenderer(civicPaths);
  }

  // eslint-disable-next-line prefer-object-spread/prefer-object-spread
  const finalServerConfig = Object.assign({
    ssrDisabled,
    renderer: appRenderer,
    rootDir: appRoot,
    port: appServerPort,
    getRoutes: appRoutes,
    appName: appPackageJson.name,
    packageVersion: appPackageJson.version,
    // if the application has supplied an object to extend the default config, allow so here
  }, serverConfig);

  return {
    serverConfig: finalServerConfig,
    lifecycleFns,
  };
}

module.exports = createServerConfig;
