const { existsSync } = require('fs');
const { join } = require('path');

const logger = require('@hackoregon/civic-logger');

const removeBlackListedFlags = require('../../utils/removeBlackListedFlags');

function createRequires(...args) {
  return args.reduce((memo, curr, i, arr) => {
    if (!curr) return memo;

    // just some fancy logging, nothing to see here...
    if (i === arr.length - 1) {
      ['using mocha configuration file(s):'].concat(memo, curr)
        .filter(script => script !== '--require')
        .forEach((script, forEachIndex) => {
          if (!forEachIndex) {
            logger.info(script);
          } else {
            logger.padLeft(script);
          }
        });
    }

    return memo.concat(['--require', curr]);
  }, []);
}

function createMochaConfig(cliOpts, civicPaths) {
  const {
    archRoot,
    appRoot,
    executables: { mocha, babelRegister },
    configs: { appBabelrc, appMochaConf, archMochaConf },
  } = civicPaths;

  // predicated use upon an application supplying its own .babelrc
  const compilerArgs = ['--compilers', `js:${babelRegister}`];

  // predicated use upon an application not supplying its own .babelrc, this script registers babel
  // with the archetype's own .babelrc file
  const babelRegisterConf = join(archRoot, 'mocha/mocha.babel.js');

  // predicate value
  const appHasBabelrc = existsSync(appBabelrc);

  // create an array of `--require some.script.js --require another.js` etc.
  const requiredScripts = createRequires(
    !appHasBabelrc && babelRegisterConf,
    archMochaConf,
    appMochaConf
  );

  const blackListedFlags = [
    'recursive',
    'compilers',
    'colors',
  ];

  const additionalFlags = removeBlackListedFlags(cliOpts, blackListedFlags);

  const defaultMochaArgs = [
    '--colors',
    '--recursive', `${join(appRoot)}/src/**/*.test.js`,
  ];

  const mochaArgs = requiredScripts
    .concat(appHasBabelrc ? compilerArgs : '')
    .concat(defaultMochaArgs)
    .concat(additionalFlags)
    .filter(Boolean);

  return [
    mocha,
    mochaArgs,
  ];
}

module.exports = createMochaConfig;
