import PropTypes from "prop-types";
import React from "react";
import DeckGL, { ScreenGridLayer } from "deck.gl";

const ScreenGridMap = props => {
  const {
    viewport,
    data,
    getPosition,
    opacity,
    colorDomain,
    colorRange,
    cellSizePixels,
    autoHighlight,
    onLayerClick,
    visible,
    gpuAggregation,
    getSize,
    getWeight,
    getCursor,
    aggregation,
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
      <DeckGL className="DeckGL" {...viewport} getCursor={getCursor}>
        <ScreenGridLayer
          id="screengrid-layer"
          className="ScreenGridMap"
          pickable
          data={data}
          getPosition={getPosition}
          opacity={opacity}
          colorDomain={colorDomain}
          colorRange={colorRange}
          cellSizePixels={cellSizePixels}
          autoHighlight={autoHighlight}
          onClick={onLayerClick}
          updateTriggers={{ instanceColors: colorRange }}
          visible={visible}
          gpuAggregation={gpuAggregation}
          getSize={getSize}
          getWeight={getWeight}
          onHover={onHover}
          aggregation={aggregation}
        />
      </DeckGL>
      {tooltipRender}
    </div>
  );
};

ScreenGridMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  colorDomain: PropTypes.arrayOf(PropTypes.number),
  colorRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  cellSizePixels: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
  visible: PropTypes.bool,
  gpuAggregation: PropTypes.bool,
  getSize: PropTypes.func,
  getWeight: PropTypes.func,
  getCursor: PropTypes.func,
  aggregation: PropTypes.oneOf(["SUM", "MIN", "MEAN", "MAX"]),
  tooltipInfo: PropTypes.shape({}),
  x: PropTypes.number,
  y: PropTypes.number,
  onHover: PropTypes.func,
  children: PropTypes.node
};

ScreenGridMap.defaultProps = {
  getPosition: d => d.geometry.coordinates,
  opacity: 0.8,
  colorRange: [[255, 255, 204], [161, 218, 180], [65, 182, 196], [34, 94, 168]],
  cellSizePixels: 25,
  autoHighlight: true,
  visible: true,
  gpuAggregation: false,
  getSize: () => 1,
  getWeight: () => 1,
  getCursor: () => "crosshair",
  aggregation: "SUM"
};

export default ScreenGridMap;
