/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const chalk   = require('chalk');

const divider = chalk.gray('\n=====================================\n');

module.exports = {
  error: (err) => {
    console.error(chalk.red(err));
  },
  appStarted: (port) => {
    console.log(`Server up ${chalk.green('✓')}`);
    console.log(`
${chalk.bold('Access URLs:')}
${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}`)}
${divider}
${chalk.blue(`${chalk.italic('CTRL-C')} to exit the process`)}
    `);
  },
};
