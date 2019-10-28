import PropTypes from "prop-types";
import React from "react";
import DeckGL, { ScreenGridLayer } from "deck.gl";

const ScreenGridMap = props => {
  const {
    viewport,
    data,
    getPosition,
    opacity,
    colorRange,
    cellSizePixels,
    autoHighlight,
    onLayerClick,
    visible,
    gpuAggregation,
    getSize,
    getWeight,
    getCursor,
    onHover
  } = props;

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
        />
      </DeckGL>
    </div>
  );
};

ScreenGridMap.propTypes = {
  viewport: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getPosition: PropTypes.func,
  opacity: PropTypes.number,
  colorRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  cellSizePixels: PropTypes.number,
  autoHighlight: PropTypes.bool,
  onLayerClick: PropTypes.func,
  visible: PropTypes.bool,
  gpuAggregation: PropTypes.bool,
  getSize: PropTypes.func,
  getWeight: PropTypes.func,
  getCursor: PropTypes.func,
  onHover: PropTypes.func
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
  getCursor: () => "crosshair"
};

export default ScreenGridMap;
