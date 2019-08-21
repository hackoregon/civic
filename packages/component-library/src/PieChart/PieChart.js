import React from "react";
import PropTypes from "prop-types";
import { VictoryPie, VictoryLabel, VictoryContainer } from "victory";
import ChartContainer from "../ChartContainer";
import { VictoryTheme } from "../_Themes/index";
import SimpleLegend from "../SimpleLegend";
import DataChecker from "../utils/DataChecker";

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

  const startAngle = halfDoughnut ? -90 : 0;
  const endAngle = halfDoughnut ? 90 : 360;
  const adjustedHeight = halfDoughnut ? height / 2 : height;
  const legendLabels = data.map(value => ({ name: value[dataLabel] }));
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
      <DataChecker dataAccessors={{ dataValue }} data={data}>
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
          theme={VictoryTheme}
          animate={{
            duration: 1000
          }}
          x={dataLabel}
          y={dataValue}
          startAngle={startAngle}
          endAngle={endAngle}
          labelComponent={
            <VictoryLabel style={{ ...VictoryTheme.pieLabel.style }} />
          }
          {...legendProps}
          containerComponent={
            <VictoryContainer height={adjustedHeight} width={width} />
          }
        />
      </DataChecker>
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

PieChart.defaultProps = {
  dataLabel: "x",
  dataValue: "y"
};

export default PieChart;
