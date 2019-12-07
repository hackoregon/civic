import React from "react";
import { Source, Layer } from "react-map-gl";
import { string, shape, number, arrayOf, oneOfType } from "prop-types";

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
    multipleLayers,
    filter
  } = props;

  const sourceLayerProp = {
    "source-layer": sourceLayer
  };

  const metaProps = {
    "sandbox:index": index
  };

  const greaterThan = /&gt;/;
  const lessThan = /&lt;/;

  const formatFilter = arr => {
    const [filterKey, ...rest] = arr;
    if (filterKey.search(greaterThan) > -1) {
      return [filterKey.replace(greaterThan, ">"), ...rest];
    }
    if (filterKey.search(lessThan) > -1) {
      return [filterKey.replace(lessThan, "<"), ...rest];
    }
    return arr;
  };

  const showMultiLayers =
    multipleLayers.length > 0 &&
    multipleLayers.map(layer => {
      const {
        layerPosition: multiLayerPosition,
        sourceLayer: multiSourceLayer,
        layerID: multiLayerID,
        layerType: multiLayerType,
        paint: multiPaint,
        hover = false
      } = layer;

      const multiSourceLayerProp = {
        "source-layer": multiSourceLayer
      };

      const filterProp =
        filter.length > 0 && hover ? { filter: formatFilter(filter) } : {};

      return (
        <Layer
          beforeId={multiLayerPosition}
          id={multiLayerID}
          key={multiLayerID}
          type={multiLayerType}
          source={vectorTilesID + index}
          paint={multiPaint}
          metadata={metaProps}
          {...multiSourceLayerProp}
          {...filterProp}
        />
      );
    });

  const filterProp = filter.length > 0 ? { filter: formatFilter(filter) } : {};
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
          {...filterProp}
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
  filter: arrayOf(oneOfType([string, number])),
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
  multipleLayers: [],
  filter: []
};

export default VectorTilesMap;
