import React, { PropTypes } from 'react';
import DeckGL, { PathLayer } from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const PathMap = props => {
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
    visible,
    tooltipInfo,
    x,
    y,
    onHover,
    children,
  } = props;

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
          onHover={onHover}
          parameters={{ depthTest: false }}
          updateTriggers={{ instanceColors: getColor }}
          visible={visible}
        />
        {tooltipRender}
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
  visible: PropTypes.bool,
  tooltipInfo: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node,
};

PathMap.defaultProps = {
  getColor: d => [0, 0, 0],
  opacity: 0.9,
  getPath: d => d.geometry.coordinates,
  getWidth: d => 10,
  widthScale: 1,
  rounded: false,
  autoHighlight: true,
  highlightColor: [0, 0, 128, 191],
  visible: true,
};

export default PathMap;
