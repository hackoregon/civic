#!/usr/bin/env node
const { join } = require('path');

const minimist = require('minimist');
const archetypePaths = require('../configs/archetype/paths');
const log = require('@hackoregon/civic-logger');
const { version } = require('../package.json');

const cwd = process.cwd();
const givenCommand = process.argv[2];

const cliDocs = `
    civic-archetype v${version} 🌟


    Usage
      $ civic <command> <option>


    Commmands
      build                 webpack and bundle your client-side application
      lint                  ESLint your application
      test                  run mocha unit tests
      module                transpile and prepare your application as a distributable module
      start                 start the server-side application
      scaffold              create a new "Hello World!" civic application
      transpile             transpile your application's code


    Options
      -p, --production      production settings where used
      -w, --watch           watch settings where used
      -h, --hot             webpack hot dev server flag
      --webpack-dev-port    if running a webpack dev server, the given port, defaults to 3001
      --disable-ssr         disable SSR in civic-server
      --public-path         relative path to you static assets folder
      --server-address      specify a server url for webpack bundles
      --base-url            appends a base-url to webpack bundles

`;

const commandsHash = {
  build: 'running client-side webpack build',
  burnside: 'running burnside browser tests',
  coverage: 'building coverage report',
  link: 'linking modules',
  lint: 'running ESLint',
  mocha: 'running mocha unit tests',
  module: 'compiling distributable application',
  start: 'starting the application',
  supernova: 'preparing to `splode the application',
  test: 'running tests',
  server: 'starting experience server',
  scaffold: 'scaffolding new site',
  transpile: 'Babel-ifying source',
};

function validateCommand(command) {
  if (!commandsHash[command]) {
    log.plain(cliDocs);
    process.exit(1);
  } else {
    log.padLeft(`\n         civic-archetype v${version} 🌟`);
  }

  return command;
}

const minimistOptions = {
  alias: {
    w: 'watch',
    p: 'production',
    h: 'hot',
    'public-path': 'appPublicPath',
    'webpack-dev-port': 'webpackDevPort',
    'server-address': 'appServerPath',
    'server-only': 'serverOnly',
    'disable-ssr': 'ssrDisabled',
    'base-url': 'baseUrl',
  },
};

const parsedArgs = minimist(process.argv.slice(3), minimistOptions);

const configExtension = parsedArgs.config
  // eslint-disable-next-line import/no-dynamic-require
  ? require(join(cwd, parsedArgs.config))
  : {};

// eslint-disable-next-line prefer-object-spread/prefer-object-spread
const civicPathConfig = Object.assign(
  { appRoot: cwd },
  parsedArgs,
  configExtension
);

const validCommand = validateCommand(givenCommand);

const civicPaths = archetypePaths(civicPathConfig);

log.info(commandsHash[validCommand]);

// eslint-disable-next-line import/no-dynamic-require
require(`../scripts/${validCommand}`)(civicPathConfig, civicPaths);
