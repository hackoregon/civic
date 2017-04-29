'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _paths = require('./paths');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetsPattern = _path2.default.resolve(_paths.BUNDLE_PATH, 'isomorphic-assets.*');
var assetsPath = _path2.default.resolve(_paths.BUNDLE_PATH, _paths.PUBLIC_DIR, 'isomorphic-assets.json');

(0, _glob2.default)(assetsPattern, function (readErr, files) {
  var assets = files.reduce(function (result, file) {
    var fileAssets = require(file); // eslint-disable-line

    Object.assign(result.marked, fileAssets.marked);
    Object.assign(result.chunks, fileAssets.chunks);

    return result;
  }, {
    chunks: {},
    marked: {}
  });

  _fs2.default.writeFile(assetsPath, JSON.stringify(assets, null, 2), function (err) {
    if (err) {
      throw err;
    }
  });
});