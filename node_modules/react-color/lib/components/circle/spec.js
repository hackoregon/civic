'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _CircleSwatch = require('./CircleSwatch');

var _CircleSwatch2 = _interopRequireDefault(_CircleSwatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test, expect */

test('Circle renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Circle2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('CircleSwatch renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_CircleSwatch2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('CircleSwatch renders with sizing and spacing', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_CircleSwatch2.default, { circleSize: 40, circleSpacing: 40 })).toJSON();
  expect(tree).toMatchSnapshot();
});