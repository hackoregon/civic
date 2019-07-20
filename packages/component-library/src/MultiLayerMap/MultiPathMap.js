import React from "react";
import { PathLayer } from "deck.gl";
import {
  number,
  string,
  bool,
  func,
  arrayOf,
  shape,
  oneOfType
} from "prop-types";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale,
  createSizeScale
} from "./createLayers";

const MultiPathMap = props => {
  const {
    index,
    id,
    pickable = true,
    data,
    civicColor = "civicYellow",
    opacity = 0.7,
    getPath = f => f.geometry.coordinates,
    lineWidth = 25,
    rounded = false,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType = {},
    fieldName = {},
    dataRange = [],
    colorRange = []
  } = props;

  let colorScale = createColorScale(
    civicColor,
    scaleType,
    dataRange,
    colorRange
  );

  if (scaleType && scaleType.color === "equal") {
    colorScale = updateEqualScale(
      data,
      colorScale,
      civicColor,
      dataRange,
      colorRange,
      fieldName
    );
  }

  if (scaleType && scaleType.color === "quantile") {
    colorScale = updateQuantileScale(
      data,
      colorScale,
      civicColor,
      colorRange,
      fieldName
    );
  }

  const getColor = feature => {
    const { color: fieldNameColor } = fieldName;
    if (fieldName && fieldNameColor) {
      const value = feature.properties[fieldNameColor];
      return value ? colorScale(value) : [0, 0, 0, 128];
    }
    return colorScale();
  };

  const getWidth = createSizeScale(lineWidth);

  return (
    <PathLayer
      key={`path-layer${index}`}
      id={id}
      pickable={pickable}
      data={data}
      getColor={getColor}
      opacity={opacity}
      getPath={getPath}
      getWidth={getWidth}
      widthScale={1}
      widthMinPixels={1}
      rounded={rounded}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      onHover={onHoverSlide}
      onClick={onLayerClick}
      updateTriggers={{
        getColor,
        getWidth
      }}
    />
  );
};

MultiPathMap.propTypes = {
  index: number,
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPath: func,
  lineWidth: number,
  rounded: bool,
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
  dataRange: oneOfType([arrayOf(number), arrayOf(string)]),
  colorRange: arrayOf(arrayOf(number))
};

export default MultiPathMap;
