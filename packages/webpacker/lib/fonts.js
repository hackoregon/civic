'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var urlLoader = require.resolve('url-loader');
var fileLoader = require.resolve('file-loader');

exports.default = {
  module: {
    rules: [{
      test: /\.woff(2)?$/i,
      loader: urlLoader + '?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot)$/i,
      loader: fileLoader
    }]
  }
};