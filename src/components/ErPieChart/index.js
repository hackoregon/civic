import React, { Component } from 'react';
import RechartsPie from '@hackoregon/component-library/lib/RechartsPie/RechartsPie';

// This base can be adjusted to scale up or down the chart and legend
const proportionBase = 200;

// These multipliers can be adjusted to modify the individual
const chartProportions = {
  chartWidth: proportionBase * 2,
  chartHeight: proportionBase * 1,
  iconSize: proportionBase * 0.075,
  pieInnerRadius: proportionBase * 0.2,
  pieOuterRadius: proportionBase * 0.4,
};

// Styles here based on src/Pie/Pie.css
const styles = {
  fontFamily: 'Roboto Condensed',
  fontSize: proportionBase * 0.08,
  fontWeight: 400,
  color: '#706371',
  fill: '#706371',
};

const colors = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99',
  '#b15928',
  '#8dd3c7',
  '#fb8072',
  '#80b1d3',
  '#bebada',
  '#ffed6f',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  '#d9d9d9',
  '#bc80bd',
  '#ccebc5',
  '#ffffb3',
];

class ErPieChart extends Component {
  render() {
    return (
      <RechartsPie
        data={this.props.data}
        chartProportions={chartProportions}
        colors={colors}
        styles={styles}
      />
    );
  }
}

export default ErPieChart;
