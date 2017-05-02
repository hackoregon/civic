const express = require('express');
const serveStatic = require('serve-static');

const app = express();
const port = process.env.NODE_ENV !== 'production' ? 3000 : 8080;
app.use(serveStatic('./build'));
app.listen(port);
