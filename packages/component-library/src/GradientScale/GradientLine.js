import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'victory';


const GradientLine = ({ x, datum, scale }) => {
  const isPrimary = datum.type === 'primary';
  const stroke = isPrimary ? 'black' : 'gold';
  const overlap = isPrimary ? 10 : 5;
  return (
    <Line
      y1={scale.y(0) + overlap} y2={scale.y(1) - overlap}
      x1={x}
      x2={x}
      style={{ stroke, strokeWidth: 10 }}
    />
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
