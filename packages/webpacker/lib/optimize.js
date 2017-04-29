'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var optimize = require('webpack').optimize;

exports.default = {
  plugins: [new optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  })]
};