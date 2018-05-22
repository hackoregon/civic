var _templateObject = _taggedTemplateLiteral(['\n  margin: 0 auto;\n  max-width: 900px;\n  width: 100%;\n'], ['\n  margin: 0 auto;\n  max-width: 900px;\n  width: 100%;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-family: \'filson-soft\', sans-serif;\n  font-size: 40px;\n  font-weight: 500;\n  text-align: center;\n  margin: 40px 0 12px 0;\n'], ['\n  font-family: \'filson-soft\', sans-serif;\n  font-size: 40px;\n  font-weight: 500;\n  text-align: center;\n  margin: 40px 0 12px 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: block;\n  font-family: \'filson-soft\', sans-serif;\n  font-size: 18px;\n  text-align: center;\n'], ['\n  display: block;\n  font-family: \'filson-soft\', sans-serif;\n  font-size: 18px;\n  text-align: center;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { PropTypes } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

import { assign } from "lodash";
import { css } from 'emotion';
import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

var barchartWrapper = css(_templateObject);

var titleStyle = css(_templateObject2);

var subtitleStyle = css(_templateObject3);

var BarChart = function BarChart(_ref) {
  var data = _ref.data,
      dataKey = _ref.dataKey,
      dataValue = _ref.dataValue,
      dataKeyLabel = _ref.dataKeyLabel,
      title = _ref.title,
      subtitle = _ref.subtitle;
  return React.createElement(
    'div',
    null,
    title ? React.createElement(
      'h3',
      { className: titleStyle },
      title
    ) : null,
    subtitle ? React.createElement(
      'span',
      { className: subtitleStyle },
      subtitle
    ) : null,
    React.createElement(
      'div',
      { className: barchartWrapper },
      React.createElement(
        VictoryChart,
        {
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
            return '$' + x / 1000 + 'k';
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