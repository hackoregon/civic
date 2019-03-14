import React, { PropTypes } from 'react';
import DeckGL, { PolygonLayer } from 'deck.gl';

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
    filled,
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
          updateTriggers={{ getLineColor }}
        />
      </DeckGL>
    </div>
  );
};

BoundaryMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  opacity: PropTypes.number,
  getPolygon: PropTypes.func,
  getLineColor: PropTypes.func,
  getLineWidth: PropTypes.func,
  lineWidthScale: PropTypes.number,
  lineJointRounded: PropTypes.bool,
  getFillColor: PropTypes.func,
  filled: PropTypes.bool,
};

BoundaryMap.defaultProps = {
  opacity: 1,
  getLineColor: d => [255, 0, 0, 255],
  getLineWidth: d => 40,
  lineWidthScale: 1,
  lineJointRounded: false,
  getFillColor: d => [0, 0, 0, 0],
  filled: false,
};

export default BoundaryMap;
