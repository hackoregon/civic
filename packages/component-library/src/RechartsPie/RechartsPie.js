/* Deprecated component, 2017 only */
/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const RechartsPie = ({ data, chartProportions, colors, styles }) => (
  <div
    style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }}
  >
    <PieChart
      width={chartProportions.chartWidth}
      height={chartProportions.chartHeight}
      data={data}
    >
      <Legend
        layout="vertical"
        iconSize={chartProportions.iconSize}
        wrapperStyle={styles}
        iconType="square"
        verticalAlign="middle"
        align="right"
      />
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={chartProportions.pieInnerRadius}
        outerRadius={chartProportions.pieOuterRadius}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  </div>
);

RechartsPie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartProportions: PropTypes.object.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
};

export default RechartsPie;
