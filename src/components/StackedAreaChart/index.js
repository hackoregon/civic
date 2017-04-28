import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip, Legend } from 'recharts';

import { data, colors } from './utils';

const StackedAreaChart = () => {
  const lines = [];

  const myKeys = Object.keys(data[0]);
  myKeys.forEach((key, index) => {
    if (key !== 'name') {
      lines.push(<Area
        type="linear"
        key={key}
        dataKey={myKeys[index]}
        stroke={'#fff'}
        strokeWidth={3}
        fillOpacity={1}
        fill={colors[index]}
      />);
    }
  });

  const CustomTooltip = () => {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${name}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
      <AreaChart width={800} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {lines}
      </AreaChart>
    </div>
  );
};

// StackedAreaChart.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   colors: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default StackedAreaChart;
