import React, { PropTypes } from 'react';
import { VictoryPie } from 'victory';
import civicTheme from '../VictoryTheme/CivicVictoryTheme.js';

const getOrElse = (possibleValue, defaultValue) => (
  possibleValue == null ? defaultValue : possibleValue
);

const PieChart = (props) => {
  const {
    colors,
    data,
    labelKey,
    dataKey,
    innerRadius,
  } = props;

  const height = getOrElse(props.height, '100vh');
  const width = getOrElse(props.width, '100vw');
  const x = getOrElse(labelKey, 'x');
  const y = getOrElse(dataKey, 'y');

  const containerStyle = {
    width,
    height,
  };

  return (
    <div className="pie-chart-container" style={containerStyle}>
      <VictoryPie
        data={data}
        innerRadius={innerRadius}
        colorScale={colors}
        theme={civicTheme}
        animate={{
          duration: 1000
        }}
        x={x}
        y={y}
      />
    </div>
  )
};

PieChart.defaultProps = {
  height: '100vh',
  width: '100vw',
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  innerRadius: PropTypes.number,
  colorScale: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PieChart;