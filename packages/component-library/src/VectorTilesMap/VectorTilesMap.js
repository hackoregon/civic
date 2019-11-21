import React from "react";
import { Source, Layer } from "react-map-gl";
import { string, shape, number } from "prop-types";

const VectorTilesMap = React.memo(props => {
  const {
    vectorTilesID,
    vectorTilesURL,
    layerID,
    layerType,
    sourceLayer,
    paint,
    layerPosition,
    index
  } = props;

  const sourceLayerProp = {
    "source-layer": sourceLayer
  };

  return (
    <Source type="vector" id={vectorTilesID + index} url={vectorTilesURL}>
      <Layer
        beforeId={layerPosition}
        id={layerID}
        type={layerType}
        source={vectorTilesID + index}
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
  layerPosition: string,
  index: number
};

export default VectorTilesMap;
