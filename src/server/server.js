require('babel-register'); // eslint-disable-line

const server = require('@hackoregon/civic-server/lib/server/server').default;

global.__DEV__ = process.env.NODE_ENV !== 'production';

const port = __DEV__ ? 3000 : 80;
const config = {
  port,
  ssrDisabled: true,
  rootDir: require('app-root-dir').get(),
  appName: require('../../package.json').name,
  version: require('../../package.json').version,
  renderer: require('../universal/renderer').default,
  getRoutes: require('../routes').default,
  NotFoundComponent: require('../universal/NotFound').default,
};

server(config).startServer();
