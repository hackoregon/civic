import React from 'react';
import PropTypes from 'prop-types';
import { Treemap, ResponsiveContainer } from 'recharts';

const COLORS = ['#75568D', '#e3dde8'];

const Content = (options) => {
  const { x, y, width, height, value, name, index } = options;
  const textStyle = {
    textAlign: 'left',
  };
  if (value > 35) {
    textStyle.color = 'white';
  }
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: index === 0 ? COLORS[0] : COLORS[1],
          stroke: '#fff',
          strokeWidth: '3',
        }}
      />
      <foreignObject x={x + 10} y={y - 5} width={width - 10}>
        <p xmlns="http://www.w3.org/1999/xhtml" style={textStyle} >
          {name}<b>  {value}%</b>
        </p>
      </foreignObject>

    </g>
  );
};

const TreemapChart = props => (
  <div style={{ marginBottom: '30px' }}>
    <ResponsiveContainer width={'100%'} height={300}>
      <Treemap
        data={props.dataSet}
        dataKey="value"
        ratio={1 / 1}
        stroke="#fff"
        fill="#75568D"
        content={<Content />}
      />
    </ResponsiveContainer>
  </div>
);

TreemapChart.propTypes = {
  dataSet: PropTypes.array.isRequired,
};

export default TreemapChart;
