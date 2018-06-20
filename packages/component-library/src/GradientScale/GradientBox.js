import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'victory';


const GradientLine = ({ scale, domain }) => {
  const width = scale.x(domain.x[1]) - scale.x(domain.x[0]);
  const height = Math.abs(scale.y(domain.y[1]) - scale.y(domain.y[0]));
  return (
    <Box x={scale.x(domain.x[0])} y={scale.y(domain.y[1])} width={width} height={height} style={{ fill: 'red' }} />
  );
};

GradientLine.propTypes = {
  scale: PropTypes.shape({
    y: PropTypes.func,
    x: PropTypes.func,
  }),
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default GradientLine;
