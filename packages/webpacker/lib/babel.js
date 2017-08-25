'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var babelLoader = require.resolve('babel-loader');
var babelQuery = require('@hackoregon/civic-babel-presets');

exports.default = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: babelLoader,
      query: babelQuery
    }]
  }
};