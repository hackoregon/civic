'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartData = function (_Component) {
  _inherits(ChartData, _Component);

  function ChartData() {
    _classCallCheck(this, ChartData);

    return _possibleConstructorReturn(this, (ChartData.__proto__ || Object.getPrototypeOf(ChartData)).apply(this, arguments));
  }

  _createClass(ChartData, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          xScale = _props.xScale,
          yScale = _props.yScale,
          data = _props.data;

      return { xScale: xScale, yScale: yScale, data: data };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        null,
        this.props.children
      );
    }
  }]);

  return ChartData;
}(_react.Component);

ChartData.displayName = 'ChartData';
ChartData.propTypes = {
  children: _react.PropTypes.node,
  xScale: _react.PropTypes.func,
  yScale: _react.PropTypes.func,
  data: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.number), _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.number))]).isRequired
};
ChartData.childContextTypes = {
  xScale: _react.PropTypes.func,
  yScale: _react.PropTypes.func,
  data: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.number), _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.number))])
};
exports.default = ChartData;