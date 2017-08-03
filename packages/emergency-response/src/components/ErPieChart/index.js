import React, { Component } from 'react';
import RechartsPie from '@hackoregon/component-library/lib/RechartsPie/RechartsPie';

// This base can be adjusted to scale up or down the chart and legend
const proportionBase = 400;

// These multipliers can be adjusted to modify the individual
const chartProportions = {
  chartWidth: proportionBase * 1,
  chartHeight: proportionBase * 1,
  iconSize: proportionBase * 0.075,
  pieInnerRadius: proportionBase * 0.2,
  pieOuterRadius: proportionBase * 0.4,
};

// Styles here based on src/Pie/Pie.css
const styles = {
  display: 'none',
  fontFamily: 'Roboto Condensed',
  fontSize: proportionBase * 0.08,
  fontWeight: 400,
  color: '#706371',
  fill: '#706371',
};

const colors = [
  '#d7075f', '#e34d77', '#ed7690', '#f599ab', '#fbbcc6', '#fedde2',
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
