import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryTooltip,
  Bar,
} from 'victory';

import ChartContainer from '../ChartContainer';
import { numeric, unformatted } from '../utils/formatters';
import { chartEvents } from '../utils/chartHelpers';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const HorizontalBarChart = ({
    data,
    sortOrder,
    dataValue,
    dataLabel,
    domain,
    title,
    subtitle,
    xLabel,
    yLabel,
    dataValueFormatter,
    dataLabelFormatter,
    minimalist,
}) => {
  const barData =
    sortOrder && sortOrder.length
      ? data
      : data.map((d, index) => {
        return { ...d, defaultSort: index + 1 };
      });
  const sortOrderKey =
    sortOrder && sortOrder.length
      ? sortOrder
      : 'defaultSort';
  const padding =
    minimalist
      ? { left: 115, right: 50, bottom: 25, top: 40 }
      : { left: 115, right: 50, bottom: 50, top: 70 };
  const bars = data.length;
  const spaces = bars - 1;
  const barHeight = CivicVictoryTheme.civic.bar.style.data.width;
  const spaceHeight = CivicVictoryTheme.civic.bar.style.data.padding * 2;
  const dataHeight = (bars * barHeight) + (spaces * spaceHeight);
  const additionalHeight = padding.bottom + padding.top;

  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <VictoryChart
        height={dataHeight + additionalHeight}
        domain={domain}
        padding={padding}
        domainPadding={0}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          dependentAxis
          tickValues={barData.map(a => a[sortOrderKey])}
          tickFormat={barData.map(a => dataLabelFormatter(a[dataLabel]))}
          title="Y Axis"
        />
      {!minimalist && (
        <VictoryAxis
          orientation="top"
          tickFormat={dataValueFormatter}
          title="X Axis"
        />
      )}
      {!minimalist && (
        <VictoryPortal>
          <VictoryLabel
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
            text={yLabel}
            textAnchor="middle"
            title="Y Axis Label"
            verticalAnchor="end"
            x={50}
            y={65}
          />
        </VictoryPortal>
      )}
        <VictoryPortal>
          <VictoryLabel
            style={{ ...CivicVictoryTheme.civic.axisLabel.style }}
            text={xLabel}
            textAnchor={minimalist ? 'middle' : 'end'}
            title="X Axis Label"
            verticalAnchor={minimalist ? 'middle' : 'end'}
            x={minimalist ? 325 : 600}
            y={minimalist ? 20 : 85}
          />
        </VictoryPortal>
        <VictoryBar
          horizontal
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
          data={barData.map(d => ({ sortOrder: d[sortOrderKey], dataValue: d[dataValue], label: `${d[dataLabel]}: ${dataValueFormatter(d[dataValue])}` }))}
          title="Horizontal Bar Chart"
          x="sortOrder"
          y="dataValue"
          events={chartEvents}
        />
      </VictoryChart>
    </ChartContainer>
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  sortOrder: PropTypes.string,
  dataValue: PropTypes.string,
  dataLabel: PropTypes.string,
  domain: PropTypes.objectOf(PropTypes.array),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  dataValueFormatter: PropTypes.func,
  dataLabelFormatter: PropTypes.func,
  minimalist: PropTypes.boolean,
};

HorizontalBarChart.defaultProps = {
  data: null,
  sortOrder: null,
  dataValue: 'x',
  dataLabel: 'y',
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  dataValueFormatter: numeric,
  dataLabelFormatter: unformatted,
  minimalist: false,
};

export default HorizontalBarChart;
