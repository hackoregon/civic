var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart() {
    _classCallCheck(this, Chart);

    return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
  }

  _createClass(Chart, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          width = _props.width,
          height = _props.height;
      var margin = this.props.margin;


      margin = _extends({}, margin, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      });

      return { width: width, height: height, margin: margin };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height;
      var margin = this.props.margin;


      margin = _extends({}, margin, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      });

      var insetString = 'translate(' + margin.left + ', ' + margin.top + ')';

      return React.createElement(
        'div',
        {
          className: 'chart',
          style: {
            padding: 0,
            margin: 0,
            width: width,
            height: height
          }
        },
        React.createElement(
          'svg',
          { className: 'chart-svg', width: width, height: height },
          React.createElement(
            'g',
            { className: 'chart-g-container', transform: insetString },
            this.props.children
          )
        ),
        React.createElement('div', {
          style: {
            display: 'none'
          }
        })
      );
    }
  }]);

  return Chart;
}(Component);

Chart.displayName = 'Chart';
Chart.childContextTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  })
};
Chart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.node,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  })
};
Chart.defaultProps = {
  height: 0,
  width: 0,
  margin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
export default Chart;