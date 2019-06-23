import React from "react";
import { PolygonLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale,
  createSizeScale
} from "./createLayers";

const MultiChoroplethMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    opacity = 0.7,
    civicColor = "thermal",
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    stroked = true,
    polygonWidth = 1,
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
    colorRange = []
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
    const value = feature.properties[fieldNameColor];
    return value ? choroplethColorScale(value) : [0, 0, 0, 128];
  };

  const getLineColor = () => {
    return polygonLineColor;
  };

  const getLineWidth = createSizeScale(polygonWidth);

  return (
    <PolygonLayer
      key={index}
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
      onHover={onHoverSlide}
      onClick={onLayerClick}
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
  colorRange: arrayOf(arrayOf(number))
};

export default MultiChoroplethMap;
