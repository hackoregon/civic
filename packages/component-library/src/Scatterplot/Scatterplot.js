import React, { PropTypes } from 'react';
import { css } from 'emotion';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip
} from 'victory';

import ChartContainer from '../ChartContainer';
import SimpleLegend from '../SimpleLegend';
import { numeric } from '../utils/formatters';
import { chartEvents, getDefaultDomain, getDefaultDataSeriesLabels, getDefaultFillStyle } from '../utils/chartHelpers';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

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

const Scatterplot = ({
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
}) => {
  const chartDomain = domain || getDefaultDomain(data, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? dataSeriesLabel || getDefaultDataSeriesLabels(data, dataSeries)
    : null;

  const scatterPlotStyle = style || getDefaultFillStyle(dataSeriesLabels);

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const categoryData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.category }))
      : null;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      {legendData && (
        <SimpleLegend className="legend" legendData={legendData} />
      )}

      <VictoryChart
        domain={chartDomain}
        theme={CivicVictoryTheme.civic}
        animate={{ duration: 200 }}
      >
        <VictoryAxis
          animate={{ onEnter: { duration: 500 } }}
          style={{ grid: { stroke: 'none' } }}
          tickFormat={x => xNumberFormatter(x)}
          title="X Axis"
        />
        <VictoryAxis
          dependentAxis
          animate={{ onEnter: { duration: 500 } }}
          style={{
            grid: {
              ...CivicVictoryTheme.civic.axis.style.grid,
              stroke: t =>
                t < chartDomain.y[1]
                  ? CivicVictoryTheme.civic.axis.style.grid.stroke
                  : 'none',
            },
          }}
          tickFormat={y => yNumberFormatter(y)}
          title="Y Axis"
        />
        <VictoryPortal>
          <VictoryLabel
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
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
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
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
//        categories={{ x: categoryData }}
          data={data.map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            label: `${dataKeyLabel ? d[dataKeyLabel] : xLabel}: ${xNumberFormatter(d[dataKey])} • ${dataValueLabel ? d[dataValueLabel] : yLabel}: ${yNumberFormatter(d[dataValue])}`,
            series: d[dataSeries],
            size: size ? d[size.key] || size.value : 3,
          }))}
          events={chartEvents}
          labelComponent={
            <VictoryTooltip
              x={325}
              y={0}
              orientation="bottom"
              pointerLength={0}
              cornerRadius={0}
              theme={CivicVictoryTheme.civic}
            />
          }
          size={d => d.size}
          style={scatterPlotStyle}
          title="Scatter Plot"
          x="dataKey"
          y="dataValue"
        />
      </VictoryChart>
    </ChartContainer>
  );
};

Scatterplot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  dataKey: PropTypes.string,
  dataKeyLabel: PropTypes.arrayOf(PropTypes.string),
  dataValue: PropTypes.string,
  dataValueLabel: PropTypes.arrayOf(PropTypes.string),
  dataSeries: PropTypes.string,
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string }),
  ),
  domain: PropTypes.objectOf(PropTypes.array),
  size: PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }),
  style: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
};

Scatterplot.defaultProps = {
  data: null,
  dataKey: 'x',
  dataKeyLabel: null,
  dataValue: 'y',
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
  xNumberFormatter: numeric,
  yNumberFormatter: numeric,
};

export default Scatterplot;
