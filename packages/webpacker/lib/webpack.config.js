'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _composeConfig = require('./composeConfig');

var _composeConfig2 = _interopRequireDefault(_composeConfig);

var _utils = require('./utils');

var _paths = require('./paths');

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
  context: _paths.ROOT_PATH,
  cache: true,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: _utils.isDev ? 'source-map' : 'hidden-source-map'
};

var webpackConfig = (0, _composeConfig2.default)(config, _babel2.default, _styles2.default, _define2.default, _fonts2.default, _images2.default, _plugins2.default, _output2.default, _entry2.default);

exports.default = webpackConfig;