import React, { PropTypes } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

require('./PieChart.css');

const BudgetPie = () => {
  const data = [
    { name: 'Group A', value: 330 },
    { name: 'Group B', value: 230 },
    { name: 'Group C', value: 190 },
    { name: 'Group D', value: 160 },
    { name: 'Group E', value: 90 },
    { name: 'Group E', value: 90 },
    { name: 'Group E', value: 10 },
  ];
  const COLORS = ['#d7ece5', '#afd8cb', '#73bba4', '#73bba4', '#4ba78a', '#4ba78a', '#389E7D'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = (innerRadius + (outerRadius - innerRadius)) * 0.5;
    const x  = (cx + radius) * Math.cos(-midAngle * RADIAN);
    const y = (cy  + radius) * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x} y={y} fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={300}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
      >
        {data.map((entry, index) => <Cell key={`${entry} + ${Math.rand}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  );
};

export default BudgetPie;
