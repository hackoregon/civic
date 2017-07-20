const { existsSync } = require('fs');
const { join } = require('path');
const log = require('@hackoregon/civic-logger');

const removeBlackListedFlags = require('../../utils/removeBlackListedFlags');

const blackListedFlags = [
  'out-dir',
  'ignore',
  'extends',
  'copy-file',
];

function createBabelArgs(civicPaths, cliOptions, srcDir, destDir) {
  const {
    appRoot,
    executables: { babel },
  } = civicPaths;

  // allow extension of app's .babelrc file, else define our own as default
  const maybeBabelrc = join(appRoot, '.babelrc');
  let babelrc = join(__dirname, '.babelrc');
  if (existsSync(maybeBabelrc)) {
    babelrc = maybeBabelrc;
    log.info('using application\'s .babelrc located at:');
    log.padLeft(babelrc);
  } else {
    log.info('using archetype .babelrc located at:');
    log.padLeft(babelrc);
  }

  const additionalFlags = removeBlackListedFlags(cliOptions, blackListedFlags);

  const babelArgs = [
    babel,
    srcDir,
    '--out-dir', destDir,
    '--ignore', '*.test.js,__tests__',
    '--extends', babelrc,
    '--copy-file',
  ].concat(additionalFlags).filter(Boolean);

  // return an array for easy .apply for spawnSync
  return [
    'node',
    babelArgs,
  ];
}

module.exports = createBabelArgs;
