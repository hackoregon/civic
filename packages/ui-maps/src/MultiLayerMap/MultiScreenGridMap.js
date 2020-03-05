import React from "react";
import { ScreenGridLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";

import CIVIC_MAP_COLORS from "./mapStyles";

const MultiScreenGridMap = props => {
  const {
    id,
    data,
    pickable = true,
    civicColor = "thermal",
    opacity = 0.7,
    getPosition = f => f.geometry.coordinates,
    squareSize = 10,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    fieldName = {}
  } = props;

  const colorRange = CIVIC_MAP_COLORS[civicColor];

  const getWeight = feature => {
    const { weight: fieldNameWeight } = fieldName;
    if (fieldName && fieldNameWeight) {
      const weight = feature.properties[fieldNameWeight];
      return weight || 1;
    }
    return 1;
  };

  return (
    <ScreenGridLayer
      key={id}
      id={id}
      pickable={pickable}
      data={data}
      getPosition={getPosition}
      opacity={opacity}
      colorRange={colorRange}
      cellSizePixels={squareSize}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      gpuAggregation={false}
      updateTriggers={{ colorRange }}
      getWeight={getWeight}
    />
  );
};

MultiScreenGridMap.propTypes = {
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPosition: func,
  squareSize: number,
  autoHighlight: bool,
  highlightColor: arrayOf(number),
  fieldName: shape({
    weight: string
  })
};

export default MultiScreenGridMap;
