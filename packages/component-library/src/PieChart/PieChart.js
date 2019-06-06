import React from "react";
import PropTypes from "prop-types";
import { VictoryPie, VictoryLabel } from "victory";
import ChartContainer from "../ChartContainer";
import civicTheme from "../VictoryTheme/CivicVictoryTheme";
import SimpleLegend from "../SimpleLegend";

const getOrElse = (possibleValue, defaultValue) =>
  possibleValue == null ? defaultValue : possibleValue;

const PieChart = props => {
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
    useLegend,
    width,
    height
  } = props;

  const x = getOrElse(dataLabel, "x");
  const y = getOrElse(dataValue, "y");
  const startAngle = halfDoughnut ? -90 : 0;
  const endAngle = halfDoughnut ? 90 : 360;
  const legendLabels = data.map(value => ({ name: value[x] }));
  const legendProps = {};

  if (useLegend) {
    legendProps.labels = () => null;
    legendProps.padding = 25;
  }

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
    >
      {useLegend && (
        <SimpleLegend
          className="legend"
          legendData={legendLabels}
          colorScale={colors}
        />
      )}
      <VictoryPie
        width={width}
        height={height}
        data={data}
        innerRadius={innerRadius}
        colorScale={colors}
        theme={civicTheme}
        animate={{
          duration: 1000
        }}
        x={x}
        y={y}
        startAngle={startAngle}
        endAngle={endAngle}
        labelComponent={
          <VictoryLabel style={{ ...civicTheme.pieLabel.style }} />
        }
        {...legendProps}
      />
    </ChartContainer>
  );
};

PieChart.defaultProps = {
  useLegend: false
};

PieChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataLabel: PropTypes.string,
  dataValue: PropTypes.string,
  error: PropTypes.string,
  halfDoughnut: PropTypes.bool,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  loading: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  useLegend: PropTypes.bool,
  width: PropTypes.number
};

export default PieChart;
