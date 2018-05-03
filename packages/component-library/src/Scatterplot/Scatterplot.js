import React, { PropTypes } from 'react';
import {
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryTheme,
} from 'victory';

const ScatterPlot = ({ data, domain, style, theme, title }) => {
  const chartDomain = domain || {
    x: [0, Math.max(...data.map(value => value.x))],
    y: [0, Math.max(...data.map(value => value.y))],
  };

  return (
    <VictoryChart theme={theme} domain={chartDomain}>
      <VictoryLabel x={20} y={20} text={title} />
      <VictoryScatter style={style} size={7} data={data} />
    </VictoryChart>
  );
};

ScatterPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  ),
  domain: PropTypes.objectOf(PropTypes.array),
  style: PropTypes.objectOf(PropTypes.object),
  theme: PropTypes.objectOf(),
  title: PropTypes.string,
};

ScatterPlot.defaultProps = {
  data: null,
  domain: null,
  style: { data: { fill: d => d.fill } },
  theme: VictoryTheme.material,
  title: null,
};

export default ScatterPlot;
