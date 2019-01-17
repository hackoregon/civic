import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel } from 'victory';
import ChartContainer from '../ChartContainer';
import civicTheme from '../VictoryTheme/CivicVictoryTheme.js';

const getOrElse = (possibleValue, defaultValue) => (
  possibleValue == null ? defaultValue : possibleValue
);

const PieChart = (props) => {
  const {
    title,
    subtitle,
    colors,
    data,
    dataValue,
    dataLabel,
    innerRadius,
    loading,
    error,
    halfDoughnut,
    width,
    height,
  } = props;

  const x = getOrElse(dataLabel, 'x');
  const y = getOrElse(dataValue, 'y');
  const startAngle = halfDoughnut ? -90 : 0;
  const endAngle = halfDoughnut ? 90 : 360;

  return (
    <ChartContainer title={title} subtitle={subtitle} loading={loading} error={error}>
      <VictoryPie
        width={width}
        height={height}
        data={data}
        innerRadius={innerRadius}
        colorScale={colors}
        theme={civicTheme}
        animate={{
          duration: 1000,
        }}
        x={x}
        y={y}
        startAngle={startAngle}
        endAngle={endAngle}
        labelComponent={<VictoryLabel style={{ ...civicTheme.pieLabel.style }} />}
      />
    </ChartContainer>
  );
};

PieChart.defaultProps = {
};

PieChart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  innerRadius: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  halfDoughnut: PropTypes.bool,
};

export default PieChart;
