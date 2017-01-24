'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _color = require('../../helpers/color');

var _Sketch = require('./Sketch');

var _Sketch2 = _interopRequireDefault(_Sketch);

var _SketchFields = require('./SketchFields');

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _SketchPresetColors = require('./SketchPresetColors');

var _SketchPresetColors2 = _interopRequireDefault(_SketchPresetColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test, expect */

test('Sketch renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Sketch2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Sketch renders on server correctly', () => {
//   const tree = renderer.create(
//     <Sketch renderers={{ canvas }} { ...red } />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })

// import canvas from 'canvas'

test('SketchFields renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SketchFields2.default, _color.red)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SketchPresetColors renders correctly', function () {
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SketchPresetColors2.default, { colors: ['#fff', '#999', '#000'] })).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SketchPresetColors with custom titles renders correctly', function () {
  var colors = [{
    color: '#fff',
    title: 'white'
  }, {
    color: '#999',
    title: 'gray'
  }, {
    color: '#000'
  }, '#f00'];
  var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_SketchPresetColors2.default, { colors: colors })).toJSON();
  expect(tree).toMatchSnapshot();
});