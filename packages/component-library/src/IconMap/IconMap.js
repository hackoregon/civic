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
    visible,
  } = props;

  const sizeScale = iconSizeScale(viewport.zoom);

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
          sizeScale={sizeScale}
          getPosition={getPosition}
          getIcon={getIcon}
          getSize={getSize}
          getColor={getColor}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          visible={visible}
          updateTriggers={{getSize: getSize}}
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
  sizeScale: PropTypes.number,
  getPosition: PropTypes.func,
  getIcon: PropTypes.func,
  getSize: PropTypes.func,
  getColor: PropTypes.func,
  autoHighlight: PropTypes.bool,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};

IconMap.defaultProps = {
  opacity: 1,
  sizeScale: 1,
  getPosition: d => d.geometry.coordinates,
  getSize: d => 10,
  getColor: d => [0,0,0],
  visible: true,
};

export default IconMap;
