import PropTypes from "prop-types";
import React from "react";
import DeckGL, { IconLayer } from "deck.gl";
import { css } from "emotion";

const crosshair = css`
  cursor: crosshair;
`;

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

  const tooltipRender = tooltipInfo ? tooltip : null;

  return (
    <div className={crosshair}>
      <DeckGL className="DeckGL" {...viewport}>
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
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          onHover={onHover}
          visible={visible}
          updateTriggers={{ getSize }}
        />
        {tooltipRender}
      </DeckGL>
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
  visible: true
};

export default IconMap;
