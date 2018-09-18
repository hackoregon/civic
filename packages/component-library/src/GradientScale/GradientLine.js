import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'victory';


const GradientLine = ({ x, datum, scale }) => {
  const isPrimary = datum.type === 'primary';
  const stroke = isPrimary ? '#201024' : '#AAA4AB';
  const overlap = isPrimary ? 5 : 3;
  const width = isPrimary ? 8 : 6;
  const opacity = isPrimary ? 1 : 0.7;
  return (
    <Line
      y1={scale.y(0) + overlap} y2={scale.y(1) - overlap}
      x1={x}
      x2={x}
      style={{ stroke, strokeWidth: width, strokeOpacity: opacity }}
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
