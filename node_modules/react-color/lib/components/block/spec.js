'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

var _BlockSwatches = require('./BlockSwatches');

var _BlockSwatches2 = _interopRequireDefault(_BlockSwatches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test, expect */

test('Block renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Block2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Block `triangle="none"`', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Block2.default, { triangle: 'none' })).toJSON();
  expect(tree).toMatchSnapshot();
});

test('BlockSwatches renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_BlockSwatches2.default, { colors: ['#fff', '#999', '#000'] })).toJSON();
  expect(tree).toMatchSnapshot();
});