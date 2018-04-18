import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts';

const tickLabel = (options) => {
  const { payload, x, y } = options;
  return (
    <Text y={y - 22} x={x + 5}>{payload.value}</Text>
  );
};

const barLabel = (options) => {
  const { payload, x, y } = options;
  return (
    <Text y={y + 5} x={x}>{`${payload.value}%`}</Text>
  );
};

const ListBarChart = props => (
  <ResponsiveContainer width="100%" height={'100%'} minHeight={1200} >
    <BarChart
      data={props.data}
      layout={'vertical'}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis
        domain={[0, 6]}
        type="number"
        axisLine={false}
        tickLine={false}
        tick={false}
      />
      <YAxis
        tick={tickLabel}
        type="category"
        dataKey="name"
        tickLine={false}
        axisLine={false}
      />
      <Bar
        dataKey="value"
        fill={props.colors[0]}
        label={barLabel}
        legendType={'none'}
        barSize={25}
      />
    </BarChart>
  </ResponsiveContainer>
);

ListBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default ListBarChart;
