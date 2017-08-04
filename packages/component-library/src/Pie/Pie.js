import React, { PropTypes } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { arc, pie } from 'd3-shape';
import './Pie.css';

const willLeaveStyle = ({ style }) => ({
  ...style,
  startAngle: style.endAngle,
});

const willEnterStyle = ({ style }) => ({
  ...style,
  endAngle: style.startAngle,
});

const Pie = (props, context) => {
  const { width, height, data } = context;
  const { style, onClick } = props;

  const createPie = pie().sort(null);
  const createArc = arc()
    .outerRadius(props.outerRadius)
    .innerRadius(props.innerRadius);
  const pieData = createPie(data);

  const motionStyles = pieData.map((datum, index) => ({
    key: `${index}`,
    data: { ...datum, index },
    style: datum,
  }));

  const defaultStyles = pieData.map((datum, index) => ({
    key: `${index}`,
    data: { ...datum, index },
    style: { ...datum, endAngle: datum.startAngle },
  }));

  const centerTransform = `translate(${width / 2}, ${height / 2})`;

  return (
    <g className="pie" transform={centerTransform}>
      <TransitionMotion
        defaultStyles={defaultStyles} styles={motionStyles}
        willEnter={willEnterStyle} willLeave={willLeaveStyle}
      >
        {arcStyles => (
          <g className="slices">
            {arcStyles.map(config => (
              <Motion
                defaultStyle={{
                  ...config.style,
                  endAngle: config.data.startAngle,
                }}
                key={config.key}
                style={{
                  ...config.style,
                  startAngle: spring(config.style.startAngle),
                  endAngle: spring(config.style.endAngle),
                }}
              >
                {arcStyle =>
                  <path
                    d={createArc(arcStyle)}
                    style={
                      style(config.data.value, config.data.index)
                    }
                    onClick={(e) => {
                      onClick(e, config.data.value, config.data.index);
                    }}
                  />
                }
              </Motion>
                            ))}
          </g>
                    )}
      </TransitionMotion>
      {props.children}
    </g>
  );
};

Pie.displayName = 'Pie';

Pie.propTypes = {
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  style: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Pie.contextTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
};

export default Pie;
