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
import VectorTilesMap from "../VectorTilesMap/VectorTilesMap";

const MultiLayerMap = props => {
  const {
    viewport,
    mapLayers,
    children,
    getCursor,
    onHoverSlide,
    onLayerClick,
    selectedFoundationDatum
  } = props;

  const renderMaps = mapLayers.map((layerData, index) => {
    const { mapType } = layerData;
    return mapType === "PathMap" ? (
      MultiPathMap({
        ...layerData,
        id: mapType + index,
        index,
        onHoverSlide
      })
    ) : mapType === "ScatterPlotMap" ? (
      MultiScatterPlotMap({
        ...layerData,
        id: mapType + index,
        index,
        onHoverSlide
      })
    ) : mapType === "ScreenGridMap" ? (
      MultiScreenGridMap({
        ...layerData,
        id: mapType + index,
        index
      })
    ) : mapType === "IconMap" ? (
      MultiIconMap({
        ...layerData,
        id: mapType + index,
        index,
        onHoverSlide,
        viewport
      })
    ) : mapType === "SmallPolygonMap" ? (
      MultiSmallPolygonMap({
        ...layerData,
        id: mapType + index,
        index,
        onHoverSlide,
        viewport
      })
    ) : mapType === "ChoroplethMap" ? (
      MultiChoroplethMap({
        ...layerData,
        id: mapType + index,
        index,
        onHoverSlide,
        onLayerClick,
        selectedFoundationDatum
      })
    ) : mapType === "VectorTilesMap" ||
      mapType === "vtChoroplethMap" ||
      mapType === "vtScatterPlotMap" ? (
      <VectorTilesMap
        {...layerData}
        key={layerData.vectorTilesID}
        index={index}
      />
    ) : null;
  });

  return (
    <DeckGL className="DeckGL-Map-Layer" getCursor={getCursor} {...viewport}>
      {renderMaps}
      {children}
    </DeckGL>
  );
};

MultiLayerMap.propTypes = {
  viewport: shape({}),
  mapLayers: arrayOf(shape({})).isRequired,
  onHoverSlide: func,
  onLayerClick: func,
  getCursor: func,
  children: node,
  selectedFoundationDatum: shape({})
};

MultiLayerMap.defaultProps = {
  getCursor: () => "crosshair"
};

export default MultiLayerMap;
