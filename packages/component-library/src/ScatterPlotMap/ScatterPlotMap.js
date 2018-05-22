import React from 'react';
import PropTypes from 'prop-types';
import DeckGL, { ScatterplotLayer } from 'deck.gl';

const ScatterPlotMap = (props) => {
  const {
    viewport,
    data,
    getPosition,
    getFillColor,
    opacity,
    getRadius,
    radiusScale,
    outline,
    strokeWidth,
    autoHighlight,
    onLayerClick,
  } = props;

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: data,
      getPosition: getPosition,
      pickable: true,
      getColor: getFillColor,
      opacity: opacity,
      getRadius: getRadius,
      radiusScale: radiusScale,
      radiusMinPixels: 1,
      radiusMaxPixels: 500,
      outline: outline,
      strokeWidth: strokeWidth,
      autoHighlight: autoHighlight,
      onClick: onLayerClick,
      parameters: {
        depthTest: false,
      },
    }),
  ];

  return (
    <div>
      <DeckGL
          {...viewport}
          layers={layers}
      />
    </div>
  );
};

ScatterPlotMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.array.isRequired,
  getPosition: PropTypes.func,
  getColor: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  opacity: PropTypes.number,
  getRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    ]),
  radiusScale: PropTypes.number,
  outline: PropTypes.bool,
  strokeWidth: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
};

export default ScatterPlotMap;
