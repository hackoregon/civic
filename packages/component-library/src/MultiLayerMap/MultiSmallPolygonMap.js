import React from "react";
import { GeoJsonLayer } from "deck.gl";
import shortid from "shortid";
import { number, string, bool, func, arrayOf, shape } from "prop-types";

import { createColorScale, createSizeScale } from "./createLayers";
import { scaleThreshold } from "d3";

const getLineWidthScale = scaleThreshold()
  .domain([7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5, 14])
  .range([24, 18, 12, 6.75, 5.75, 4.75, 3.75, 2.75, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25]);


const MultiSmallPolygonMap = props => {
  const {
    id,
    data,
    pickable = true,
    civicColor = "civicBlue",
    opacity = 0.7,
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    stroked = true,
    lineWidth = 5,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType = {},
    fieldName = {},
    dataRange,
    colorRange,
    index,
    viewport
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

  const { zoom } = viewport;
  const sizeScale = getLineWidthScale(zoom);

  const getLineWidth = createSizeScale(lineWidth);

  return (
    <GeoJsonLayer
      key={shortid.generate()}
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
      lineWidthScale={sizeScale}
      onHover={info => onHoverSlide(info, index)}
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
