import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryScatter,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryPortal,
  VictoryLabel
} from 'victory';

import ChartContainer from '../ChartContainer';
import { numeric } from '../utils/formatters';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const LineChart = ({
  title,
  subtitle,
  data,
  domain,
  xLabel,
  yLabel,
  dataKey,
  dataValue,
  dataKeyLabel,
}) => {

  const axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold',
  };
  
  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <VictoryChart
        padding={{ left: 75, right: 50, bottom: 50, top: 50 }}
        domainPadding={20}
        animate={{ duration: 300 }}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          label={xLabel}
          tickValues={data.map(d => d[dataKey])}
          tickFormat={data.map(d => d[dataKeyLabel])}
        />
        <VictoryAxis
          dependentAxis
          tickValues={data.map(d => d[dataValue])}
          tickFormat={data.map(d => numeric(d[dataValue]))}
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
        <VictoryLine
          data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
          x="dataKey"
          y="dataValue"
        />
        <VictoryScatter
          data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
          x="dataKey"
          y="dataValue"
        />
      </VictoryChart>
    </ChartContainer>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  domain: PropTypes.objectOf(PropTypes.array),
};

LineChart.defaultProps = {
  data: [],
};

export default LineChart;
