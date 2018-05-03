import React, { PropTypes } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart
} from 'victory';

import { VictorySharedEvents, VictoryContainer, VictoryTheme, VictoryLabel } from "victory-core";
import { Civic } from '../index';
import { assign } from "lodash";
import { css } from 'emotion';

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
    <div className={titleStyle}>{title}</div>
    <span className={subtitleStyle}>{subtitle}</span>
    <VictoryChart
      domainPadding={20}
      animate={{duration: 400}}
      theme={Civic.civic}
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

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  dataValueLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

// HorizontalBarChart.defaultProps = {
//   dataKeyLabel: props.dataKey,
//   dataValueLabel: props.dataValue
// }

export default HorizontalBarChart;
