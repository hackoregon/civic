import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

import ChartContainer from '../ChartContainer';
import { dollars, numeric } from '../utils/formatters';
import { assign } from "lodash";
import { css } from 'emotion';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

var BarChart = function BarChart(_ref) {
  var data = _ref.data,
      dataKey = _ref.dataKey,
      dataValue = _ref.dataValue,
      dataKeyLabel = _ref.dataKeyLabel,
      title = _ref.title,
      subtitle = _ref.subtitle;
  return React.createElement(
    ChartContainer,
    { title: title, subtitle: subtitle },
    React.createElement(
      VictoryChart,
      {
        padding: { left: 75, right: 50, bottom: 50, top: 50 },
        domainPadding: 20,
        animate: { duration: 300 },
        theme: CivicVictoryTheme.civic
      },
      React.createElement(VictoryAxis, {
        tickValues: data.map(function (a) {
          return a[dataKey];
        }),
        tickFormat: data.map(function (a) {
          return a[dataKeyLabel];
        })
      }),
      React.createElement(VictoryAxis, {
        dependentAxis: true,

        tickFormat: function tickFormat(x) {
          return dollars(numeric(x));
        }
      }),
      React.createElement(VictoryBar, {
        data: data.map(function (a) {
          return { dataKey: a[dataKey], dataValue: a[dataValue] };
        }),
        x: 'dataKey',
        y: 'dataValue'
      })
    )
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  dataKeyLabel: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default BarChart;