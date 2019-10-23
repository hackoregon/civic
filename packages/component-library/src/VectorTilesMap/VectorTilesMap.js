import React from "react";
import { string, shape } from "prop-types";

const VectorTilesMap = props => {
  const {
    mapboxMap,
    vectorTilesID,
    vectorTilesURL,
    layerID,
    layerType,
    sourceLayer,
    paint,
    layerPosition
  } = props;

  React.useEffect(() => {
    if (mapboxMap.getSource(vectorTilesID)) {
      mapboxMap.removeLayer(layerID);

      mapboxMap.removeSource(vectorTilesID);

      mapboxMap.addSource(vectorTilesID, {
        type: "vector",
        url: vectorTilesURL
      });
    }

    if (!mapboxMap.getSource(vectorTilesID)) {
      mapboxMap.addSource(vectorTilesID, {
        type: "vector",
        url: vectorTilesURL
      });
    }
  }, [layerID, mapboxMap, vectorTilesID, vectorTilesURL]);

  React.useEffect(() => {
    if (mapboxMap.getLayer(layerID)) {
      mapboxMap.removeLayer(layerID);

      mapboxMap.addLayer(
        {
          id: layerID,
          type: layerType,
          source: vectorTilesID,
          "source-layer": sourceLayer,
          paint
        },
        layerPosition
      );
    }

    if (!mapboxMap.getLayer(layerID)) {
      mapboxMap.addLayer(
        {
          id: layerID,
          type: layerType,
          source: vectorTilesID,
          "source-layer": sourceLayer,
          paint
        },
        layerPosition
      );
    }
  }, [
    layerID,
    layerType,
    vectorTilesID,
    sourceLayer,
    paint,
    layerPosition,
    mapboxMap
  ]);

  return null;
};

VectorTilesMap.propTypes = {
  vectorTilesURL: string,
  vectorTilesID: string,
  layerID: string,
  layerType: string,
  sourceLayer: string,
  paint: shape({}),
  layerPosition: string
};

export default VectorTilesMap;
