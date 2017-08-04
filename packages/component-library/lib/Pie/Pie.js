'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _d3Shape = require('d3-shape');

require('./Pie.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var willLeaveStyle = function willLeaveStyle(_ref) {
  var style = _ref.style;
  return _extends({}, style, {
    startAngle: style.endAngle
  });
};

var willEnterStyle = function willEnterStyle(_ref2) {
  var style = _ref2.style;
  return _extends({}, style, {
    endAngle: style.startAngle
  });
};

var Pie = function Pie(props, context) {
  var width = context.width,
      height = context.height,
      data = context.data;
  var style = props.style,
      _onClick = props.onClick;


  var createPie = (0, _d3Shape.pie)().sort(null);
  var createArc = (0, _d3Shape.arc)().outerRadius(props.outerRadius).innerRadius(props.innerRadius);
  var pieData = createPie(data);

  var motionStyles = pieData.map(function (datum, index) {
    return {
      key: '' + index,
      data: _extends({}, datum, { index: index }),
      style: datum
    };
  });

  var defaultStyles = pieData.map(function (datum, index) {
    return {
      key: '' + index,
      data: _extends({}, datum, { index: index }),
      style: _extends({}, datum, { endAngle: datum.startAngle })
    };
  });

  var centerTransform = 'translate(' + width / 2 + ', ' + height / 2 + ')';

  return _react2.default.createElement(
    'g',
    { className: 'pie', transform: centerTransform },
    _react2.default.createElement(
      _reactMotion.TransitionMotion,
      {
        defaultStyles: defaultStyles, styles: motionStyles,
        willEnter: willEnterStyle, willLeave: willLeaveStyle
      },
      function (arcStyles) {
        return _react2.default.createElement(
          'g',
          { className: 'slices' },
          arcStyles.map(function (config) {
            return _react2.default.createElement(
              _reactMotion.Motion,
              {
                defaultStyle: _extends({}, config.style, {
                  endAngle: config.data.startAngle
                }),
                key: config.key,
                style: _extends({}, config.style, {
                  startAngle: (0, _reactMotion.spring)(config.style.startAngle),
                  endAngle: (0, _reactMotion.spring)(config.style.endAngle)
                })
              },
              function (arcStyle) {
                return _react2.default.createElement('path', {
                  d: createArc(arcStyle),
                  style: style(config.data.value, config.data.index),
                  onClick: function onClick(e) {
                    _onClick(e, config.data.value, config.data.index);
                  }
                });
              }
            );
          })
        );
      }
    ),
    props.children
  );
};

Pie.displayName = 'Pie';

Pie.propTypes = {
  innerRadius: _react.PropTypes.number,
  outerRadius: _react.PropTypes.number,
  style: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  children: _react.PropTypes.node
};

Pie.contextTypes = {
  data: _react.PropTypes.arrayOf(_react.PropTypes.number),
  height: _react.PropTypes.number,
  width: _react.PropTypes.number,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number,
    right: _react.PropTypes.number
  })
};

exports.default = Pie;