import React, { PropTypes } from 'react';
import { sankey } from 'd3-sankey';
import { format } from 'd3-format';
import { clone, max } from 'ramda';
import './Sankey.css';

var formatNumber = format(',.0f');
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

  var sankeyChart = sankey().size([w, h]).nodeWidth(12).nodePadding(8);

  var path = sankeyChart.link();

  var chart = {
    nodes: clone(nodes),
    links: clone(links)
  };

  sankeyChart.nodes(chart.nodes).links(chart.links).layout(32);

  var chartLinks = chart.links.map(function (link, idx) {
    return React.createElement(
      'g',
      { key: 'sankey-link-' + idx },
      React.createElement(
        'path',
        { className: 'sankey-link', d: path(link), style: { strokeWidth: max(1, link.dy) } },
        React.createElement(
          'title',
          null,
          link.source.name + ' \u2192 ' + link.target.name + '\n Value: ' + formatNum(link.value)
        )
      )
    );
  });

  var chartNodes = chart.nodes.map(function (node, idx) {
    return React.createElement(
      'g',
      { key: 'sankey-node-' + idx, className: 'sankey-node', transform: 'translate(' + node.x + ',' + node.y + ')' },
      React.createElement(
        'rect',
        { style: { fill: colors[idx] }, height: node.dy, width: sankeyChart.nodeWidth() },
        React.createElement(
          'title',
          null,
          node.name + '\n' + formatNum(node.value)
        )
      ),
      node.x >= w / 2 ? React.createElement(
        'text',
        { x: -8, y: node.dy / 2, dy: '.25em', textAnchor: 'end' },
        node.name
      ) : React.createElement(
        'text',
        { x: 8 + sankeyChart.nodeWidth(), y: node.dy / 2, dy: '.25em', textAnchor: 'start' },
        node.name
      )
    );
  });

  return React.createElement(
    'svg',
    { className: 'sankey-chart', width: w + margin.left + margin.right, height: h + margin.top + margin.bottom },
    React.createElement(
      'g',
      { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
      chartLinks,
      chartNodes
    )
  );
};

Sankey.displayName = 'Sankey';
Sankey.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    node: PropTypes.number
  })),
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.number,
    target: PropTypes.number,
    value: PropTypes.number
  }))
};

export default Sankey;