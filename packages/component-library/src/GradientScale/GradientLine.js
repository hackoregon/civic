import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'victory';


const GradientLine = ({ x, datum, scale }) => {
  return (
    <Line y1={scale.y(0) + 10} y2={scale.y(1) - 10} x1={x} x2={x} style={{ stroke: 'black', strokeWidth: 10 }} />
  );
};

GradientLine.propTypes = {
  x: PropTypes.number,
  datum: PropTypes.shape({
    type: PropTypes.string,
  }),
  scale: PropTypes.shape({
    y: PropTypes.func,
  }),
};

export default GradientLine;
