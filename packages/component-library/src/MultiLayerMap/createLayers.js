/* eslint-disable no-nested-ternary */
import {
  scaleQuantize,
  scaleThreshold,
  scaleOrdinal,
  scaleQuantile,
  extent
} from "d3";

import CIVIC_MAP_COLORS from "./mapStyles";

const createEqualScale = () => scaleQuantize();

export const updateEqualScale = (
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

export const updateQuantileScale = (
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

export const createColorScale = (
  colorSelection,
  scaleType = {},
  dataRange,
  colorRange
) => {
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

export const createSizeScale = (width, scaleType = {}, fieldName = {}) => {
  const { area: areaScaleType } = scaleType;
  const { area: areaFieldName } = fieldName;

  if (scaleType && areaScaleType === "circle area") {
    return feature => Math.sqrt(feature.properties[areaFieldName] / Math.PI);
  }
  return () => width;
};
