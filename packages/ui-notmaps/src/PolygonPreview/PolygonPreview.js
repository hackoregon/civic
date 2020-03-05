import { Fragment } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

/** @jsx jsx */
import { jsx } from "@emotion/core";

const PolygonPreview = ({
  feature,
  svgCss,
  svgWidth,
  svgHeight,
  stroke,
  strokeWidth,
  fill,
  fillOpacity,
  padding,
  reflectY
}) => {
  const projection = d3
    .geoIdentity()
    .reflectY(reflectY) // need to flip to translate between coordinate systems https://github.com/d3/d3-geo/issues/68
    .fitExtent(
      [[padding, padding], [svgWidth - padding, svgHeight - padding]],
      feature
    );

  const background = d3.geoPath().projection(projection)(feature);

  return (
    <Fragment>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} css={svgCss}>
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
  svgCss: PropTypes.shape({}),
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  fillOpacity: PropTypes.number,
  padding: PropTypes.number,
  reflectY: PropTypes.bool
};

PolygonPreview.defaultProps = {
  svgWidth: 650,
  svgHeight: 350,
  stroke: "#000000",
  strokeWidth: 1,
  fill: "#000000",
  fillOpacity: 0,
  padding: 5,
  reflectY: true
};

PolygonPreview.displayName = "PolygonPreview";

export default PolygonPreview;
