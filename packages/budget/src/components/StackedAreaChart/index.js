import React from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { data, colors } from './utils';

const StackedAreaChart = props => {
  // Maps data to create lines/areas
  const lines = [];
  const myKeys = Object.keys(data[0]);
  myKeys.forEach((key, index) => {
    if (key !== 'name') {
      lines.push(
        <Area
          type="linear"
          key={`${key} + ${Math.rand}`}
          dataKey={myKeys[index]}
          stroke={'#fff'}
          strokeWidth={5}
          stackId={1}
          fillOpacity={1}
          fill={colors[index]}
        />
      );
    }
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: 'auto',
      }}
    >
      <AreaChart
        width={780}
        height={300}
        data={props.data}
        colors={props.colors}
      >
        <XAxis tick={{ transform: 'translate(-2, 5)' }} dataKey="name" />
        <YAxis tick={{ transform: 'translate(0, -2)' }} width={90} />
        {lines}
        <Tooltip
          itemStyle={{ color: '#339963', textAlign: 'left' }}
          labelStyle={{ color: 'black' }}
          wrapperStyle={{ border: '1px solid #706371', borderRadius: '5px' }}
        />
      </AreaChart>
    </div>
  );
};

// StackedAreaChart.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   colors: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

StackedAreaChart.defaultProps = {
  width: 780,
  height: 300,
  data: data,
  colors: colors,
};

export default StackedAreaChart;
