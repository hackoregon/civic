/* eslint-disable consistent-return */

const express = require('express');
const logger  = require('./logger');
const setup   = require('./middleware');
const resolve = require('path').resolve;

const app = express();

// NOTE: for later -> app.use('/api', someApi);

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) return logger.error(err.message);

  logger.appStarted(port);
});
