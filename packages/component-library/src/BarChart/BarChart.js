import React, { PropTypes } from 'react';
import {
  BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar,
} from 'recharts';

const HorizontalBarChart = ({ data }) =>
  <BarChart layout="horizontal" width={730} height={250} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar dataKey="x" fill="#8884d8" />
    <Bar dataKey="y" fill="#82ca9d" />
  </BarChart>;

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default HorizontalBarChart;