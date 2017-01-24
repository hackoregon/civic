'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * @fileOverview Tooltip
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _DefaultTooltipContent = require('./DefaultTooltipContent');

var _DefaultTooltipContent2 = _interopRequireDefault(_DefaultTooltipContent);

var _DOMUtils = require('../util/DOMUtils');

var _ReactUtils = require('../util/ReactUtils');

var _DataUtils = require('../util/DataUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  content: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func]),
  viewBox: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number
  }),

  active: _react.PropTypes.bool,
  separator: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  offset: _react.PropTypes.number,

  itemStyle: _react.PropTypes.object,
  labelStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  cursor: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element, _react.PropTypes.object]),

  coordinate: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),
  position: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),

  label: _react.PropTypes.any,
  payload: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.any,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    unit: _react.PropTypes.any
  })),

  isAnimationActive: _react.PropTypes.bool,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
  itemSorter: _react.PropTypes.func
};

var defaultProps = {
  active: false,
  offset: 10,
  viewBox: { x1: 0, x2: 0, y1: 0, y2: 0 },
  coordinate: { x: 0, y: 0 },
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true,
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  animationEasing: 'ease',
  animationDuration: 400,
  itemSorter: function itemSorter() {
    return -1;
  }
};

var renderContent = function renderContent(content, props) {
  if (_react2.default.isValidElement(content)) {
    return _react2.default.cloneElement(content, props);
  } else if ((0, _isFunction3.default)(content)) {
    return content(props);
  }

  return _react2.default.createElement(_DefaultTooltipContent2.default, props);
};

var Tooltip = (_temp = _class = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: 'getBBox',
    value: function getBBox() {
      if (!this.wrapperNode) {
        return null;
      }

      return this.wrapperNode.getBoundingClientRect ? this.wrapperNode.getBoundingClientRect() : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          payload = _props.payload,
          isAnimationActive = _props.isAnimationActive,
          animationDuration = _props.animationDuration,
          animationEasing = _props.animationEasing;

      var hasPayload = payload && payload.length && payload.filter(function (entry) {
        return (0, _DataUtils.isNumOrStr)(entry.value);
      }).length;
      var _props2 = this.props,
          content = _props2.content,
          viewBox = _props2.viewBox,
          coordinate = _props2.coordinate,
          position = _props2.position,
          active = _props2.active,
          offset = _props2.offset,
          wrapperStyle = _props2.wrapperStyle;

      var outerStyle = _extends({
        pointerEvents: 'none',
        visibility: active && hasPayload ? 'visible' : 'hidden',
        position: 'absolute',
        top: 0
      }, wrapperStyle);
      var translateX = void 0,
          translateY = void 0;

      if (position && (0, _DataUtils.isNumber)(position.x) && (0, _DataUtils.isNumber)(position.y)) {
        translateX = position.x;
        translateY = position.y;
      } else {
        var box = this.getBBox();

        if (box && coordinate) {
          translateX = position && (0, _DataUtils.isNumber)(position.x) ? position.x : Math.max(coordinate.x + box.width + offset > viewBox.x + viewBox.width ? coordinate.x - box.width - offset : coordinate.x + offset, viewBox.x);

          translateY = position && (0, _DataUtils.isNumber)(position.y) ? position.y : Math.max(coordinate.y + box.height + offset > viewBox.y + viewBox.height ? coordinate.y - box.height - offset : coordinate.y + offset, viewBox.y);
        } else {
          outerStyle.visibility = 'hidden';
        }
      }

      return _react2.default.createElement(
        _reactSmooth2.default,
        {
          from: 'translate(' + translateX + 'px, ' + translateY + 'px)',
          to: 'translate(' + translateX + 'px, ' + translateY + 'px)',
          duration: animationDuration,
          isActive: outerStyle.visibility === 'visible',
          easing: animationEasing,
          attributeName: 'transform'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'recharts-tooltip-wrapper',
            style: outerStyle,
            ref: function ref(node) {
              _this2.wrapperNode = node;
            }
          },
          renderContent(content, this.props)
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component), _class.displayName = 'Tooltip', _class.propTypes = propTypes, _class.defaultProps = defaultProps, _temp);
exports.default = Tooltip;