import React from "react";
import { Source, Layer } from "react-map-gl";
import { string, shape, number, arrayOf } from "prop-types";

const VectorTilesMap = React.memo(props => {
  const {
    vectorTilesID,
    vectorTilesURL,
    layerID,
    layerType,
    sourceLayer,
    paint,
    layerPosition,
    index,
    multipleLayers
  } = props;

  const sourceLayerProp = {
    "source-layer": sourceLayer
  };

  const metaProps = {
    "sandbox:index": index
  };

  const showMultiLayers =
    multipleLayers.length > 0 &&
    multipleLayers.map(l => {
      const multiSourceLayerProp = {
        "source-layer": l.sourceLayer
      };
      return (
        <Layer
          beforeId={layerPosition}
          id={l.layerID}
          key={l.layerID}
          type={l.layerType}
          source={vectorTilesID + index}
          paint={l.paint}
          metadata={metaProps}
          {...multiSourceLayerProp}
        />
      );
    });

  return (
    <Source type="vector" id={vectorTilesID + index} url={vectorTilesURL}>
      {showMultiLayers || (
        <Layer
          beforeId={layerPosition}
          id={layerID}
          type={layerType}
          source={vectorTilesID + index}
          paint={paint}
          {...sourceLayerProp}
          metadata={metaProps}
        />
      )}
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
  index: number,
  multipleLayers: arrayOf(
    shape({
      layerID: string,
      layerType: string,
      sourceLayer: string,
      paint: shape({})
    })
  )
};

VectorTilesMap.defaultProps = {
  multipleLayers: []
};

export default VectorTilesMap;
