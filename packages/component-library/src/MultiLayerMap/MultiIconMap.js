/* eslint-disable no-nested-ternary */
import React from "react";
import { IconLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";

import { createColorScale, createSizeScale } from "./createLayers";

const getIconSizeScale = zoom => {
  return zoom > 11.5
    ? 6
    : zoom > 10.5
    ? 5
    : zoom > 9.5
    ? 4
    : zoom > 8.5
    ? 3
    : zoom > 7.5
    ? 2
    : 1;
};

const MultiIconMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    opacity = 0.7,
    getPosition = f => f.geometry.coordinates,
    iconAtlas,
    iconMapping,
    getSizeScale = getIconSizeScale,
    getIcon = f => f.properties.type,
    iconSize = 10,
    autoHighlight = true,
    highlightColor = [0, 0, 128, 128],
    onHoverSlide,
    onLayerClick,
    viewport,
    civicColor = "civicYellow",
    scaleType,
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

  const getColor = feature => {
    const { color: fieldNameColor } = fieldName;
    if (fieldName && fieldNameColor) {
      const value = feature.properties[fieldNameColor];
      return value ? colorScale(value) : [0, 0, 0, 128];
    }
    return colorScale();
  };

  const getSize = createSizeScale(iconSize, scaleType, fieldName);

  const { zoom } = viewport;

  const sizeScale = getSizeScale(zoom);

  return (
    <IconLayer
      key={index}
      id={id}
      data={data}
      pickable={pickable}
      opacity={opacity}
      getPosition={getPosition}
      iconAtlas={iconAtlas}
      iconMapping={iconMapping}
      sizeScale={sizeScale}
      getIcon={getIcon}
      getSize={getSize}
      getColor={getColor}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      onHover={onHoverSlide}
      onClick={onLayerClick}
    />
  );
};

MultiIconMap.propTypes = {
  index: number,
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPosition: func,
  iconAtlas: string,
  iconMapping: shape({
    x: number,
    y: number,
    width: number,
    height: number,
    mask: bool
  }),
  getSizeScale: func,
  getIcon: func,
  iconSize: number,
  autoHighlight: bool,
  highlightColor: arrayOf(number),
  onHoverSlide: func,
  onLayerClick: func,
  scaleType: shape({
    area: string,
    color: string
  }),
  fieldName: shape({
    area: string,
    color: string
  }),
  dataRange: arrayOf(string),
  colorRange: arrayOf(arrayOf(number)),
  viewport: shape({})
};

export default MultiIconMap;
