'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global test, expect */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Twitter = require('./Twitter');

var _Twitter2 = _interopRequireDefault(_Twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Twitter renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Twitter2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Twitter `triangle="none"`', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Twitter2.default, _extends({}, _color.red, { triangle: 'none' }))).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Twitter `triangle="top-right"`', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Twitter2.default, _extends({}, _color.red, { triangle: 'top-right' }))).toJSON();
  expect(tree).toMatchSnapshot();
});