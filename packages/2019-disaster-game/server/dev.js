const { TILESERVER, SENTRYDSN, RELOADMODE } = process.env;
const devServer = require("@hackoregon/dev-server");

const config = {};

if (TILESERVER) config.TILESERVER = TILESERVER;
if (SENTRYDSN) config.SENTRYDSN = SENTRYDSN;
if (RELOADMODE) config.RELOADMODE = RELOADMODE;

devServer(config);
