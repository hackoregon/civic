'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Cartesian Grid
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartesianGrid = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(CartesianGrid, _Component);

  function CartesianGrid() {
    _classCallCheck(this, CartesianGrid);

    return _possibleConstructorReturn(this, (CartesianGrid.__proto__ || Object.getPrototypeOf(CartesianGrid)).apply(this, arguments));
  }

  _createClass(CartesianGrid, [{
    key: 'renderHorizontal',


    /**
     * Draw the horizontal grid lines
     * @param {Array} horizontalPoints either passed in as props or generated from function
     * @return {Group} Horizontal lines
     */
    value: function renderHorizontal(horizontalPoints) {
      var _props = this.props,
          x = _props.x,
          width = _props.width;


      if (!horizontalPoints || !horizontalPoints.length) {
        return null;
      }

      var props = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var items = horizontalPoints.map(function (entry, i) {
        return _react2.default.createElement('line', _extends({}, props, { fill: 'none', key: 'line-' + i, x1: x, y1: entry, x2: x + width, y2: entry }));
      });

      return _react2.default.createElement(
        'g',
        { className: 'recharts-cartesian-grid-horizontal' },
        items
      );
    }

    /**
     * Draw vertical grid lines
     * @param {Array} verticalPoints either passed in as props or generated from function
     * @return {Group} Vertical lines
     */

  }, {
    key: 'renderVertical',
    value: function renderVertical(verticalPoints) {
      var _props2 = this.props,
          y = _props2.y,
          height = _props2.height;


      if (!verticalPoints || !verticalPoints.length) {
        return null;
      }

      var props = (0, _ReactUtils.getPresentationAttributes)(this.props);

      var items = verticalPoints.map(function (entry, i) {
        return _react2.default.createElement('line', _extends({}, props, { fill: 'none', key: 'line-' + i, x1: entry, y1: y, x2: entry, y2: y + height }));
      });

      return _react2.default.createElement(
        'g',
        { className: 'recharts-cartesian-grid-vertical' },
        items
      );
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground() {
      var fill = this.props.fill;


      if (!fill || fill === 'none') {
        return null;
      }

      var _props3 = this.props,
          fillOpacity = _props3.fillOpacity,
          x = _props3.x,
          y = _props3.y,
          width = _props3.width,
          height = _props3.height;


      return _react2.default.createElement('rect', {
        x: x,
        y: y,
        width: width,
        height: height,
        stroke: 'none',
        fill: fill,
        fillOpacity: fillOpacity,
        className: 'recharts-cartesian-grid-bg'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          x = _props4.x,
          y = _props4.y,
          width = _props4.width,
          height = _props4.height,
          horizontal = _props4.horizontal,
          vertical = _props4.vertical,
          horizontalCoordinatesGenerator = _props4.horizontalCoordinatesGenerator,
          verticalCoordinatesGenerator = _props4.verticalCoordinatesGenerator,
          xAxis = _props4.xAxis,
          yAxis = _props4.yAxis,
          offset = _props4.offset,
          chartWidth = _props4.chartWidth,
          chartHeight = _props4.chartHeight;


      if (width <= 0 || height <= 0 || x !== +x || y !== +y) {
        return null;
      }

      var _props5 = this.props,
          horizontalPoints = _props5.horizontalPoints,
          verticalPoints = _props5.verticalPoints;


      if ((0, _isFunction3.default)(horizontalCoordinatesGenerator)) {
        horizontalPoints = horizontalCoordinatesGenerator({ yAxis: yAxis, width: chartWidth,
          height: chartHeight, offset: offset });
      }

      if ((0, _isFunction3.default)(verticalCoordinatesGenerator)) {
        verticalPoints = verticalCoordinatesGenerator({ xAxis: xAxis, width: chartWidth,
          height: chartHeight, offset: offset });
      }

      return _react2.default.createElement(
        'g',
        { className: 'recharts-cartesian-grid' },
        this.renderBackground(),
        horizontal && this.renderHorizontal(horizontalPoints),
        vertical && this.renderVertical(verticalPoints)
      );
    }
  }]);

  return CartesianGrid;
}(_react.Component), _class2.displayName = 'CartesianGrid', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  horizontal: _react.PropTypes.bool,
  vertical: _react.PropTypes.bool,
  horizontalPoints: _react.PropTypes.arrayOf(_react.PropTypes.number),
  verticalPoints: _react.PropTypes.arrayOf(_react.PropTypes.number),
  horizontalCoordinatesGenerator: _react.PropTypes.func,
  verticalCoordinatesGenerator: _react.PropTypes.func,
  xAxis: _react.PropTypes.object,
  yAxis: _react.PropTypes.object,
  offset: _react.PropTypes.object,
  chartWidth: _react.PropTypes.number,
  chartHeight: _react.PropTypes.number
}), _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],

  stroke: '#ccc',
  fill: 'none'
}, _temp)) || _class;

exports.default = CartesianGrid;