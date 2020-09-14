/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip
} from "victory";
import { VictoryTheme } from "@hackoregon/ui-themes";
import { civicFormat, protectData, DataChecker } from "@hackoregon/utils";

import { SimpleLegend } from "../SimpleLegend/SimpleLegend";
import { ChartContainer } from "../ChartContainer/ChartContainer";
import chartHelpers from "../chartHelpers";

const {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle
} = chartHelpers;

/*
 * @method Scatterplot
 * @param  {Array}     data         X & Y coordinates for scatterplot points
 * @param  {String}    dataKey      X key in `data`
 * @param  {Array}     dataKeyLabel Optional overrides for x-axis tick labels
 * @param  {String}    dataValue    Y key in `data`
 * @param  {Array}     dataValueLabel Optional overrides for y-axis tick labels
 * @param  {Array}     dataSeriesLabel   Series options for multiseries data
 * @param  {Object}    domain       Scaling for chart axes (defaults to data range)
 * @param  {Object}    size         Data `key` or exact `value` to use for data point size
 * @param  {Object}    style        Optional overrides for point rendering
 * @param  {String}    subtitle     Chart subtitle
 * @param  {String}    title        Chart title
 * @param  {String}    xLabel       X-axis label
 * @param  {String}    yLabel       Y-axis label
 */

export const Scatterplot = ({
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
  invertX,
  invertY,
  legendComponent,
  theme,
  loading,
  protect
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

  return (
    <ChartContainer title={title} subtitle={subtitle} loading={loading}>
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
          domain={chartDomain}
          theme={theme}
          animate={{ duration: 200 }}
        >
          <VictoryAxis
            animate={{ onEnter: { duration: 500 } }}
            style={{ grid: { stroke: "none" } }}
            tickFormat={x => xNumberFormatter(x)}
            title="X Axis"
            invertAxis={invertX}
          />
          <VictoryAxis
            dependentAxis
            animate={{ onEnter: { duration: 500 } }}
            tickFormat={y => yNumberFormatter(y)}
            title="Y Axis"
            invertAxis={invertY}
          />
          <VictoryPortal>
            <VictoryLabel
              // eslint-disable-next-line react/prop-types
              style={{ ...theme.axisLabel.style }}
              text={yLabel}
              textAnchor="middle"
              title="Y Axis Label"
              verticalAnchor="end"
              x={50}
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
          <VictoryScatter
            animate={{ onEnter: { duration: 500 } }}
            bubbleProperty="bubbleSize"
            minBubbleSize={size && size.minSize}
            maxBubbleSize={size && size.maxSize}
            //        categories={{ x: categoryData }}
            data={safeData.map(d => ({
              dataKey: d[dataKey],
              dataValue: d[dataValue],
              label: `${
                dataKeyLabel ? d[dataKeyLabel] : xLabel
              }: ${xNumberFormatter(d[dataKey])} • ${
                dataValueLabel ? d[dataValueLabel] : yLabel
              }: ${yNumberFormatter(d[dataValue])}`,
              series: d[dataSeries],
              ...(size && { bubbleSize: d[size.key] })
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
            size={3} // overridden by bubbleProperty
            style={scatterPlotStyle}
            title="Scatter Plot"
            x="dataKey"
            y="dataValue"
          />
        </VictoryChart>
      </DataChecker>
    </ChartContainer>
  );
};

Scatterplot.propTypes = {
  /** An array of objects with keys [dataKey], [dataValue], [dataSeries] (optional) */
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  /** The property name of the data elements corresponding to the value used for X-positioning */
  dataKey: PropTypes.string,
  /** The property name of the data elements corresponding to the label used for X-positioning  */
  dataKeyLabel: PropTypes.string,
  /** The property name of the data elements corresponding to the value used for Y-positioning */
  dataValue: PropTypes.string,
  /** The property name of the data elements corresponding to the label used for Y-positioning  */
  dataValueLabel: PropTypes.string,
  /** The property name of the data elements corresponding to the value which represents a category. */
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
  /** Data `key` or exact `value` to use for data point size */
  size: PropTypes.shape({
    key: PropTypes.string,
    minSize: PropTypes.number,
    maxSize: PropTypes.number
  }),
  /** Optional overrides for point rendering applied to the `style` property on VictoryScatter */
  style: PropTypes.arrayOf(PropTypes.shape({})),
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
  /** A function used to format the labels for the y-axis values (keys)
   * @constructor
   * @param {number} value - the value to be formatted
   * @returns {string} - the formatted string
   */
  yNumberFormatter: PropTypes.func,
  /** invert the x-axis to arrange numbers largest to smallest */
  invertX: PropTypes.bool,
  /** invert the y-axis to arrange numbers largest to smallest */
  invertY: PropTypes.bool,
  /** A custom VictoryLegend component used to override the default legend */
  legendComponent: PropTypes.func,
  /** A VictoryTheme object used for styling */
  theme: PropTypes.shape({}),
  /** Show loading state instead of chart */
  loading: PropTypes.bool,
  /** Prevent data values that include color names from having styling impacts. Has performance implications, so only use if color names in the data is a possibilty */
  protect: PropTypes.bool
};

Scatterplot.defaultProps = {
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
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.numeric,
  yNumberFormatter: civicFormat.numeric,
  invertX: false,
  invertY: false,
  legendComponent: null,
  theme: VictoryTheme,
  loading: null,
  protect: false
};

Scatterplot.displayName = "Scatterplot";
