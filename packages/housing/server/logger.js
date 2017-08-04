/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const log = require('@hackoregon/civic-logger');

const divider = log.info('\n=====================================\n');

module.exports = {
  error: (err) => {
    log.error(err);
  },
  appStarted: (port) => {
    log.info(`Server ready ${('✓')}`);
    log.success(`
${divider}
'Access application at:'}
${`http://localhost:${port}`}
${divider}
${`${('CTRL-C')} to exit the process`}
    `);
  },
};
