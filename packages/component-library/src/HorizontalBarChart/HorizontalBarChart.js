import React, { PropTypes } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictorySharedEvents,
  VictoryContainer,
  VictoryTheme,
  VictoryLabel
} from 'victory';

import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';
import { assign } from "lodash";
import { css } from 'emotion';

const barchartWrapper = css`
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

const HorizontalBarChart = ({ data, dataKey, dataValue, dataKeyLabel, dataValueLabel, title, subtitle }) =>
  <div>
    { title ? <h3 className={titleStyle}>{title}</h3> : null}
    { subtitle ? <span className={subtitleStyle}>{subtitle}</span> : null}
    <div className={barchartWrapper}>
      <VictoryChart
        domainPadding={20}
        animate={{duration: 300}}
        theme={CivicVictoryTheme.civic}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={data.map(a => a[dataKey])}
          tickFormat={data.map(a => a[dataKeyLabel])}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data.map(a => ({ dataKey: a[dataKey], dataValue: a[dataValue] }))}
          x={'dataKey'}
          y={'dataValue'}
        />
      </VictoryChart>
    </div>
  </div>

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  dataValueLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default HorizontalBarChart;
