import React from "react";
import { ScatterplotLayer } from "deck.gl";
import { number, string, bool, func, arrayOf, shape } from "prop-types";
import shortid from "shortid";
import centerOfMass from "@turf/center-of-mass";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale,
  createSizeScale
} from "./createLayers";

const MultiScatterPlotMap = props => {
  const {
    id,
    data,
    pickable = true,
    civicColor = "civicYellow",
    opacity = 0.7,
    getPosition = f => f.geometry.coordinates,
    radius = 25,
    radiusScale = 1,
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

  if (scaleType.color === "equal") {
    colorScale = updateEqualScale(
      data,
      colorScale,
      civicColor,
      dataRange,
      colorRange,
      fieldName
    );
  }

  if (scaleType.color === "quantile") {
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

  const memoizedData = React.useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    return data[0].geometry.type === "Polygon" ||
      data[0].geometry.type === "MultiPolygon"
      ? data
          .map(d =>
            centerOfMass(d.geometry, { properties: { ...d.properties } })
          )
          .filter(d => d.geometry)
      : data;
  }, [data]);

  const getRadius = createSizeScale(radius, scaleType, fieldName);

  const { area: scaleTypeArea } = scaleType;

  const circleScale = scaleTypeArea ? radiusScale : 1;

  return (
    <ScatterplotLayer
      key={shortid.generate()}
      id={id}
      pickable={pickable}
      data={memoizedData}
      getPosition={getPosition}
      opacity={opacity}
      getFillColor={getColor}
      getRadius={getRadius}
      radiusScale={circleScale}
      radiusMinPixels={1}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      onHover={onHoverSlide}
      onClick={onLayerClick}
      updateTriggers={{
        getColor,
        getRadius
      }}
      parameters={{ depthTest: false }}
    />
  );
};

MultiScatterPlotMap.propTypes = {
  id: string.isRequired,
  data: arrayOf(shape({})).isRequired,
  pickable: bool,
  civicColor: string,
  opacity: number,
  getPosition: func,
  radius: number,
  radiusScale: number,
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
  colorRange: arrayOf(arrayOf(number))
};

export default MultiScatterPlotMap;
