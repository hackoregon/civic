'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _paths = require('./paths');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  entry: {
    app: [
    // resolve(SRC_PATH, 'webpack-public-path'),
    (0, _path.join)(_paths.SRC_PATH, 'client/index.js')],
    vendor: ['react', 'react-dom', 'react-helmet', 'react-redux', 'react-router', 'leaflet']
  },
  plugins: [new _webpack2.default.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['app'],
    filename: 'js/[name].bundle.js',
    minChunks: function minChunks(_ref) {
      var resource = _ref.resource;
      return (/node_modules/.test(resource)
      );
    }
  }), new _webpack2.default.optimize.CommonsChunkPlugin({
    name: 'vendor-css',
    chunks: ['app'],
    filename: 'css/[name].[chunkHash].css',
    minChunks: function minChunks(_ref2) {
      var resource = _ref2.resource;
      return (/node_modules/.test(resource)
      );
    }
  })]
};