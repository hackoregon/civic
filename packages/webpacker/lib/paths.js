'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SRC_PATH = exports.BUNDLE_PATH = exports.ROOT_PATH = exports.PUBLIC_DIR = exports.SERVER_DIR = exports.CLIENT_DIR = exports.SRC_DIR = exports.BUILD_DIR = undefined;

var _path = require('path');

var _getPaths = require('./getPaths');

var _getPaths2 = _interopRequireDefault(_getPaths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var src = (0, _getPaths2.default)().src;

var BUILD_DIR = exports.BUILD_DIR = (0, _getPaths2.default)().build.dir || 'build';
var SRC_DIR = exports.SRC_DIR = src.dir || 'src';
var CLIENT_DIR = exports.CLIENT_DIR = src.client || 'client';
var SERVER_DIR = exports.SERVER_DIR = src.server || 'server';
var PUBLIC_DIR = exports.PUBLIC_DIR = 'public';

var ROOT_PATH = exports.ROOT_PATH = (0, _getPaths2.default)().cwd;
var BUNDLE_PATH = exports.BUNDLE_PATH = (0, _path.join)(ROOT_PATH, BUILD_DIR);
var SRC_PATH = exports.SRC_PATH = (0, _path.join)(ROOT_PATH, SRC_DIR);