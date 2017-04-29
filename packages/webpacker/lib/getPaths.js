'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getPaths;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootDir = _path2.default.resolve(__dirname, '..');

function getPaths() {
  var prodDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'build';

  var client = 'client';
  var server = 'server';

  var srcDir = '';
  var buildDir = '';

  var pathsRc = _path2.default.join(rootDir, prodDir, '.pathsrc');

  var getRcData = function getRcData() {
    var pathsRcPath = _path2.default.resolve(pathsRc);
    var srcClientPath = _path2.default.resolve(rootDir, 'src', client);
    var srcServerPath = _path2.default.resolve(rootDir, 'src', server);

    if (_fs2.default.existsSync(srcClientPath) || _fs2.default.existsSync(srcServerPath)) {
      srcDir = 'src';
      buildDir = 'build';
    } else if (_fs2.default.existsSync(pathsRcPath)) {
      return JSON.parse(_fs2.default.readFileSync(pathsRcPath));
    }

    return {};
  };

  var rcData = getRcData();

  return _extends({
    rootDir: rootDir,
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