'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('./webpack.config');

Object.defineProperty(exports, 'defaultConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_webpack).default;
  }
});

var _composeConfig = require('./composeConfig');

Object.defineProperty(exports, 'composeConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_composeConfig).default;
  }
});

var _getPaths = require('./getPaths');

Object.defineProperty(exports, 'getPaths', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getPaths).default;
  }
});

var _utils = require('./utils');

Object.defineProperty(exports, 'removeEmpty', {
  enumerable: true,
  get: function get() {
    return _utils.removeEmpty;
  }
});

var _babel = require('./babel');

Object.defineProperty(exports, 'babelConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_babel).default;
  }
});

var _define = require('./define');

Object.defineProperty(exports, 'definePluginConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_define).default;
  }
});

var _entry = require('./entry');

Object.defineProperty(exports, 'entryConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_entry).default;
  }
});

var _fonts = require('./fonts');

Object.defineProperty(exports, 'fontsConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fonts).default;
  }
});

var _images = require('./images');

Object.defineProperty(exports, 'imagesConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_images).default;
  }
});

var _optimize = require('./optimize');

Object.defineProperty(exports, 'optimizePluginConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_optimize).default;
  }
});

var _output = require('./output');

Object.defineProperty(exports, 'outputConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_output).default;
  }
});

var _plugins = require('./plugins');

Object.defineProperty(exports, 'pluginsConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_plugins).default;
  }
});

var _styles = require('./styles');

Object.defineProperty(exports, 'stylesConfig', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_styles).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }