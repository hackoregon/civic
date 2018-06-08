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
import { dollars, numeric } from '../utils/formatters';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const chartEvents = [
  {
    target: 'data',
    eventHandlers: {
      onMouseOver: () => {
        return [
          {
            target: 'data',
            mutation: () => ({ style: { fill: 'tomato', width: 40 } }),
          }, {
            target: 'labels',
            mutation: () => ({ active: true }),
          },
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: 'data',
            mutation: () => { },
          }, {
            target: 'labels',
            mutation: () => ({ active: false }),
          },
        ];
      },
    },
  },
];

const SimpleLegend = ({ legendData }) => {
  const legendStyle = css`
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0 0;
  `;

  if (legendData.length) {
    return (
      <legend className={legendStyle}>
        {legendData.map((group, idx) => (
          <span
            key={group.name}
            className={css`
              margin-left: 10px;
            `}
          >
            <svg viewBox="0 0 10 10" width="10px">
              <circle
                cx="5"
                cy="5"
                r="5"
                fill={CivicVictoryTheme.civic.group.colorScale[idx]}
              />
            </svg>
            <span
              className={css`
                margin-left: 5px;
              `}
            >
              {group.name}
            </span>
          </span>
        ))}
      </legend>
    );
  }
  return null;
};

const getDefaultDomain = data => {
  const xValues = data.map(value => value.x);
  const yValues = data.map(value => value.y);

  return {
    x: [
      Math.min(...xValues) < 0 ? Math.min(...xValues) : 0,
      Math.max(...xValues),
    ],
    y: [
      Math.min(...yValues) < 0 ? Math.min(...yValues) : 0,
      Math.max(...yValues),
    ],
  };
};

const getDefaultStyle = dataSeries => {
  // Set the style based on the dataSeries index
  return {
    data: {
      fill: d => {
        if (!dataSeries) return CivicVictoryTheme.civic.group.colorScale[0];
        const idx = dataSeries.findIndex(series => series === d.series);
        return CivicVictoryTheme.civic.group.colorScale[idx];
      },
    },
  };
};

/**
 * @method Scatterplot
 * @param  {Array}     data         X & Y coordinates for scatterplot points
 * @param  {String}    dataKey      X key in `data`
 * @param  {Array}     dataKeyLabel Optional overrides for x-axis tick labels
 * @param  {String}    dataValue    Y key in `data`
 * @param  {Array}     dataValueLabel Optional overrides for y-axis tick labels
 * @param  {Array}     dataSeries   Series options for multiseries data
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
  domain,
  size,
  style,
  subtitle,
  title,
  xLabel,
  yLabel,
}) => {
  const chartDomain = domain || getDefaultDomain(data);
  const scatterPlotStyle = style || getDefaultStyle(dataSeries);

  const legendData =
    dataSeries && dataSeries.length
      ? dataSeries.map(series => ({ name: series }))
      : null;

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const titleStyle = css`
    display: block;
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    margin: 0;
  `;

  const subtitleStyle = css`
    display: block;
    font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 14px;
    text-align: center;
    margin: 0;
  `;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      {legendData && (
        <SimpleLegend className="legend" legendData={legendData} />
      )}

      <VictoryChart domain={chartDomain} theme={CivicVictoryTheme.civic}>
        <VictoryAxis
          animate={{ onEnter: { duration: 500 } }}
          style={{ grid: { stroke: 'none' } }}
          title="X Axis"
        />
        <VictoryAxis
          dependentAxis
          animate={{ onEnter: { duration: 500 } }}
          style={{
            // Don't render the top y-axis grid line
            // TODO: Possibly move this to theme
            grid: {
              ...CivicVictoryTheme.civic.axis.style.grid,
              stroke: t =>
                t < chartDomain.y[1]
                  ? CivicVictoryTheme.civic.axis.style.grid.stroke
                  : 'none',
            },
          }}
          title="Y Axis"
        />
        <VictoryPortal>
          <VictoryLabel
            style={axisLabelStyle}
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
            style={axisLabelStyle}
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
          categories={{ x: dataKeyLabel }}
          data={data.map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            label: `${dataKeyLabel ? d[dataKeyLabel] : xLabel}: ${numeric(d[dataKey])} | ${dataValueLabel ? d[dataValueLabel] : yLabel}: ${numeric(d[dataValue])}`,
            series: d.series,
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
  dataSeries: PropTypes.arrayOf(PropTypes.string),
  domain: PropTypes.objectOf(PropTypes.array),
  size: PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }),
  style: PropTypes.objectOf(PropTypes.object),
  subtitle: PropTypes.string,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

Scatterplot.defaultProps = {
  data: null,
  dataKey: 'x',
  dataKeyLabel: null,
  dataValue: 'y',
  dataValueLabel: null,
  dataSeries: null,
  domain: null,
  size: null,
  style: null,
  subtitle: null,
  title: null,
  xLabel: "X",
  yLabel: "Y",
};

export default Scatterplot;
