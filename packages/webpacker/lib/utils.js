'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEmpty = exports.isProd = exports.isDev = exports.env = exports.staticServer = undefined;

var _paths = require('./paths');

var staticServer = exports.staticServer = 'http://localhost:3001/' + _paths.PUBLIC_DIR + '/';

var env = exports.env = process.env.NODE_ENV;
var isDev = exports.isDev = env === 'development';
var isProd = exports.isProd = env === 'production';

var removeEmpty = exports.removeEmpty = function removeEmpty(arr) {
  return arr.filter(function (item) {
    return !!item;
  });
};