import React from 'react';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryScatter } from 'victory';

import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const colorScale = [
  '#ffffd2',
  '#ffefac',
  '#fee296',
  '#fec375',
  '#fd9b54',
  '#fc6443',
  '#e63638',
  '#c51f40',
];

const GradientScale = ({ domain, primary, secondary = [] }) => {
  const height = 200;
  const width = 600;
  const data = [
    { x: primary, y: 0, type: 'primary' },
    ...secondary.map(num => ({ x: num, y: 0, type: 'secondary' })),
  ];
  return (
    <VictoryChart
      theme={CivicVictoryTheme.civic}
      domain={{ x: domain, y: [0, 1] }}
      height={height}
      width={width}
    >
      <VictoryScatter data={data} />
    </VictoryChart>
  );
};

GradientScale.propTypes = {
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  primary: PropTypes.number.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.number),
};

export default GradientScale;
