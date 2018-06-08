import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPortal, VictoryTooltip } from 'victory';

import ChartContainer from '../ChartContainer';
import { dollars, numeric } from '../utils/formatters';
import { assign } from "lodash";
import { css } from 'emotion';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

var chartEvents = [{
  target: 'data',
  eventHandlers: {
    onMouseOver: function onMouseOver() {
      return [{
        target: 'data',
        mutation: function mutation() {
          return { style: { fill: 'tomato', width: 40 } };
        }
      }, {
        target: 'labels',
        mutation: function mutation() {
          return { active: true };
        }
      }];
    },
    onMouseOut: function onMouseOut() {
      return [{
        target: 'data',
        mutation: function mutation() {}
      }, {
        target: 'labels',
        mutation: function mutation() {
          return { active: false };
        }
      }];
    }
  }
}];

var BarChart = function BarChart(_ref) {
  var data = _ref.data,
      dataKey = _ref.dataKey,
      dataValue = _ref.dataValue,
      dataKeyLabel = _ref.dataKeyLabel,
      domain = _ref.domain,
      title = _ref.title,
      subtitle = _ref.subtitle,
      xLabel = _ref.xLabel,
      yLabel = _ref.yLabel;


  var axisLabelStyle = {
    fontFamily: "'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'bold'
  };

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
      React.createElement(
        VictoryPortal,
        null,
        React.createElement(VictoryLabel, {
          style: axisLabelStyle,
          text: yLabel,
          textAnchor: 'middle',
          title: 'Y Axis Label',
          verticalAnchor: 'end',
          x: 50,
          y: 45
        })
      ),
      React.createElement(
        VictoryPortal,
        null,
        React.createElement(VictoryLabel, {
          style: axisLabelStyle,
          text: xLabel,
          textAnchor: 'end',
          title: 'X Axis Label',
          verticalAnchor: 'end',
          x: 600,
          y: 295
        })
      ),
      React.createElement(VictoryBar, {
        labelComponent: React.createElement(VictoryTooltip, {
          x: 325,
          y: 0,
          orientation: 'bottom',
          pointerLength: 0,
          cornerRadius: 0
        }),
        data: data.map(function (d) {
          return { dataKey: d[dataKey], dataValue: d[dataValue], label: d[dataKeyLabel] + ': ' + numeric(d[dataValue]) };
        }),
        events: chartEvents,
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
  domain: PropTypes.objectOf(PropTypes.array),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string
};

export default BarChart;