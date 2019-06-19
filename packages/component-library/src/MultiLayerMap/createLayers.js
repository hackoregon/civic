/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from "react";
import {
  PathLayer,
  ScatterplotLayer,
  ScreenGridLayer,
  PolygonLayer,
  IconLayer
} from "deck.gl";
import {
  scaleQuantize,
  scaleThreshold,
  scaleOrdinal,
  scaleQuantile,
  extent
} from "d3";

import CIVIC_MAP_COLORS from "./mapStyles";

const createEqualScale = () => scaleQuantize();
const updateEqualScale = (
  featuresData,
  equalScale,
  civicColorSelection,
  equalDomain,
  equalRange,
  field
) => {
  const { color: colorFieldName } = field;

  const domain = equalDomain.length
    ? equalDomain
    : extent(featuresData, d => +d.properties[colorFieldName]);

  const colorRange = equalRange.length
    ? equalRange
    : CIVIC_MAP_COLORS[civicColorSelection]
    ? CIVIC_MAP_COLORS[civicColorSelection]
    : CIVIC_MAP_COLORS.earth;

  return equalScale
    .domain(domain)
    .range(colorRange)
    .nice();
};

const createQuantileScale = () => scaleQuantile();
const updateQuantileScale = (
  featuresData,
  quantileScale,
  civicColorSelection,
  quantileRange,
  field
) => {
  const { color: colorFieldName } = field;

  const domain = featuresData
    .map(d => +d.properties[colorFieldName])
    .reduce((a, c) => (a.indexOf(c) === -1 ? [...a, c] : a), []);

  const colorRange = quantileRange.length
    ? quantileRange
    : CIVIC_MAP_COLORS[civicColorSelection]
    ? CIVIC_MAP_COLORS[civicColorSelection]
    : CIVIC_MAP_COLORS.earth;

  return quantileScale.domain(domain).range(colorRange);
};

const createThresholdScale = (
  civicColorSelection,
  categories,
  customColors
) => {
  const colorRange = customColors.length
    ? customColors
    : CIVIC_MAP_COLORS[civicColorSelection]
    ? CIVIC_MAP_COLORS[civicColorSelection]
    : CIVIC_MAP_COLORS.purpleGreen;

  return scaleThreshold()
    .domain(categories)
    .range(colorRange);
};

const createDiscreteScale = (categories, colorRange) => {
  return scaleOrdinal()
    .domain(categories)
    .range(colorRange)
    .unknown([255, 255, 255, 128]);
};

const createColorScale = (colorSelection, scaleType, dataRange, colorRange) => {
  const { color: colorScaleType } = scaleType;
  if (scaleType && colorScaleType === "equal") {
    return createEqualScale();
  }
  if (scaleType && colorScaleType === "quantile") {
    return createQuantileScale();
  }
  if (scaleType && colorScaleType === "threshold") {
    return createThresholdScale(colorSelection, dataRange, colorRange);
  }
  if (scaleType && colorScaleType === "ordinal") {
    return createDiscreteScale(dataRange, colorRange);
  }
  return () => CIVIC_MAP_COLORS[colorSelection];
};

const createSizeScale = (width, scaleType = {}, fieldName = {}) => {
  const { area: areaScaleType } = scaleType;
  const { area: areaFieldName } = fieldName;
  if (scaleType && areaScaleType === "circle area") {
    return feature => Math.sqrt(feature.properties[areaFieldName] / Math.PI);
  }
  return () => width;
};

const makePathMap = props => {
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
    scaleType = { color: "" },
    dataRange = [],
    colorRange = [],
    fieldName
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

const makeScatterPlotMap = props => {
  const {
    index,
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
    scaleType,
    dataRange = [],
    colorRange = [],
    fieldName = {}
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

  const getRadius = createSizeScale(radius, scaleType, fieldName);

  const { area: scaleTypeArea } = scaleType;
  const circleScale = scaleTypeArea ? radiusScale : 1;

  return (
    <ScatterplotLayer
      key={`scatterplot-layer${index}`}
      id={id}
      pickable={pickable}
      data={data}
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

const makeScreenGridMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    civicColor = "thermal",
    opacity = 0.7,
    getPosition = f => f.geometry.coordinates,
    sqaureSize = 10,
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
      cellSizePixels={sqaureSize}
      autoHighlight={autoHighlight}
      highlightColor={highlightColor}
      gpuAggregation={false}
      updateTriggers={{ colorRange }}
    />
  );
};

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

const makeIconMap = props => {
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

const makeSmallPolygonMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    opacity = 0.7,
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    civicColor = "civicBlue",
    stroked = true,
    polygonWidth = 5,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType,
    dataRange,
    colorRange,
    fieldName
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

const makeChoroplethMap = props => {
  const {
    index,
    id,
    data,
    pickable = true,
    opacity = 0.7,
    getPolygon = f => f.geometry.coordinates,
    filled = true,
    civicColor = "thermal",
    stroked = true,
    polygonLineColor = [169, 169, 169],
    polygonWidth = 1,
    autoHighlight = true,
    highlightColor = [255, 255, 0, 100],
    onHoverSlide,
    onLayerClick,
    scaleType = { color: "equal" },
    dataRange = [],
    colorRange = [],
    fieldName
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

const createMapLayers = {
  makePathMap,
  makeScatterPlotMap,
  makeScreenGridMap,
  makeIconMap,
  makeSmallPolygonMap,
  makeChoroplethMap
};

export default createMapLayers;
