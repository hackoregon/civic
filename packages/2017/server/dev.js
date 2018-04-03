const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const resolve = require('path').resolve;
const compression = require('compression');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const outputPath = resolve(process.cwd(), isProd ? 'dist' : 'build');
const config = require('../webpack.config.js');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

require('@hackoregon/dev-server')();