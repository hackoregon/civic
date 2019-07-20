import React from "react";
import { ScreenGridLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";

import CIVIC_MAP_COLORS from "./mapStyles";

const MultiScreenGridMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    civicColor = "thermal",
    opacity = 0.7,
    getPosition = f => f.geometry.coordinates,
    squareSize = 10,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100]
  } = props;

  const colorRange = CIVIC_MAP_COLORS[civicColor];

  return (
    <ScreenGridLayer
      key={index}
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
    />
  );
};

MultiScreenGridMap.propTypes = {
  index: number,
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPosition: func,
  squareSize: number,
  autoHighlight: bool,
  highlightColor: arrayOf(number)
};

export default MultiScreenGridMap;
