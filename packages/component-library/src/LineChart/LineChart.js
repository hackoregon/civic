import React, { PropTypes } from 'react';
import { css } from 'emotion';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory';

import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const linechartWrapper = css`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
`;

const titleStyle = css`
  font-family: 'filson-soft', sans-serif;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  margin: 40px 0 12px 0;
`;

const subtitleStyle = css`
  display: block;
  font-family: 'filson-soft', sans-serif;
  font-size: 18px;
  text-align: center;
`;

const LineChart = ({
  title,
  subtitle,
  data,
  xLabel,
  dataKey,
  dataValue,
  dataKeyLabel,
}) => (
  <div>
    { title ? <h3 className={titleStyle}>{title}</h3> : null}
    { subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
    <div className={linechartWrapper}>
      <VictoryChart
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
        />
        <VictoryLine
          data={data.map(d => ({ dataKey: d[dataKey], dataValue: d[dataValue] }))}
          x="dataKey"
          y="dataValue"
        />
      </VictoryChart>
    </div>
  </div>
);

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
};

LineChart.defaultProps = {
  data: [],
};

export default LineChart;
