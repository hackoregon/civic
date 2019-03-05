import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  ReferenceLine,
} from 'recharts';

const StackedLineChart = ({ data, colors }) => {
  const lines = [];

  const myKeys = Object.keys(data[0]);
  myKeys.forEach((key, index) => {
    if (key !== 'name') {
      lines.push(
        <Line
          type="monotone"
          key={`${myKeys[index]}`}
          dataKey={`${myKeys[index]}`}
          stroke={colors[index]}
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
        fontSize: '.75em',
        maxWidth: '640px',
      }}
    >
      <ResponsiveContainer minWidth={320} height={480}>
        <LineChart
          data={data}
          margin={{ top: 0, bottom: 0, left: -20, right: 30 }}
        >
          <Legend
            layout="vertical"
            iconType="square"
            verticalAlign="bottom"
            align="center"
          />
          <XAxis dataKey="name" axisLine={false} />
          <YAxis domain={[-20, 20]} />
          <CartesianGrid stroke="#eeeeee" />
          <ReferenceLine y={0} stroke="black" />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

StackedLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StackedLineChart;
