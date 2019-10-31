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

  const [mapStyle, setMapStyle] = React.useState(mapboxMap.getStyle().name);

  mapboxMap.on("styledata", () => {
    const nextStyle = mapboxMap.getStyle().name;
    const currentStyle = mapStyle;
    if (nextStyle !== currentStyle) {
      setMapStyle(mapboxMap.getStyle().name);
    }
  });

  React.useEffect(() => {
    if (!mapboxMap.getSource(vectorTilesID)) {
      mapboxMap.addSource(vectorTilesID, {
        type: "vector",
        url: vectorTilesURL
      });
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

    return () => {
      if (mapboxMap.getLayer(layerID)) {
        mapboxMap.removeLayer(layerID);
      }
      if (mapboxMap.getSource(vectorTilesID)) {
        mapboxMap.removeSource(vectorTilesID);
      }
    };
  }, [
    layerID,
    layerType,
    vectorTilesID,
    vectorTilesURL,
    sourceLayer,
    paint,
    layerPosition,
    mapboxMap,
    mapStyle
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
