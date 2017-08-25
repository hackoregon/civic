'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  plugins: [new _webpack2.default.DefinePlugin({
    __DEV__: _utils.isDev,
    'process.env.NODE_ENV': JSON.stringify(_utils.env)
  })]
};