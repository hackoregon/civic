/* eslint-disable no-nested-ternary */
import React from "react";
import { arrayOf, func, node, shape } from "prop-types";
import DeckGL from "deck.gl";

import MultiPathMap from "./MultiPathMap";
import MultiScatterPlotMap from "./MultiScatterPlotMap";
import MultiScreenGridMap from "./MultiScreenGridMap";
import MultiIconMap from "./MultiIconMap";
import MultiSmallPolygonMap from "./MultiSmallPolygonMap";
import MultiChoroplethMap from "./MultiChoroplethMap";

const MultiLayerMap = props => {
  const { viewport, mapLayers, children, onHoverSlide } = props;

  const renderMaps = mapLayers.map((layerData, index) => {
    const { mapType } = layerData;
    return mapType === "PathMap"
      ? MultiPathMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ScatterPlotMap"
      ? MultiScatterPlotMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ScreenGridMap"
      ? MultiScreenGridMap({
          ...layerData,
          index
        })
      : mapType === "IconMap"
      ? MultiIconMap({
          ...layerData,
          index,
          onHoverSlide,
          viewport
        })
      : mapType === "SmallPolygonMap"
      ? MultiSmallPolygonMap({
          ...layerData,
          index,
          onHoverSlide
        })
      : mapType === "ChoroplethMap"
      ? MultiChoroplethMap({
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
