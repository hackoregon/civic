var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPortal, VictoryTooltip } from 'victory';

import ChartContainer from '../ChartContainer';
import { numeric, year } from '../utils/formatters';
import { assign } from "lodash";
import { css } from 'emotion';
import { chartEvents, getDefaultDomain } from '../utils/chartHelpers';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

var BarChart = function BarChart(_ref) {
  var data = _ref.data,
      dataKey = _ref.dataKey,
      dataValue = _ref.dataValue,
      domain = _ref.domain,
      title = _ref.title,
      subtitle = _ref.subtitle,
      xLabel = _ref.xLabel,
      yLabel = _ref.yLabel,
      xNumberFormatter = _ref.xNumberFormatter,
      yNumberFormatter = _ref.yNumberFormatter,
      barWidth = _ref.barWidth,
      loading = _ref.loading,
      error = _ref.error;

  var chartDomain = domain || getDefaultDomain(data, dataKey, dataValue);

  return React.createElement(
    ChartContainer,
    { title: title, subtitle: subtitle, loading: loading, error: error },
    React.createElement(
      VictoryChart,
      {
        padding: { left: 90, right: 50, bottom: 50, top: 50 },
        domainPadding: { x: [40, 40], y: [0, 0] },
        animate: { duration: 200 },
        theme: CivicVictoryTheme.civic,
        domain: chartDomain
      },
      React.createElement(VictoryAxis, {
        tickFormat: xNumberFormatter,
        title: 'X Axis'
      }),
      React.createElement(VictoryAxis, {
        dependentAxis: true,
        tickFormat: yNumberFormatter,
        title: 'Y Axis'
      }),
      React.createElement(
        VictoryPortal,
        null,
        React.createElement(VictoryLabel, {
          style: _extends({}, CivicVictoryTheme.civic.axisLabel.style),
          text: yLabel,
          textAnchor: 'middle',
          title: 'Y Axis Label',
          verticalAnchor: 'end',
          x: 85,
          y: 45
        })
      ),
      React.createElement(
        VictoryPortal,
        null,
        React.createElement(VictoryLabel, {
          style: _extends({}, CivicVictoryTheme.civic.axisLabel.style),
          text: xLabel,
          textAnchor: 'end',
          title: 'X Axis Label',
          verticalAnchor: 'end',
          x: 600,
          y: 295
        })
      ),
      React.createElement(VictoryBar, {
        alignment: 'middle',
        labelComponent: React.createElement(VictoryTooltip, {
          x: 325,
          y: 0,
          orientation: 'bottom',
          pointerLength: 0,
          cornerRadius: 0,
          theme: CivicVictoryTheme.civic
        }),
        data: data.map(function (d) {
          return { dataKey: d[dataKey], dataValue: d[dataValue], label: xLabel + ': ' + xNumberFormatter(d[dataKey]) + ' \u2022 ' + yLabel + ': ' + yNumberFormatter(d[dataValue]) };
        }),
        events: chartEvents,
        x: 'dataKey',
        y: 'dataValue',
        title: 'Bar Chart',
        style: { data: { width: barWidth } }
      })
    )
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  dataKey: PropTypes.string,
  dataValue: PropTypes.string,
  domain: PropTypes.objectOf(PropTypes.array),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  barWidth: PropTypes.number
};

BarChart.defaultProps = {
  data: null,
  dataKey: 'x',
  dataValue: 'y',
  domain: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: year,
  yNumberFormatter: numeric,
  barWidth: null
};

export default BarChart;