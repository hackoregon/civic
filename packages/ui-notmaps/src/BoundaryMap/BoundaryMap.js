import PropTypes from "prop-types";
import React from "react";
import DeckGL, { PolygonLayer } from "deck.gl";

const BoundaryMap = props => {
  const {
    viewport,
    data,
    opacity,
    getPolygon,
    getLineColor,
    getLineWidth,
    lineWidthScale,
    lineJointRounded,
    getFillColor,
    filled
  } = props;

  return (
    <div>
      <DeckGL className="DeckGL" {...viewport}>
        <PolygonLayer
          id="polygon-layer"
          className="BoundaryMap"
          pickable={false}
          data={data}
          opacity={opacity}
          getPolygon={getPolygon}
          getLineColor={getLineColor}
          getLineWidth={getLineWidth}
          lineWidthScale={lineWidthScale}
          lineWidthMinPixels={1}
          lineJointRounded={lineJointRounded}
          stroked
          getFillColor={getFillColor}
          filled={filled}
          updateTriggers={{
            getLineColor,
            getFillColor
          }}
        />
      </DeckGL>
    </div>
  );
};

BoundaryMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  opacity: PropTypes.number,
  getPolygon: PropTypes.func,
  getLineColor: PropTypes.func,
  getLineWidth: PropTypes.func,
  lineWidthScale: PropTypes.number,
  lineJointRounded: PropTypes.bool,
  getFillColor: PropTypes.func,
  filled: PropTypes.bool
};

BoundaryMap.defaultProps = {
  opacity: 1,
  getLineColor: () => [255, 0, 0, 255],
  getLineWidth: () => 40,
  lineWidthScale: 1,
  lineJointRounded: false,
  getFillColor: () => [0, 0, 0, 0],
  filled: false
};

export default BoundaryMap;
