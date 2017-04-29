'use strict';

var fs = require('fs');
var glob = require('glob');
var path = require('path');

var rootDir = path.resolve(__dirname, '..');

var assetsPattern = path.resolve(rootDir, '@(build|dll)/isomorphic-assets.*');
var assetsPath = path.resolve(rootDir, 'build/public/isomorphic-assets.json');

glob(assetsPattern, function (readErr, filenames) {
  var assets = filenames.reduce(function (result, filename) {
    var fileAssets = require(filename); // eslint-disable-line

    Object.assign(result.marked, fileAssets.marked);
    Object.assign(result.chunks, fileAssets.chunks);

    return result;
  }, {
    chunks: {},
    marked: {}
  });

  fs.writeFile(assetsPath, JSON.stringify(assets, null, 2), function (err) {
    if (err) {
      throw err;
    }
  });
});