/* eslint-disable import/prefer-default-export */
import React from "react";
import PropTypes from "prop-types";

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  VictoryGroup,
  VictoryLine
} from "victory";

import { ThemeProvider } from "emotion-theming";
import { VictoryTheme } from "@hackoregon/ui-themes";
import { DataChecker, civicFormat, protectData } from "@hackoregon/utils";

import { SimpleLegend } from "../SimpleLegend/SimpleLegend";
import { ChartContainer } from "../ChartContainer/ChartContainer";
import chartHelpers from "../chartHelpers";

const {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels
} = chartHelpers;

export const BarChart = ({
  data,
  dataKey,
  dataValue,
  dataSeries,
  dataSeriesLabel,
  domain,
  title,
  subtitle,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  barWidth,
  loading,
  error,
  theme,
  legendComponent,
  protect,
  annotations
}) => {
  const safeData = data && data.length ? data : [{}];
  const chartDomain = domain || getDefaultDomain(safeData, dataKey, dataValue);
  const categories = dataSeries && [
    ...new Set(safeData.map(d => d[dataSeries]))
  ];

  const safeDataSeriesLabel =
    // eslint-disable-next-line no-nested-ternary
    dataSeriesLabel && dataSeriesLabel.length
      ? protect
        ? protectData(dataSeriesLabel, { x: "category", y: "label" })
        : dataSeriesLabel
      : null;

  const dataSeriesLabels = dataSeries
    ? safeDataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeries)
    : null;

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  return (
    <ThemeProvider theme={theme}>
      <ChartContainer
        title={title}
        subtitle={subtitle}
        loading={loading}
        error={error}
      >
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
        <DataChecker dataAccessors={{ dataKey, dataValue }} data={safeData}>
          <VictoryChart
            padding={{ left: 90, right: 50, bottom: 50, top: 50 }}
            domainPadding={{ x: [40, 40], y: [0, 0] }}
            domain={chartDomain}
            theme={theme}
          >
            <VictoryAxis
              tickFormat={xNumberFormatter}
              style={{ grid: { stroke: "none" } }}
              title="X Axis"
            />
            <VictoryAxis
              dependentAxis
              tickFormat={yNumberFormatter}
              title="Y Axis"
            />
            <VictoryPortal>
              <VictoryLabel
                // eslint-disable-next-line react/prop-types
                style={{ ...theme.axisLabel.style }}
                text={yLabel}
                textAnchor="middle"
                title="Y Axis Label"
                verticalAnchor="end"
                x={85}
                y={45}
              />
            </VictoryPortal>
            <VictoryPortal>
              <VictoryLabel
                // eslint-disable-next-line react/prop-types
                style={{ ...theme.axisLabel.style }}
                text={xLabel}
                textAnchor="end"
                title="X Axis Label"
                verticalAnchor="end"
                x={600}
                y={295}
              />
            </VictoryPortal>
            {annotations && (
              <VictoryLine
                style={{
                  data: { stroke: "red", strokeWidth: 2 },
                  labels: { angle: -90, fill: "red", fontSize: 20 }
                }}
                labels={["Important"]}
                labelComponent={<VictoryLabel y={100} />}
                x={() => 5000}
              />
            )}
            {!dataSeries && (
              <VictoryBar
                alignment="middle"
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
                data={safeData.map(d => ({
                  dataKey: d[dataKey],
                  dataValue: d[dataValue],
                  label: `${xLabel}: ${xNumberFormatter(
                    d[dataKey]
                  )} • ${yLabel}: ${yNumberFormatter(d[dataValue])}`
                }))}
                events={chartEvents(theme)}
                x="dataKey"
                y="dataValue"
                title="Bar Chart"
                style={{ data: { width: barWidth } }}
                animate
              />
            )}
            {dataSeries && (
              <VictoryGroup
                // eslint-disable-next-line react/prop-types
                offset={(barWidth || theme.bar.style.data.width) * 1.2}
                // eslint-disable-next-line react/prop-types
                colorScale={theme.group.colorScale}
              >
                {categories.map(category => (
                  <VictoryBar
                    alignment="middle"
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
                    data={safeData
                      .filter(d => d[dataSeries] === category)
                      .map(d => ({
                        dataKey: d[dataKey],
                        dataValue: d[dataValue],
                        label: `${xLabel}: ${xNumberFormatter(
                          d[dataKey]
                        )} • ${yLabel}: ${yNumberFormatter(d[dataValue])}`
                      }))}
                    events={chartEvents(theme)}
                    x="dataKey"
                    y="dataValue"
                    title="Bar Chart"
                    style={{
                      // eslint-disable-next-line react/prop-types
                      data: { width: barWidth || theme.bar.style.data.width }
                    }}
                    animate
                  />
                ))}
              </VictoryGroup>
            )}
          </VictoryChart>
        </DataChecker>
      </ChartContainer>
    </ThemeProvider>
  );
};

BarChart.propTypes = {
  /** An array of objects with keys [dataKey], [dataValue], [dataSeries] (optional) */
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /** Show loading state instead of chart */
  loading: PropTypes.bool,
  /** Error message to show instead of chart */
  error: PropTypes.string,
  /** The property name of the data elements corresponding to the value which will be displayed on the X-axis */
  dataKey: PropTypes.string,
  /** The property name of the data elements corresponding to the value which will be displayed on the Y-axis */
  dataValue: PropTypes.string,
  /** The property name of the data elements corresponding to the value which represents a category. Will display as a grouped bar chart if supplied. */
  dataSeries: PropTypes.string,
  /** An array of mappings for dataSeries matching a category value with a custom label */
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string })
  ),
  /** Constrains the area displayed on the chart for each axis. The array supplied for each axis shour be of the format [min, max]  */
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  /** The chart title */
  title: PropTypes.string,
  /** The chart subtitle */
  subtitle: PropTypes.string,
  /** The label for the x-axis (keys) */
  xLabel: PropTypes.string,
  /** The label for the y-axis (values) */
  yLabel: PropTypes.string,
  /** A function used to format the labels for the x-axis values (keys)
   * @constructor
   * @param {number} value - the value to be formatted
   * @returns {string} - the formatted string
   */
  xNumberFormatter: PropTypes.func,
  /** A function used to format the labels for the y-axis values (values)
   * @constructor
   * @param {number} value - the value to be formatted
   * @returns {string} - the formatted string
   */

  yNumberFormatter: PropTypes.func,
  /** The width of each bar, in responsive units. Default depends on theme, but 20 is a default  */
  barWidth: PropTypes.number,
  /** A VictoryTheme object used for styling */
  theme: PropTypes.shape({}),
  /** A custom VictoryLegend component used to override the default legend */
  legendComponent: PropTypes.node,
  /** Prevent data values that include color names from having styling impacts. Has performance implications, so only use if color names in the data is a possibilty */
  protect: PropTypes.bool,
  /** ⚠️ Not functional! See issue #1223 */
  annotations: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  )
};

BarChart.defaultProps = {
  dataKey: "x",
  dataValue: "y",
  dataSeries: null,
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.year,
  yNumberFormatter: civicFormat.numeric,
  barWidth: null,
  theme: VictoryTheme,
  legendComponent: null,
  protect: false,
  annotations: null
};

BarChart.displayName = "BarChart";
