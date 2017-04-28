import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { data, colors } from './utils';

const StackedAreaChart = () => {
  // Maps data to create lines/areas
  const lines = [];
  const myKeys = Object.keys(data[0]);
  myKeys.forEach((key, index) => {
    if (key !== 'name') {
      lines.push(<Area
        type="linear"
        key={`${key} + ${Math.rand}`}
        dataKey={myKeys[index]}
        stroke={'#fff'}
        strokeWidth={3}
        stackId={index}
        fillOpacity={1}
        fill={colors[index]}
      />);
    }
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
      <AreaChart width={800} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        {lines}
        <Tooltip
          itemStyle={{ color: '#339963', textAlign: 'left' }}
          labelStyle={{ color: 'black' }}
          wrapperStyle={{ border: '2px solid #000',  borderRadius: '5px' }}
        />
      </AreaChart>
    </div>
  );
};

// StackedAreaChart.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   colors: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default StackedAreaChart;
