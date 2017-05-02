import React from 'react';
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

  return (
    <PieChart width={500} height={400}>
      <Pie
        data={data}
        cx={300}
        cy={200}
        labelLine={false}
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
