import React from 'react';
import {
  AreaChart, XAxis, YAxis, CartesianGrid, Area, Legend, Tooltip,
} from 'recharts';


const data = [
      { name: 'FY 2006-2007', 'Public Safety': 375542531, 'Community Development': 223755032, 'Public Utilities': 1472330509, 'Legislative and Administrative': 872038820, 'Transportation & Parking': 256320999, 'Parks, Recreation, & Culture': 131163373, 'Elected Officials': 2000 },
      { name: 'FY 2007-2008', 'Public Safety': 399363449, 'Community Development': 202622775, 'Public Utilities': 1609400176, 'Legislative and Administrative': 925177129, 'Transportation & Parking': 206543005, 'Parks, Recreation, & Culture': 151307392, 'Elected Officials': 2000 },
      { name: 'FY 2008-2009', 'Public Safety': 430686323, 'Community Development': 240250960, 'Public Utilities': 1250875024, 'Legislative and Administrative': 816094302, 'Transportation & Parking': 193378286, 'Parks, Recreation, & Culture': 148890051, 'Elected Officials': 2000 },
      { name: 'FY 2009-2010', 'Public Safety': 470884013, 'Community Development': 278318958, 'Public Utilities': 1303193630, 'Legislative and Administrative': 852309239, 'Transportation & Parking': 240283972, 'Parks, Recreation, & Culture': 128010408, 'Elected Officials': 2000 },
      { name: 'FY 2010-2011', 'Public Safety': 476588146, 'Community Development': 411658494, 'Public Utilities': 1705198802, 'Legislative and Administrative': 881091079, 'Transportation & Parking': 246067362, 'Parks, Recreation, & Culture': 128894919, 'Elected Officials': 2000 },
      { name: 'FY 2011-2012', 'Public Safety': 480159893, 'Community Development': 469510996, 'Public Utilities': 1189209735, 'Legislative and Administrative': 936606841, 'Transportation & Parking': 237111101, 'Parks, Recreation, & Culture': 142276810, 'Elected Officials': 2000 },
      { name: 'FY 2012-2013', 'Public Safety': 475218943, 'Community Development': 325118678, 'Public Utilities': 1537815556, 'Legislative and Administrative': 872416369, 'Transportation & Parking': 238643517, 'Parks, Recreation, & Culture': 142562186, 'Elected Officials': 2000 },
      { name: 'FY 2013-2014', 'Public Safety': 496342942, 'Community Development': 269674746, 'Public Utilities': 1582081673, 'Legislative and Administrative': 915480675, 'Transportation & Parking': 273179274, 'Parks, Recreation, & Culture': 177023891, 'Elected Officials': 2000 },
      { name: 'FY 2014-2015', 'Public Safety': 528545038, 'Community Development': 305495956, 'Public Utilities': 1728205623, 'Legislative and Administrative': 891908591, 'Transportation & Parking': 269265273, 'Parks, Recreation, & Culture': 173466646, 'Elected Officials': 2000 },
      { name: 'FY 2015-2016', 'Public Safety': 530104701, 'Community Development': 372799318, 'Public Utilities': 1985943260, 'Legislative and Administrative': 911966115, 'Transportation & Parking': 336629241, 'Parks, Recreation, & Culture': 219571533, 'Elected Officials': 2000 },
];
function StackedAreaChart() {
  return (
    <AreaChart width={1000} height={300} data={data}>
      <Legend layout="vertical" iconType="square" verticalAlign="top" align="left" />
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type='linear' dataKey='Public Safety' stackId="1" stroke='#329f7c' fill='#329f7c' />
      <Area type='linear' dataKey='Community Development' stackId="1" stroke='#3BBA92' fill='#3BBA92' />
      <Area type='linear' dataKey='Public Utilities' stackId="1" stroke='#54C9A4' fill='#54C9A4' />
      <Area type='linear' dataKey='Legislative and Administrative' stackId="1" stroke='#73D3B5' fill='#73D3B5' />
      <Area type='linear' dataKey='Transportation & Parking' stackId="1" stroke='#277C61' fill='#277C61' />
      <Area type='linear' dataKey='Parks, Recreation, & Culture' stackId="1" stroke='#1D5D49' fill='#1D5D49' />
      <Area type='linear' dataKey='Elected Officials' stackId="1" stroke='#143E31' fill='#143E31' />
    </AreaChart>

  );
}


/* ReactDOM.render(
  <StackedAreaChart />,
  document.getElementById('container')
); */

export default StackedAreaChart;
