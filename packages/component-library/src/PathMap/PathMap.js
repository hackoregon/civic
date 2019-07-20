import PropTypes from "prop-types";
import React from "react";
import DeckGL, { PathLayer } from "deck.gl";

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
    children
  } = props;

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
      <DeckGL className="DeckGL" {...viewport} getCursor={() => "crosshair"}>
        <PathLayer
          id="path-layer"
          className="PathMap"
          pickable
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
      </DeckGL>
      {tooltipRender}
    </div>
  );
};

PathMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  opacity: PropTypes.number,
  getPath: PropTypes.func,
  getWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  widthScale: PropTypes.number,
  rounded: PropTypes.bool,
  autoHighlight: PropTypes.bool,
  highlightColor: PropTypes.arrayOf(PropTypes.number),
  onLayerClick: PropTypes.func,
  visible: PropTypes.bool,
  tooltipInfo: PropTypes.shape({}),
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node
};

PathMap.defaultProps = {
  getColor: () => [0, 0, 0],
  opacity: 0.9,
  getPath: d => d.geometry.coordinates,
  getWidth: () => 10,
  widthScale: 1,
  rounded: false,
  autoHighlight: true,
  highlightColor: [0, 0, 128, 191],
  visible: true
};

export default PathMap;
