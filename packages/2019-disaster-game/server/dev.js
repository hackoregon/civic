const { TILESERVER } = process.env;
require("@hackoregon/dev-server")(TILESERVER ? { TILESERVER } : {});
