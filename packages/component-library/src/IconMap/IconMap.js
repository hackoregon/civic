import React, { PropTypes } from 'react';
import DeckGL, { IconLayer } from 'deck.gl';

const IconMap = (props) => {
  const {
    viewport,
    data,
    opacity,
    iconAtlas,
    iconMapping,
    iconSizeScale,
    getPosition,
    getIcon,
    getSize,
    getColor,
    autoHighlight,
    onLayerClick,
  } = props;

  return (
    <div>
      <DeckGL
        className={'DeckGL'}
        {...viewport}
      >
        <IconLayer
          id={'icon-layer'}
          className={'IconMap'}
          pickable={true}
          data={data}
          opacity={opacity}
          iconAtlas={iconAtlas}
          iconMapping={iconMapping}
          sizeScale={iconSizeScale}
          getPosition={getPosition}
          getIcon={getIcon}
          getSize={getSize}
          getColor={getColor}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
        />
      </DeckGL>
    </div>
  );
};

IconMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  opacity: PropTypes.number,
  iconAtlas: PropTypes.string,
  iconMapping: PropTypes.object,
  iconSizeScale: PropTypes.number,
  getPosition: PropTypes.func,
  getIcon: PropTypes.func,
  getSize: PropTypes.func,
  getColor: PropTypes.func,
  autoHighlight: PropTypes.bool,
  onClick: PropTypes.func,
};

IconMap.defaultProps = {
  opacity: 1,
  iconSizeScale: 1,
  getPosition: d => d.geometry.coordinates,
  getSize: d => 10,
  getColor: d => [0,0,0],
};

export default IconMap;
