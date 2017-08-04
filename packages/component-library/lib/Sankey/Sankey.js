'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Sankey = require('d3-sankey');

var _d3Format = require('d3-format');

var _ramda = require('ramda');

require('./Sankey.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatNumber = (0, _d3Format.format)(',.0f');
var formatNum = function formatNum(num) {
  return formatNumber(num);
};

var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#8dd3c7', '#fb8072', '#80b1d3', '#bebada', '#ffed6f', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffffb3'];

var defaultMargin = { top: 20, right: 0, bottom: 20, left: 0 };

var Sankey = function Sankey(_ref) {
  var _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? defaultMargin : _ref$margin,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 650 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 450 : _ref$height,
      nodes = _ref.nodes,
      links = _ref.links;

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;

  var sankeyChart = (0, _d3Sankey.sankey)().size([w, h]).nodeWidth(12).nodePadding(8);

  var path = sankeyChart.link();

  var chart = {
    nodes: (0, _ramda.clone)(nodes),
    links: (0, _ramda.clone)(links)
  };

  sankeyChart.nodes(chart.nodes).links(chart.links).layout(32);

  var chartLinks = chart.links.map(function (link, idx) {
    return _react2.default.createElement(
      'g',
      { key: 'sankey-link-' + idx },
      _react2.default.createElement(
        'path',
        { className: 'sankey-link', d: path(link), style: { strokeWidth: (0, _ramda.max)(1, link.dy) } },
        _react2.default.createElement(
          'title',
          null,
          link.source.name + ' \u2192 ' + link.target.name + '\n Value: ' + formatNum(link.value)
        )
      )
    );
  });

  var chartNodes = chart.nodes.map(function (node, idx) {
    return _react2.default.createElement(
      'g',
      { key: 'sankey-node-' + idx, className: 'sankey-node', transform: 'translate(' + node.x + ',' + node.y + ')' },
      _react2.default.createElement(
        'rect',
        { style: { fill: colors[idx] }, height: node.dy, width: sankeyChart.nodeWidth() },
        _react2.default.createElement(
          'title',
          null,
          node.name + '\n' + formatNum(node.value)
        )
      ),
      node.x >= w / 2 ? _react2.default.createElement(
        'text',
        { x: -8, y: node.dy / 2, dy: '.25em', textAnchor: 'end' },
        node.name
      ) : _react2.default.createElement(
        'text',
        { x: 8 + sankeyChart.nodeWidth(), y: node.dy / 2, dy: '.25em', textAnchor: 'start' },
        node.name
      )
    );
  });

  return _react2.default.createElement(
    'svg',
    { className: 'sankey-chart', width: w + margin.left + margin.right, height: h + margin.top + margin.bottom },
    _react2.default.createElement(
      'g',
      { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
      chartLinks,
      chartNodes
    )
  );
};

Sankey.displayName = 'Sankey';
Sankey.propTypes = {
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  }),
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  nodes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.string,
    node: _react.PropTypes.number
  })),
  links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    source: _react.PropTypes.number,
    target: _react.PropTypes.number,
    value: _react.PropTypes.number
  }))
};

exports.default = Sankey;