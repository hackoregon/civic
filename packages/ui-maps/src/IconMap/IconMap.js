import PropTypes from "prop-types";
import React from "react";
import DeckGL, { IconLayer } from "deck.gl";

const IconMap = props => {
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
    getCursor,
    autoHighlight,
    onLayerClick,
    visible,
    tooltipInfo,
    x,
    y,
    onHover,
    children
  } = props;

  const { zoom } = viewport;
  const sizeScale = iconSizeScale(zoom);

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo,
      x,
      y
    });
  });

  const tooltipRender = tooltipInfo && x && y ? tooltip : null;

  return (
    <div>
      <DeckGL className="DeckGL" {...viewport} getCursor={getCursor}>
        <IconLayer
          id="icon-layer"
          className="IconMap"
          pickable
          data={data}
          opacity={opacity}
          iconAtlas={iconAtlas}
          iconMapping={iconMapping}
          sizeScale={sizeScale}
          getPosition={getPosition}
          getIcon={getIcon}
          getSize={getSize}
          getColor={getColor}
          getCursor={getCursor}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          onHover={onHover}
          visible={visible}
          updateTriggers={{ getSize }}
        />
      </DeckGL>
      {tooltipRender}
    </div>
  );
};

IconMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  opacity: PropTypes.number,
  iconAtlas: PropTypes.string,
  iconMapping: PropTypes.shape({}),
  iconSizeScale: PropTypes.func,
  sizeScale: PropTypes.number,
  getPosition: PropTypes.func,
  getIcon: PropTypes.func,
  getSize: PropTypes.func,
  getColor: PropTypes.func,
  getCursor: PropTypes.func,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
  tooltipInfo: PropTypes.shape({}),
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node
};

IconMap.defaultProps = {
  opacity: 1,
  sizeScale: 1,
  getPosition: d => d.geometry.coordinates,
  getSize: () => 10,
  getColor: () => [0, 0, 0],
  getCursor: () => "crosshair",
  visible: true
};

export default IconMap;
