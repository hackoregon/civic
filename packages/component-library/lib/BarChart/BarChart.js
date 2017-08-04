'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recharts = require('recharts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HorizontalBarChart = function HorizontalBarChart(_ref) {
  var data = _ref.data;
  return _react2.default.createElement(
    _recharts.BarChart,
    { layout: 'horizontal', width: 730, height: 250, data: data },
    _react2.default.createElement(_recharts.XAxis, { dataKey: 'name' }),
    _react2.default.createElement(_recharts.YAxis, null),
    _react2.default.createElement(_recharts.CartesianGrid, { strokeDasharray: '3 3' }),
    _react2.default.createElement(_recharts.Tooltip, null),
    _react2.default.createElement(_recharts.Legend, null),
    _react2.default.createElement(_recharts.Bar, { dataKey: 'x', fill: '#8884d8' }),
    _react2.default.createElement(_recharts.Bar, { dataKey: 'y', fill: '#82ca9d' })
  );
};

HorizontalBarChart.propTypes = {
  data: _react.PropTypes.arrayOf(_react.PropTypes.object)
};

exports.default = HorizontalBarChart;