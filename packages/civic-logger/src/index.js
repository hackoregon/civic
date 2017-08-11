require('console.table');

const colors = require('colors/safe');

const startupMessage = require('./startupMessage');

const civicMsg = colors.magenta('[☆ civic]');

function formatMyMessage(msg) {
  return `${civicMsg} ${msg}`;
}

function civicLogger(logLevel, msg) {
  // eslint-disable-next-line no-console
  console[logLevel](formatMyMessage(msg));
}

module.exports = {
  success(msg) {
    civicLogger('info', colors.green(msg));
  },
  log(msg) {
    civicLogger('log', msg);
  },
  info(msg) {
    civicLogger('info', msg);
  },
  warn(msg) {
    civicLogger('warn', colors.yellow(msg));
  },
  error(msg) {
    civicLogger('error', colors.red(msg));
  },
  plain(msg) {
    // eslint-disable-next-line no-console
    console.log(msg);
  },
  padLeft(msg) {
    // eslint-disable-next-line no-console
    console.log(`         ${msg}`);
  },
  rainbowNyan(msg) {
    const nyan = `
      ┊┊ ☆┊┊┊┊┊☆┊┊☆ ┊┊┊┊┊ ┊
      ┈┈┈┈╭━━━━━━━━╮☆ ☆ ┊ ┊
      ┈☆ ┈┈┃╳╳╳╳╳▕╲▂▂╱▏ ☆ ┊
      ┈┈☆ ┈┃╳╳╳╳╳▕▏▍▕▍▏ ┊ ┊  -(  ${msg}  )
       ┈┈╰━┫╳╳╳╳╳▕▏╰┻╯▏ ┊ ┊
      ☆ ┈┈┈┃╳╳╳╳╳╳╲▂▂╱┊ ┊ ┊
      ┊┊☆┊╰┳┳━━━━┳┳╯┊ ┊ ☆ ┊
    `;

    this.plain(colors.rainbow(nyan));
  },
  table(table) {
    // eslint-disable-next-line no-console
    console.table(table);
  },
};

module.exports.startupMessage = startupMessage;
