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

  const layers = [
    new ScreenGridLayer({
      id: 'screengrid-layer',
      pickable: true,
      data: data,
      getPosition: getPosition,
      opacity: opacity,
      colorRange: colorRange,
      cellSizePixels: cellSizePixels,
      autoHighlight: autoHighlight,
      onClick: onLayerClick,
      updateTriggers: {
        instanceColors: colorRange,
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

ScreenGridMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.array.isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  colorRange: PropTypes.array,
  cellSizePixels: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
};

export default ScreenGridMap;
