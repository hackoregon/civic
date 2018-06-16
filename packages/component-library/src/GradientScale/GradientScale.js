import React from 'react';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryStack, VictoryArea } from 'victory';

import CivicVictoryTheme from '../VictoryTheme/VictoryThemeIndex';

const GradientScale = ({ data }) => (
  <VictoryChart theme={CivicVictoryTheme.civic}>
    <VictoryStack>
      <VictoryArea data={data} />
    </VictoryStack>
  </VictoryChart>
);

GradientScale.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // domain: PropTypes.objectOf(PropTypes.array),
  // rank: PropTypes.number
};

export default GradientScale;
