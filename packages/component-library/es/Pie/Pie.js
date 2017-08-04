var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { arc, pie } from 'd3-shape';
import './Pie.css';

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


  var createPie = pie().sort(null);
  var createArc = arc().outerRadius(props.outerRadius).innerRadius(props.innerRadius);
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

  return React.createElement(
    'g',
    { className: 'pie', transform: centerTransform },
    React.createElement(
      TransitionMotion,
      {
        defaultStyles: defaultStyles, styles: motionStyles,
        willEnter: willEnterStyle, willLeave: willLeaveStyle
      },
      function (arcStyles) {
        return React.createElement(
          'g',
          { className: 'slices' },
          arcStyles.map(function (config) {
            return React.createElement(
              Motion,
              {
                defaultStyle: _extends({}, config.style, {
                  endAngle: config.data.startAngle
                }),
                key: config.key,
                style: _extends({}, config.style, {
                  startAngle: spring(config.style.startAngle),
                  endAngle: spring(config.style.endAngle)
                })
              },
              function (arcStyle) {
                return React.createElement('path', {
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
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  style: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node
};

Pie.contextTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  })
};

export default Pie;