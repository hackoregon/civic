'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _utils = require('./utils');

var _babel = require('./babel');

var _babel2 = _interopRequireDefault(_babel);

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _entry = require('./entry');

var _entry2 = _interopRequireDefault(_entry);

var _output = require('./output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  context: _utils.paths.ROOT_PATH,
  cache: true,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: _utils.isDev ? 'source-map' : 'hidden-source-map'
};

var webpackConfig = (0, _ramda.compose)((0, _babel2.default)(), (0, _styles2.default)(), (0, _define2.default)(), (0, _fonts2.default)(), (0, _images2.default)(), (0, _plugins2.default)(), (0, _output2.default)(), (0, _entry2.default)())(config);

exports.default = webpackConfig;