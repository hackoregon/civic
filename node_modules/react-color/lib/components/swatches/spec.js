'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Swatches = require('./Swatches');

var _Swatches2 = _interopRequireDefault(_Swatches);

var _SwatchesColor = require('./SwatchesColor');

var _SwatchesColor2 = _interopRequireDefault(_SwatchesColor);

var _SwatchesGroup = require('./SwatchesGroup');

var _SwatchesGroup2 = _interopRequireDefault(_SwatchesGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test, expect */

test('Swatches renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Swatches2.default, { hex: _color.red.hex, colors: [['#fff'], ['#333']] })).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SwatchesColor renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SwatchesColor2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SwatchesColor renders with props', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SwatchesColor2.default, { active: true, first: true, last: true })).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SwatchesGroup renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SwatchesGroup2.default, { active: _color.red.hex, group: ['#fff'] })).toJSON();
  expect(tree).toMatchSnapshot();
});