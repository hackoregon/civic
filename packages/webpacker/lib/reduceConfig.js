'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = (0, _ramda.is)(Array);
var isFunction = (0, _ramda.is)(Function);
var isObj = (0, _ramda.is)(Object);
var isUndefined = function isUndefined(value) {
  return value === undefined;
};

var unique = Symbol('unique');

var entry = function entry(dst, src) {
  if (isObj(dst) && isObj(src)) {
    return _extends({}, dst, src);
  }
  return src;
};

var name = function name(ent) {
  return isFunction(ent) || ent && isUndefined(ent.name) ? unique : ent.name;
};

var inherit = function inherit() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _ramda.mergeWithKey.apply(undefined, [function (key, dst, src) {
    if (dst === src) {
      return dst;
    }

    if (key === 'entry' || key === 'output') {
      return src;
    } else if (key === 'plugins') {
      return dst.concat(src);
    } else if (isArray(dst) && isArray(src)) {
      return (0, _ramda.reduce)(function (items, group, n) {
        return n !== unique ? items.concat(inherit.apply(undefined, _toConsumableArray(group))) : items.concat.apply(items, _toConsumableArray(group));
      }, [], (0, _ramda.groupBy)(name, dst.concat(src)));
    } else if (key === 'module') {
      if (dst.rules) {
        return { rules: src.rules.concat(dst.rules) };
      }
    }
    return undefined;
  }].concat(args));
};

var normalize = exports.normalize = function normalize(config, val) {
  if (typeof val === 'string') {
    throw new TypeError('Did not expect a string');
  } else if (typeof val === 'function') {
    return entry(config);
  }
  return val;
};

var reduceConfig = function reduceConfig() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.reduce(function (config, val) {
    return inherit(config, normalize(config, val));
  }, {});
};

exports.default = reduceConfig;