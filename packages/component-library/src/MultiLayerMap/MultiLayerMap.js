/* eslint-disable no-nested-ternary */
import React from "react";
import { arrayOf, func, node, shape } from "prop-types";
import DeckGL from "deck.gl";

import createMapLayers from "./createLayers";

const MultiLayerMap = props => {
  const { viewport, mapLayers, children, onHoverSlide } = props;

  const renderMaps = mapLayers.map((layerData, index) => {
    const { mapType } = layerData;
    return mapType === "PathMap"
      ? createMapLayers.makePathMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ScatterPlotMap"
      ? createMapLayers.makeScatterPlotMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ScreenGridMap"
      ? createMapLayers.makeScreenGridMap({
          ...layerData,
          index
        })
      : mapType === "IconMap"
      ? createMapLayers.makeIconMap({
          ...layerData,
          index,
          onHoverSlide,
          viewport
        })
      : mapType === "SmallPolygonMap"
      ? createMapLayers.makeSmallPolygonMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ChoroplethMap"
      ? createMapLayers.makeChoroplethMap({
          ...layerData,
          index
        })
      : null;
  });

  return (
    <DeckGL
      className="DeckGL-Map-Layer"
      getCursor={() => "crosshair"}
      {...viewport}
    >
      {renderMaps}
      {children}
    </DeckGL>
  );
};

MultiLayerMap.propTypes = {
  viewport: shape({}),
  mapLayers: arrayOf(shape({})).isRequired,
  onHoverSlide: func,
  onClick: func,
  children: node
};

MultiLayerMap.defaultProps = {};

export default MultiLayerMap;
