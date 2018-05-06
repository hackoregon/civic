import React, { PropTypes } from 'react';
import { VictoryLegend, VictoryPie } from 'victory';
import './Pie.css';
import { civic as civicTheme } from '../VictoryTheme/VictoryThemeIndex';

const formatLegendDataObject = (value, labelProp) => (
  { name: value[labelProp ? labelProp : 'x'] }
);

const PieChart = (props) => {
  const {
    colors,
    data,
    labelKey,
    dataKey,
    innerRadius,
  } = props;

  const height = props.height == null ? '100vh' : props.height;
  const width = props.width == null ? '100vw' : props.width;

  return (
    <div className="pie-chart" style={{ width, height }}>
      <VictoryPie
        data={data}
        innerRadius={innerRadius}
        colorScale={colors}
        theme={civicTheme}
        animate={{
          duration: 1000
        }}
        x={labelKey}
        y={dataKey}
      />
    </div>
  )
};

PieChart.defaultProps = {
  height: '100vh',
  width: '100vw',
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  innerRadius: PropTypes.number,
  colorScale: PropTypes.array,
  height: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
};

export default PieChart;