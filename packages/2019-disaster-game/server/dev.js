const { TILESERVER, SENTRYDSN } = process.env;
const devServer = require("@hackoregon/dev-server");

const config = {};

if (TILESERVER) config.TILESERVER = TILESERVER;
if (SENTRYDSN) config.SENTRYDSN = SENTRYDSN;

devServer(config);
