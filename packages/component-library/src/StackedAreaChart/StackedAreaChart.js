import React, { PropTypes } from 'react';
import { css } from 'emotion';
import { groupBy } from 'lodash';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip,
  VictoryStack,
  VictoryArea,
} from 'victory';

import ChartContainer from '../ChartContainer';
import SimpleLegend from '../SimpleLegend';
import { numeric } from '../utils/formatters';
import {
  chartEvents,
  getDefaultStackedDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle,
  getDefaultAreaStyle,
} from '../utils/chartHelpers';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

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
}) => {
  const chartDomain =
    domain || getDefaultStackedDomain(data, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? dataSeriesLabel || getDefaultDataSeriesLabels(data, dataSeries)
    : null;

  const scatterPlotStyle = style || {
    ...CivicVictoryTheme.civic.areaScatter.style,
  };

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  const categoryData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.category }))
      : null;

  const lineData = dataSeries ? groupBy(data, dataSeries) : { category: data };

  const areas = lineData
    ? Object.keys(lineData).map((category, index) => (
        <VictoryArea
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries],
          }))}
          x="dataKey"
          y="dataValue"
          style={getDefaultAreaStyle(index)}
          standalone={false}
        />
      ))
    : null;

  const dots = lineData
    ? Object.keys(lineData).map((category, index) => (
        <VictoryScatter
          data={lineData[category].map(d => ({
            dataKey: d[dataKey],
            dataValue: d[dataValue],
            series: d[dataSeries],
            label: `${dataKeyLabel ? dataKeyLabel : xLabel}: ${xNumberFormatter(
              d[dataKey]
            )} • ${
              dataValueLabel ? dataValueLabel : yLabel
            }: ${yNumberFormatter(d[dataValue])}`,
            size: size ? d[size.key] || size.value : 3,
          }))}
          animate={{ onEnter: { duration: 500 } }}
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
              theme={CivicVictoryTheme.civic}
            />
          }
        />
      ))
    : null;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      {legendData &&
        (legendComponent ? (
          legendComponent(legendData)
        ) : (
          <SimpleLegend className="legend" legendData={legendData} />
        ))}

      <VictoryChart
        domain={chartDomain}
        padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
        theme={CivicVictoryTheme.civic}
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
            x={75}
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
        <VictoryStack>{areas}</VictoryStack>
        <VictoryStack>{dots}</VictoryStack>
      </VictoryChart>
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
  domain: PropTypes.objectOf(PropTypes.array),
  size: PropTypes.shape({ key: PropTypes.string, value: PropTypes.string }),
  style: PropTypes.objectOf(PropTypes.object),
  subtitle: PropTypes.string,
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  legendComponent: PropTypes.func,
};

StackedAreaChart.defaultProps = {
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
  subtitle: null,
  title: null,
  xLabel: 'X',
  yLabel: 'Y',
  xNumberFormatter: numeric,
  yNumberFormatter: numeric,
  legendComponent: null,
};

export default StackedAreaChart;
