import React, { PropTypes } from 'react';
import DeckGL, { IconLayer } from 'deck.gl';
import { css } from 'emotion';

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
    children,
  } = props;

  const zoom = viewport.zoom;
  const sizeScale = iconSizeScale(zoom);

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo: tooltipInfo,
      x: x,
      y: y,
    });
  });

  const tooltipRender = tooltipInfo ? tooltip : null;

  return (
    <div className={crosshair}>
      <DeckGL className={'DeckGL'} {...viewport}>
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
          onHover={onHover}
          visible={visible}
          updateTriggers={{ getSize: getSize }}
        />
        {tooltipRender}
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
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node,
};

IconMap.defaultProps = {
  opacity: 1,
  sizeScale: 1,
  getPosition: d => d.geometry.coordinates,
  getSize: d => 10,
  getColor: d => [0, 0, 0],
  visible: true,
};

export default IconMap;
