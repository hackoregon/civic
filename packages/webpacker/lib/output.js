'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _paths = require('./paths');

exports.default = {
  output: {
    path: _paths.BUNDLE_PATH + '/' + _paths.PUBLIC_DIR + '/',
    publicPath: _utils.staticServer,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js'
  }
};