import React, { PropTypes } from 'react';
import DeckGL, { PathLayer } from 'deck.gl';

const PathMap = (props) => {
  const {
    viewport,
    data,
    getColor,
    opacity,
    getPath,
    getWidth,
    widthScale,
    rounded,
    autoHighlight,
    highlightColor,
    onLayerClick,
  } = props;

  return (
    <div>
      <DeckGL
        className={'DeckGL'}
        {...viewport}
      >
        <PathLayer
          id={'path-layer'}
          className={'PathMap'}
          pickable={true}
          data={data}
          getColor={getColor}
          opacity={opacity}
          getPath={getPath}
          getWidth={getWidth}
          widthScale={widthScale}
          widthMinPixels={1}
          rounded={rounded}
          autoHighlight={autoHighlight}
          highlightColor={highlightColor}
          onClick={onLayerClick}
          parameters={{depthTest: false}}
          updateTriggers={{instanceColors: getColor}}
        />
      </DeckGL>
    </div>
  );
};

PathMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getColor: PropTypes.func,
  opacity: PropTypes.number,
  getPath: PropTypes.func,
  getWidth: PropTypes.func,
  widthScale: PropTypes.number,
  rounded: PropTypes.bool,
  autoHighlight: PropTypes.bool,
  highlightColor: PropTypes.array,
  onLayerClick: PropTypes.func,
};

PathMap.defaultProps = {
  getColor: d => [0,0,0],
  opacity: 0.9,
  getPath: d => d.geometry.coordinates,
  getWidth: d => 10,
  widthScale: 1,
  rounded: true,
};

export default PathMap;
