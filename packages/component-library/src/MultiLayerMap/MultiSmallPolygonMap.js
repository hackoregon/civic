import React from "react";
import { PolygonLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";

import { createColorScale, createSizeScale } from "./createLayers";

const MultiSmallPolygonMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    civicColor = "civicBlue",
    opacity = 0.7,
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    stroked = true,
    polygonWidth = 5,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType = {},
    fieldName = {},
    dataRange,
    colorRange
  } = props;

  const colorScale = createColorScale(
    civicColor,
    scaleType,
    dataRange,
    colorRange
  );

  const getFillColor = feature => {
    const { color: fieldNameColor } = fieldName;
    if (fieldName && fieldNameColor) {
      const value = feature.properties[fieldNameColor];
      return value ? colorScale(value) : [0, 0, 0, 128];
    }
    return colorScale();
  };

  const getLineWidth = createSizeScale(polygonWidth);

  return (
    <PolygonLayer
      key={index}
      id={id}
      data={data}
      pickable={pickable}
      opacity={opacity}
      getPolygon={getPolygon}
      filled={filled}
      getFillColor={getFillColor}
      stroked={stroked}
      getLineColor={getFillColor}
      getLineWidth={getLineWidth}
      lineWidthMinPixels={1}
      onHover={onHoverSlide}
      onClick={onLayerClick}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      parameters={{ depthTest: false }}
      updateTriggers={{
        getFillColor,
        getLineColor: getFillColor
      }}
    />
  );
};

MultiSmallPolygonMap.propTypes = {
  index: number,
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPolygon: func,
  filled: bool,
  stroked: bool,
  polygonWidth: number,
  autoHighlight: bool,
  highlightColor: arrayOf(number),
  onHoverSlide: func,
  onLayerClick: func,
  scaleType: shape({
    color: string
  }),
  fieldName: shape({
    color: string
  }),
  dataRange: arrayOf(string),
  colorRange: arrayOf(arrayOf(number))
};

export default MultiSmallPolygonMap;
