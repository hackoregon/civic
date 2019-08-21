import PropTypes from "prop-types";
import React from "react";
import { groupBy } from "lodash";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip,
  VictoryStack,
  VictoryArea
} from "victory";

import shortid from "shortid";
import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import civicFormat from "../utils/civicFormat";
import DataChecker from "../utils/DataChecker";

import {
  chartEvents,
  getDefaultStackedDomain,
  getDefaultDataSeriesLabels,
  getDefaultAreaStyle
} from "../utils/chartHelpers";
import { VictoryTheme } from "../_Themes/index";

const StackedAreaChart = ({
  data,
  dataKey,
  dataKeyLabel,
  dataValue,
  dataValueLabel,
  dataSeries,
  dataSeriesLabel,
  domain,
  size,
  style,
  subtitle,
  title,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  legendComponent
}) => {
  const chartDomain =
    domain || getDefaultStackedDomain(data, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? dataSeriesLabel || getDefaultDataSeriesLabels(data, dataSeries)
    : null;

  const scatterPlotStyle = style || {
    ...VictoryTheme.areaScatter.style
  };

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const lineData = dataSeries ? groupBy(data, dataSeries) : { category: data };

  const areas = lineData
    ? Object.keys(lineData).map((category, index) => (
        <VictoryArea
          key={shortid.generate()}
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries]
          }))}
          x="dataKey"
          y="dataValue"
          style={getDefaultAreaStyle(index)}
          standalone={false}
          animate
        />
      ))
    : null;

  const dots = lineData
    ? Object.keys(lineData).map(category => (
        <VictoryScatter
          key={shortid.generate()}
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries],
            label: `${dataKeyLabel || xLabel}: ${xNumberFormatter(
              d[dataKey]
            )} • ${dataValueLabel || yLabel}: ${yNumberFormatter(
              d[dataValue]
            )}`,
            size: size ? d[size.key] || size.value : 3
          }))}
          x="dataKey"
          y="dataValue"
          standalone={false}
          size={d => d.size}
          style={scatterPlotStyle}
          title="Scatter Plot"
          events={chartEvents}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={0}
              orientation="bottom"
              pointerLength={0}
              cornerRadius={0}
              theme={VictoryTheme}
            />
          }
          animate
        />
      ))
    : null;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <DataChecker dataAccessors={{ dataKey, dataValue }} data={data}>
        {legendData &&
          (legendComponent ? (
            legendComponent(legendData)
          ) : (
            <SimpleLegend className="legend" legendData={legendData} />
          ))}

        <VictoryChart
          domain={chartDomain}
          padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
          theme={VictoryTheme}
        >
          <VictoryAxis
            style={{ grid: { stroke: "none" } }}
            tickFormat={x => xNumberFormatter(x)}
            title="X Axis"
          />
          <VictoryAxis
            dependentAxis
            tickFormat={y => yNumberFormatter(y)}
            title="Y Axis"
          />
          <VictoryPortal>
            <VictoryLabel
              style={{ ...VictoryTheme.axisLabel.style }}
              text={yLabel}
              textAnchor="middle"
              title="Y Axis Label"
              verticalAnchor="end"
              x={75}
              y={45}
            />
          </VictoryPortal>
          <VictoryPortal>
            <VictoryLabel
              style={{ ...VictoryTheme.axisLabel.style }}
              text={xLabel}
              textAnchor="end"
              title="X Axis Label"
              verticalAnchor="end"
              x={600}
              y={295}
            />
          </VictoryPortal>
          <VictoryStack>{areas}</VictoryStack>
          <VictoryStack>{dots}</VictoryStack>
        </VictoryChart>
      </DataChecker>
    </ChartContainer>
  );
};

StackedAreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
  ),
  dataKey: PropTypes.string,
  dataKeyLabel: PropTypes.arrayOf(PropTypes.string),
  dataValue: PropTypes.string,
  dataValueLabel: PropTypes.arrayOf(PropTypes.string),
  dataSeries: PropTypes.string,
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string })
  ),
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  size: PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }),
  style: PropTypes.arrayOf(PropTypes.shape({})),
  subtitle: PropTypes.string,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  legendComponent: PropTypes.func
};

StackedAreaChart.defaultProps = {
  data: null,
  dataKey: "x",
  dataKeyLabel: null,
  dataValue: "y",
  dataValueLabel: null,
  dataSeries: null,
  dataSeriesLabel: null,
  domain: null,
  size: null,
  style: null,
  subtitle: null,
  title: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.numeric,
  yNumberFormatter: civicFormat.numeric,
  legendComponent: null
};

export default StackedAreaChart;
