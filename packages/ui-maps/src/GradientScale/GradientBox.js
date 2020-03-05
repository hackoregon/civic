import React from "react";
import PropTypes from "prop-types";

import { Box } from "victory";

const GradientBox = ({ scale, domain, fill }) => {
  const width = scale.x(domain.x[1]) - scale.x(domain.x[0]);
  const height = Math.abs(scale.y(domain.y[1]) - scale.y(domain.y[0]));
  return (
    <Box
      x={scale.x(domain.x[0])}
      y={scale.y(domain.y[1])}
      width={width}
      height={height}
      style={{ fill, stroke: "none" }}
    />
  );
};

GradientBox.propTypes = {
  scale: PropTypes.shape({
    y: PropTypes.func,
    x: PropTypes.func
  }),
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  fill: PropTypes.string.isRequired
};

export default GradientBox;
