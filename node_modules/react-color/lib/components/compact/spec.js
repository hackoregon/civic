'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Compact = require('./Compact');

var _Compact2 = _interopRequireDefault(_Compact);

var _CompactColor = require('./CompactColor');

var _CompactColor2 = _interopRequireDefault(_CompactColor);

var _CompactFields = require('./CompactFields');

var _CompactFields2 = _interopRequireDefault(_CompactFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test, expect */

test('Compact renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Compact2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('CompactColor renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_CompactColor2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('CompactFields renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_CompactFields2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});