'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Chrome = require('./Chrome');

var _Chrome2 = _interopRequireDefault(_Chrome);

var _ChromeFields = require('./ChromeFields');

var _ChromeFields2 = _interopRequireDefault(_ChromeFields);

var _ChromePointer = require('./ChromePointer');

var _ChromePointer2 = _interopRequireDefault(_ChromePointer);

var _ChromePointerCircle = require('./ChromePointerCircle');

var _ChromePointerCircle2 = _interopRequireDefault(_ChromePointerCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import canvas from 'canvas'

test('Chrome renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Chrome2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Chrome renders on server correctly', () => {
//   const tree = renderer.create(
//     <Chrome renderers={{ canvas }} { ...red } />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })

/* global test, expect */

test('ChromeFields renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ChromeFields2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('ChromePointer renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ChromePointer2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('ChromePointerCircle renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_ChromePointerCircle2.default, null)).toJSON();
  expect(tree).toMatchSnapshot();
});