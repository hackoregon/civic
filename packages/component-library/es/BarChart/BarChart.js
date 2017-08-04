import React, { PropTypes } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

var HorizontalBarChart = function HorizontalBarChart(_ref) {
  var data = _ref.data;
  return React.createElement(
    BarChart,
    { layout: 'horizontal', width: 730, height: 250, data: data },
    React.createElement(XAxis, { dataKey: 'name' }),
    React.createElement(YAxis, null),
    React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
    React.createElement(Tooltip, null),
    React.createElement(Legend, null),
    React.createElement(Bar, { dataKey: 'x', fill: '#8884d8' }),
    React.createElement(Bar, { dataKey: 'y', fill: '#82ca9d' })
  );
};

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export default HorizontalBarChart;