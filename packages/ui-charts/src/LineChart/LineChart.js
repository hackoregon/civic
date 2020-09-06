import PropTypes from "prop-types";
import React from "react";
import { nanoid } from "nanoid";
import { groupBy } from "lodash";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip,
  VictoryLine
} from "victory";

import { ThemeProvider } from "emotion-theming";
import { VictoryTheme } from "@hackoregon/ui-themes";
import { civicFormat, protectData, DataChecker } from "@hackoregon/utils";

import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import chartHelpers from "../chartHelpers";

const {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle,
  getDefaultLineStyle
} = chartHelpers;

const LineChart = ({
  customBackgroundPlot,
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
  loading,
  theme,
  protect,
  xTickCount,
  yTickCount
}) => {
  const safeData =
    // eslint-disable-next-line no-nested-ternary
    data && data.length
      ? protect
        ? protectData(data, { dataSeries, dataSeriesLabel })
        : data
      : [{}];
  const safeDataSeriesLabel =
    // eslint-disable-next-line no-nested-ternary
    dataSeriesLabel && dataSeriesLabel.length
      ? protect
        ? protectData(dataSeriesLabel, { x: "category", y: "label" })
        : dataSeriesLabel
      : null;
  const chartDomain = domain || getDefaultDomain(safeData, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? safeDataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeries)
    : null;

  const scatterPlotStyle =
    style || getDefaultFillStyle(dataSeriesLabels, theme);

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  // eslint-disable-next-line no-nested-ternary
  const lineData = dataSeries
    ? data && data.length
      ? groupBy(safeData, dataSeries)
      : null
    : { category: safeData };

  const dataSeriesList = dataSeriesLabels || [{ category: "category" }];

  const lines = lineData
    ? dataSeriesList.map((item, index) => (
        <VictoryLine
          title="Line Chart"
          key={nanoid()}
          data={lineData[item.category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries]
          }))}
          x="dataKey"
          y="dataValue"
          style={getDefaultLineStyle(index, theme)}
          standalone={false}
          // TODO: This is a workaround for a Victory bug that results in incomplete
          // line animations when the animate properties are derived from the VictoryChart
          // wrapping component. Remove this direct animate after the bug is fixed.
          // https://github.com/FormidableLabs/victory/issues/1282
          animate
        />
      ))
    : null;

  return (
    <ThemeProvider theme={theme}>
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
              tickCount={xTickCount}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={y => yNumberFormatter(y)}
              title="Y Axis"
              tickCount={yTickCount}
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
            {customBackgroundPlot}
            {lines}
            <VictoryScatter
              //        categories={{ x: categoryData }}
              data={safeData.map(d => ({
                dataKey: d[dataKey],
                dataValue: d[dataValue],
                label: `${dataKeyLabel || xLabel}: ${xNumberFormatter(
                  d[dataKey]
                )} • ${dataValueLabel || yLabel}: ${yNumberFormatter(
                  d[dataValue]
                )}`,
                series: d[dataSeries],
                size: size ? d[size.key] || size.value : 3
              }))}
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
              size={d => d.size}
              style={scatterPlotStyle}
              title="Scatter Plot"
              x="dataKey"
              y="dataValue"
            />
          </VictoryChart>
        </DataChecker>
      </ChartContainer>
    </ThemeProvider>
  );
};

LineChart.propTypes = {
  customBackgroundPlot: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
  ),
  dataKey: PropTypes.string,
  dataKeyLabel: PropTypes.string,
  dataValue: PropTypes.string,
  dataValueLabel: PropTypes.string,
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
  loading: PropTypes.bool,
  protect: PropTypes.bool,
  xTickCount: PropTypes.func,
  yTickCount: PropTypes.func
};

LineChart.defaultProps = {
  customBackgroundPlot: null,
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
  loading: null,
  protect: false,
  xTickCount: null,
  yTickCount: null
};

export default LineChart;
