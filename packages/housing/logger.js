/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const chalk   = require('chalk');

const divider = chalk.gray('\n=====================================\n');

module.exports = {
  error: (err) => {
    console.error(chalk.red(err));
  },
  appStarted: (port) => {
    console.log(`Server ready ${chalk.green('✓')}`);
    console.log(`
${divider}
${chalk.bold('Access application at:')}
${chalk.magenta(`http://localhost:${port}`)}
${divider}
${chalk.blue(`${chalk.italic('CTRL-C')} to exit the process`)}
    `);
  },
};
