import React from "react";
import { GeoJsonLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale
} from "./createLayers";

const MultiChoroplethMap = props => {
  const {
    id,
    data,
    pickable = true,
    opacity = 0.7,
    civicColor = "thermal",
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    stroked = true,
    lineWidth = 1,
    polygonLineColor = [169, 169, 169],
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType = {
      color: "equal"
    },
    fieldName,
    dataRange = [],
    colorRange = [],
    index,
    selectedFoundationDatum
  } = props;

  let choroplethColorScale = createColorScale(
    civicColor,
    scaleType,
    dataRange,
    colorRange
  );

  if (scaleType.color === "equal") {
    choroplethColorScale = updateEqualScale(
      data,
      choroplethColorScale,
      civicColor,
      dataRange,
      colorRange,
      fieldName
    );
  }

  if (scaleType.color === "quantile") {
    choroplethColorScale = updateQuantileScale(
      data,
      choroplethColorScale,
      civicColor,
      colorRange,
      fieldName
    );
  }

  const getFillColor = feature => {
    const { color: fieldNameColor } = fieldName;
    const value = feature.properties[`${fieldNameColor}`];
    return value ? choroplethColorScale(value) : [0, 0, 0, 128];
  };

  const getLineColor = f => {
    if (
      selectedFoundationDatum &&
      selectedFoundationDatum.feature &&
      selectedFoundationDatum.feature.object
    ) {
      const selectedId = selectedFoundationDatum.feature.object.id;
      const featureId = f.id;
      return featureId === selectedId ? [255, 178, 31, 255] : polygonLineColor;
    }
    return polygonLineColor;
  };

  const getLineWidth = f => {
    if (
      selectedFoundationDatum &&
      selectedFoundationDatum.feature &&
      selectedFoundationDatum.feature.object
    ) {
      const selectedId = selectedFoundationDatum.feature.object.id;
      const featureId = f.id;
      return featureId === selectedId ? 125 : lineWidth;
    }
    return lineWidth;
  };

  return (
    <GeoJsonLayer
      key={id}
      id={id}
      pickable={pickable}
      data={data}
      opacity={opacity}
      getPolygon={getPolygon}
      filled={filled}
      getFillColor={getFillColor}
      stroked={stroked}
      getLineColor={getLineColor}
      getLineWidth={getLineWidth}
      lineWidthMinPixels={1}
      lineWidthScale={1}
      lineJointRounded={false}
      extruded={false}
      onHover={info => onHoverSlide(info, index)}
      onClick={info => onLayerClick(info, index)}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      parameters={{ depthTest: false }}
      updateTriggers={{
        getFillColor,
        getLineColor,
        getLineWidth
      }}
    />
  );
};

MultiChoroplethMap.propTypes = {
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPolygon: func,
  filled: bool,
  stroked: bool,
  lineWidth: number,
  polygonLineColor: arrayOf(number),
  autoHighlight: bool,
  highlightColor: arrayOf(number),
  onHoverSlide: func,
  onLayerClick: func,
  scaleType: shape({
    color: string
  }),
  fieldName: shape({
    color: string
  }).isRequired,
  dataRange: arrayOf(string),
  colorRange: arrayOf(arrayOf(number)),
  index: number,
  selectedFoundationDatum: shape({})
};

export default MultiChoroplethMap;
