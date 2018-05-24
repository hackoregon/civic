import React, { PropTypes } from 'react';
import DeckGL, { ScreenGridLayer } from 'deck.gl';

const ScreenGridMap = (props) => {
  const {
    viewport,
    data,
    getPosition,
    opacity,
    colorRange,
    cellSizePixels,
    autoHighlight,
    onLayerClick,
  } = props;

  return (
    <div>
      <DeckGL
        className={'DeckGL'}
        {...viewport}
      >
        <ScreenGridLayer
          id={'screengrid-layer'}
          className={'ScreenGridMap'}
          pickable={true}
          data={data}
          getPosition={getPosition}
          opacity={opacity}
          colorRange={colorRange}
          cellSizePixels={cellSizePixels}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          updateTriggers={{instanceColors: colorRange}}
        />
      </DeckGL>
    </div>
  );
};

ScreenGridMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  colorRange: PropTypes.array,
  cellSizePixels: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
};

ScreenGridMap.defaultProps = {
  getPosition: d => d.geometry.coordinates,
  opacity: 0.8,
  colorRange: [[255,255,204],[161,218,180],[65,182,196],[34,94,168]],
  cellSizePixels: 25,
  autoHighlight: true,
};

export default ScreenGridMap;
