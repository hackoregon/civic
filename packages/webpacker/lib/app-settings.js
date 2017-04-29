'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getAppPaths;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAppPaths() {
  var prodDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _utils.buildDir;

  var client = 'client';
  var server = 'server';

  var srcDir = '';
  var buildDir = '';

  var pathsRc = _path2.default.join(_utils.paths.ROOT_PATH, prodDir, '.pathsrc');

  var getRcData = function getRcData() {
    var pathsRcPath = _path2.default.resolve(pathsRc);
    var srcClientPath = _path2.default.resolve(_utils.paths.ROOT_PATH, _utils.srcDir, client);
    var srcServerPath = _path2.default.resolve(_utils.paths.ROOT_PATH, _utils.srcDir, server);

    if (_fs2.default.existsSync(srcClientPath) || _fs2.default.existsSync(srcServerPath)) {
      srcDir = _utils.srcDir;
      buildDir = _utils.buildDir;
    } else if (_fs2.default.existsSync(pathsRcPath)) {
      return JSON.parse(_fs2.default.readFileSync(pathsRcPath));
    }

    return {};
  };

  var rcData = getRcData();

  return _extends({
    pathsRc: pathsRc,
    src: {
      dir: srcDir,
      client: _path2.default.join(srcDir, client),
      server: _path2.default.join(srcDir, server)
    },
    build: {
      dir: buildDir,
      client: _path2.default.join(buildDir, client),
      server: _path2.default.join(buildDir, server)
    }
  }, rcData);
}