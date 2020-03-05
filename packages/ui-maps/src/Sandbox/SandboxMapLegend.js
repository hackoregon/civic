/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { format, scaleLinear, max, range as d3Range } from "d3";
import { startCase } from "lodash";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import { civicFormat } from "..";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale,
  createRange
} from "../MultiLayerMap/createLayers";

const legendHeight = 65;
const legendContainer = css(`
  margin: 9px 5%;
  display: flex;
  align-items: baseline;
  flex-wrap: nowrap;
  height: ${legendHeight}px;
  width: 90%;
  padding-bottom: 10px;  
`);

const colorBox = css(`
  display: flex;
  position: relative;
  flex-basis: 100%;
  border: 1px solid #AAA4AB;
  justify-content: end;
  align-items: end;
`);

const tickNums = css(`
  position: absolute;
  bottom: -20px;
  right: -20px;
  font-size: 14px;
`);

const tickNumsThreshold = css(`
  position: absolute;
  bottom: -20px;
  right: -7px;
  font-size: 14px;
`);

const tickNumsOrdinal = css(`
  position: absolute;
  bottom: -20px;
  right: unset;
  left: 0;
  font-size: 14px;
`);

const tickNumsCircle = css(`
  position: absolute;
  bottom: -25px;
  left: 31px;
  font-size: 14px;
`);

const barLabelStyle = css(`
  position: absolute;
  top: -18px;
  width: 100%;
  text-align: center;
  font-size: 15px;
`);

const SandboxMapLegend = React.memo(props => {
  const { data, mapProps } = props;
  const {
    civicColor,
    scaleType = {},
    dataRange = [],
    colorRange = [],
    fieldName,
    mapType,
    layerInfo,
    legend,
    multipleLayers
  } = mapProps;
  const { color: colorScaleType } = scaleType;

  const {
    format: legendFormat,
    colorRange: legendColorRange,
    dataRange: legendDataRange = []
  } = legend;

  let choroplethColorScale = createColorScale(
    civicColor,
    scaleType,
    dataRange,
    colorRange
  );

  if (colorScaleType === "equal") {
    choroplethColorScale = updateEqualScale(
      data,
      choroplethColorScale,
      civicColor,
      dataRange,
      colorRange,
      fieldName
    );
  }

  if (colorScaleType === "quantile") {
    choroplethColorScale = updateQuantileScale(
      data,
      choroplethColorScale,
      civicColor,
      colorRange,
      fieldName
    );
  }

  const formatColor = arr =>
    arr.reduce(
      (acc, cur, i) => (i < 3 ? `${acc + cur},` : `${acc}1)`),
      "rgba("
    );

  const spColor =
    multipleLayers && multipleLayers[0]
      ? multipleLayers[0].paint["circle-color"]
      : "#000";
  const spColorRange = d3Range(5).map(() => spColor);
  const colorScaleRange =
    mapType === "vtChoroplethMap"
      ? createRange("", legendColorRange).map(c => [...c, 255])
      : mapType === "vtScatterPlotMap"
      ? createRange("", spColorRange).map(c => [...c, 255])
      : choroplethColorScale.range()[0].length === 4
      ? choroplethColorScale.range()
      : choroplethColorScale.range().map(c => [...c, 255]);

  const mapColorsArr = colorScaleRange.map(arr => formatColor(arr));

  const bins =
    colorScaleType === "ordinal" || colorScaleType === "threshold"
      ? dataRange
      : mapType === "vtChoroplethMap"
      ? legendDataRange
      : mapType === "vtScatterPlotMap"
      ? ["Less", "", "", "", "More"]
      : choroplethColorScale
          .range()
          .map(d => choroplethColorScale.invertExtent(d));

  const ticks =
    colorScaleType === "ordinal" ||
    colorScaleType === "threshold" ||
    mapType === "vtChoroplethMap" ||
    mapType === "vtScatterPlotMap"
      ? bins
      : bins.reduce((a, c) => (c[1] ? [...a, c[1]] : [...a, ""]), []);

  const percentageFormat = format(".1%");
  const sandboxPercentFormat = p =>
    p < 1 && p > 0 ? percentageFormat(p) : `${p.toFixed(1)}%`;
  const sandboxDecimalFormat = format(".2n");
  const sandboxMoneyFormat = d => `$${civicFormat.numericShort(d)}`;
  const sandboxSentenceCase = str =>
    str.length &&
    str
      .split(" ")
      .reduce(
        (full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`,
        ""
      )
      .trim();

  const formatTicks = (arr, typeFormat) => {
    const formatter =
      mapType === "vtScatterPlotMap"
        ? startCase
        : typeFormat === "percentage"
        ? sandboxPercentFormat
        : typeFormat === "dollars"
        ? sandboxMoneyFormat
        : typeFormat === "decimal"
        ? sandboxDecimalFormat
        : typeFormat === "sentenceCase"
        ? sandboxSentenceCase
        : typeFormat === "titleCase"
        ? startCase
        : civicFormat.typeFormat || civicFormat.numeric;
    return arr.map(d => formatter(d));
  };

  const oldLegendFormat =
    mapProps.tooltip &&
    mapProps.tooltip.primary &&
    mapProps.tooltip.primary.format;

  const formatType = legendFormat || oldLegendFormat;

  const ticksFormatted = formatTicks(ticks, formatType);

  const tickStyle =
    colorScaleType === "threshold"
      ? tickNumsThreshold
      : colorScaleType === "ordinal"
      ? tickNumsOrdinal
      : mapType === "vtScatterPlotMap"
      ? tickNumsCircle
      : tickNums;

  const { color: fieldNameColor } = fieldName;
  const colorCount = data.reduce((acc, d) => {
    const color = choroplethColorScale(d.properties[fieldNameColor]);
    if (acc[color]) {
      // eslint-disable-next-line no-plusplus
      acc[color]++;
    } else {
      acc[color] = {};
      acc[color] = 1;
    }
    return acc;
  }, {});

  const barScale = scaleLinear()
    .domain([0, max(Object.values(colorCount), d => d)])
    .range([0, legendHeight]);

  const barHeights = mapColorsArr.map(d => {
    const count = colorCount[d.slice(5, -3)];
    return mapType === "vtChoroplethMap"
      ? { h: 28, c: "" }
      : mapType === "vtScatterPlotMap"
      ? { h: "auto", c: "" }
      : count
      ? { h: barScale(count), c: count }
      : { h: 0, c: "0" };
  });

  const legendContents = mapColorsArr.map((d, i) => {
    const borderColor =
      mapType === "vtScatterPlotMap" ? "transparent" : "#AAA4AB";
    const bgColor = mapType === "vtScatterPlotMap" ? "transparent" : d;
    return (
      <div
        key={layerInfo.displayName + shortid.generate()}
        css={colorBox}
        style={{
          borderColor,
          backgroundColor: bgColor,
          height: `${barHeights[i].h}px`
        }}
      >
        <div css={barLabelStyle}>
          <span>{barHeights[i].c}</span>
        </div>
        <div css={tickStyle}>
          <span>{ticksFormatted[i]}</span>
        </div>
        {mapType === "vtScatterPlotMap" && (
          <div
            style={{
              margin: "auto",
              backgroundColor: d,
              borderRadius: "50%",
              height: `${i * 8 + 10}px`,
              width: `${i * 8 + 10}px`
            }}
          />
        )}
      </div>
    );
  });

  return <div css={legendContainer}>{legendContents}</div>;
});

SandboxMapLegend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  mapProps: PropTypes.shape({}).isRequired
};

SandboxMapLegend.defaultProps = {
  data: []
};

export default SandboxMapLegend;
