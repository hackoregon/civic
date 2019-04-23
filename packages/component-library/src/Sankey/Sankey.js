/* Deprecated component, 2017 only */
/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import { sankey } from "d3-sankey";
import { format } from "d3-format";
import { clone, max } from "ramda";
import { css } from "emotion";

const formatNumber = format(",.0f");
const formatNum = num => formatNumber(num);

const colors = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
  "#8dd3c7",
  "#fb8072",
  "#80b1d3",
  "#bebada",
  "#ffed6f",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffffb3"
];

const defaultMargin = { top: 20, right: 0, bottom: 20, left: 0 };

const sankeyChartClass = css`
  margin-bottom: 20px;
`;

const sankeyNodeClass = css`
  fill-opacity: 0.6;

  &:hover {
    cursor: pointer;
    fill-opacity: 1;
  }

  & text {
    fill: #555;
    font-size: 0.75em;
    stroke: none;
  }
`;

const sankeyLinkClass = css`
  fill: none;
  stroke: #ccc;
  stroke-opacity: 0.4;

  &:hover {
    cursor: pointer;
    stroke-opacity: 0.8;
  }
`;

const Sankey = ({
  margin = defaultMargin,
  width = 650,
  height = 450,
  nodes,
  links
}) => {
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const sankeyChart = sankey()
    .size([w, h])
    .nodeWidth(12)
    .nodePadding(8);

  const path = sankeyChart.link();

  const chart = {
    nodes: clone(nodes),
    links: clone(links)
  };

  sankeyChart
    .nodes(chart.nodes)
    .links(chart.links)
    .layout(32);

  const chartLinks = chart.links.map((link, idx) => (
    <g key={`${sankeyLinkClass}-${idx}`}>
      <path
        className={sankeyLinkClass}
        d={path(link)}
        style={{ strokeWidth: max(1, link.dy) }}
      >
        <title>{`${link.source.name} → ${link.target.name}\n Value: ${formatNum(
          link.value
        )}`}</title>
      </path>
    </g>
  ));

  const chartNodes = chart.nodes.map((node, idx) => (
    <g
      key={`${sankeyNodeClass}-${idx}`}
      className={sankeyNodeClass}
      transform={`translate(${node.x},${node.y})`}
    >
      <rect
        style={{ fill: colors[idx] }}
        height={node.dy}
        width={sankeyChart.nodeWidth()}
      >
        <title>{`${node.name}\n${formatNum(node.value)}`}</title>
      </rect>
      {node.x >= w / 2 ? (
        <text x={-8} y={node.dy / 2} dy=".25em" textAnchor="end">
          {node.name}
        </text>
      ) : (
        <text
          x={8 + sankeyChart.nodeWidth()}
          y={node.dy / 2}
          dy=".25em"
          textAnchor="start"
        >
          {node.name}
        </text>
      )}
    </g>
  ));

  return (
    <svg
      className={sankeyChartClass}
      width={w + margin.left + margin.right}
      height={h + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {chartLinks}
        {chartNodes}
      </g>
    </svg>
  );
};

Sankey.displayName = "Sankey";
Sankey.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      node: PropTypes.number
    })
  ),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.number,
      target: PropTypes.number,
      value: PropTypes.number
    })
  )
};

export default Sankey;
