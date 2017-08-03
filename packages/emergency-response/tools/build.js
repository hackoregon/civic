/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import webpack from 'webpack';
import chalk from 'chalk';
import config from '../webpack.config.prod';

const errMsg     = chalk.red;
const successMsg = chalk.green;
const warnMsg    = chalk.yellow;
const loadingMsg = chalk.blue;

process.env.NODE_ENV = 'production';

console.log(loadingMsg('Minifying...'));

webpack(config).run((error, stats) => {
  if (error) {
    console.log(errMsg(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(err => console.log(errMsg(err)));
  }

  if (jsonStats.hasWarnings) {
    console.log(warnMsg('Webpack warnings: '));
    jsonStats.warnings.map(warning => console.log(warnMsg(warning)));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log(successMsg('Production bundle available in /build.'));

  return 0;
});
