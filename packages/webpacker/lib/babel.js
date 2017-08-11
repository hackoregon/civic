'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var babelLoader = require.resolve('babel-loader');
var babelQuery = require('@hackoregon/civic-babel-presets');

console.log(babelQuery);

exports.default = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: babelLoader,
      query: {
        presets: ['react', 'stage-1', ['es2015', { modules: false }]],
        plugins: ['transform-regenerator', 'transform-object-rest-spread', 'transform-es2015-destructuring', 'transform-class-properties', 'syntax-dynamic-import', 'dynamic-import-node']
      }
    }]
  }
};