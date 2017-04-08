const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic('./build'));
app.listen(3001);