'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _paths = require('./paths');

exports.default = {
  entry: {
    app: [
    // resolve(SRC_PATH, 'webpack-public-path'),
    (0, _path.join)(_paths.SRC_PATH, 'client/index.js')],
    vendor: ['react', 'react-dom', 'react-helmet', 'react-redux', 'react-router', 'leaflet']
  }
};