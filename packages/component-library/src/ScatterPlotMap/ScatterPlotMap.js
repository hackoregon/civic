import React, { PropTypes } from 'react';
import DeckGL, { ScatterplotLayer } from 'deck.gl';

const ScatterPlotMap = (props) => {
  const {
    viewport,
    data,
    getPosition,
    opacity,
    getColor,
    getRadius,
    radiusScale,
    outline,
    strokeWidth,
    autoHighlight,
    onLayerClick,
  } = props;

  return (
    <div>
      <DeckGL
        className={'DeckGL'}
        {...viewport}
      >
        <ScatterplotLayer
          className={'ScatterPlotMap'}
          id={'scatterplot-layer'}
          pickable={true}
          data={data}
          getPosition={getPosition}
          opacity={opacity}
          getColor={getColor}
          getRadius={getRadius}
          radiusScale={radiusScale}
          radiusMinPixels={1}
          radiusMaxPixels={500}
          outline={outline}
          strokeWidth={strokeWidth}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          parameters={{depthTest: false}}
        />
      </DeckGL>
    </div>
  );
};

ScatterPlotMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  getColor: PropTypes.func,
  getRadius: PropTypes.func,
  radiusScale: PropTypes.number,
  outline: PropTypes.bool,
  strokeWidth: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
};

ScatterPlotMap.defaultProps = {
  getPosition: d => d.geometry.coordinates,
  opacity: 0.8,
  getColor: d => [0,0,0],
  getRadius: d => 50,
  radiusScale: 1,
  outline: false,
  strokeWidth: 1,
};

export default ScatterPlotMap;
