'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global test, expect */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Github = require('./Github');

var _Github2 = _interopRequireDefault(_Github);

var _GithubSwatch = require('./GithubSwatch');

var _GithubSwatch2 = _interopRequireDefault(_GithubSwatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Github renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Github2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Github `triangle="none"`', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Github2.default, _extends({}, _color.red, { triangle: 'none' }))).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Github `triangle="top-right"`', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Github2.default, _extends({}, _color.red, { triangle: 'top-right' }))).toJSON();
  expect(tree).toMatchSnapshot();
});

test('GithubSwatch renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_GithubSwatch2.default, { color: '#333' })).toJSON();
  expect(tree).toMatchSnapshot();
});