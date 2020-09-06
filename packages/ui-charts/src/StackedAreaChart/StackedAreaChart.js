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
import { VictoryTheme } from "@hackoregon/ui-themes";
import { DataChecker, civicFormat } from "@hackoregon/utils";

import { nanoid } from "nanoid";
import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import chartHelpers from "../chartHelpers";

const {
  chartEvents,
  getDefaultStackedDomain,
  getDefaultDataSeriesLabels,
  getDefaultAreaStyle
} = chartHelpers;

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
  legendComponent,
  theme,
  loading
}) => {
  const safeData = data && data.length ? data : [{}];
  const chartDomain =
    domain || getDefaultStackedDomain(safeData, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? dataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeries)
    : null;

  const scatterPlotStyle = style || {
    ...theme.areaScatter.style
  };

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const lineData = dataSeries
    ? groupBy(safeData, dataSeries)
    : { category: safeData };

  const areas = lineData
    ? Object.keys(lineData).map((category, index) => (
        <VictoryArea
          key={nanoid()}
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries]
          }))}
          x="dataKey"
          y="dataValue"
          style={getDefaultAreaStyle(index, theme)}
          standalone={false}
          animate
        />
      ))
    : null;

  const dots = lineData
    ? Object.keys(lineData).map(category => (
        <VictoryScatter
          key={nanoid()}
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
          events={chartEvents(theme)}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={0}
              orientation="bottom"
              pointerLength={0}
              cornerRadius={0}
              theme={theme}
            />
          }
          animate
        />
      ))
    : null;

  return (
    <ChartContainer title={title} subtitle={subtitle} loading={loading}>
      <DataChecker dataAccessors={{ dataKey, dataValue }} data={safeData}>
        {legendData &&
          (legendComponent ? (
            legendComponent(legendData, theme)
          ) : (
            <SimpleLegend
              className="legend"
              legendData={legendData}
              theme={theme}
            />
          ))}

        <VictoryChart
          domain={chartDomain}
          padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
          theme={theme}
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
              style={{ ...theme.axisLabel.style }}
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
              style={{ ...theme.axisLabel.style }}
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
  legendComponent: PropTypes.func,
  theme: PropTypes.shape({}),
  loading: PropTypes.bool
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
  legendComponent: null,
  theme: VictoryTheme,
  loading: null
};

export default StackedAreaChart;
