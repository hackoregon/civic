import React from "react";
import { Source, Layer } from "react-map-gl";
import { string, shape } from "prop-types";

const VectorTilesMap = React.memo(props => {
  const {
    vectorTilesID,
    vectorTilesURL,
    layerID,
    layerType,
    sourceLayer,
    paint,
    layerPosition
  } = props;

  const sourceLayerProp = {
    "source-layer": sourceLayer
  };

  return (
    <Source
      type="vector"
      id={vectorTilesID}
      url={vectorTilesURL}
      key={vectorTilesID}
    >
      <Layer
        beforeId={layerPosition}
        id={layerID}
        type={layerType}
        source={vectorTilesID}
        paint={paint}
        {...sourceLayerProp}
      />
    </Source>
  );
});

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
