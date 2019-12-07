import { Fragment } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

/** @jsx jsx */
import { jsx } from "@emotion/core";

const PolygonPreview = ({
  feature,
  width,
  height,
  stroke,
  strokeWidth,
  fill,
  fillOpacity,
  padding
}) => {
  const projection = d3
    .geoIdentity()
    .fitExtent(
      [[padding, padding], [width - padding, height - padding]],
      feature
    );

  const background = d3.geoPath().projection(projection)(feature);

  return (
    <Fragment>
      <svg width={width} height={height}>
        <path
          d={background}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          fillOpacity={fillOpacity}
        />
      </svg>
    </Fragment>
  );
};

PolygonPreview.propTypes = {
  feature: PropTypes.shape({ type: PropTypes.string }),
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  fillOpacity: PropTypes.number,
  padding: PropTypes.number
};

PolygonPreview.defaultProps = {
  width: 650,
  height: 350,
  stroke: "#000000",
  strokeWidth: 1,
  fill: "#000000",
  fillOpacity: 0,
  padding: 5
};

PolygonPreview.displayName = "PolygonPreview";

export default PolygonPreview;
