/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { format } from "d3";
import { startCase } from "lodash";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import civicFormat from "../utils/civicFormat";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale
} from "../MultiLayerMap/createLayers";

const legendContainer = css(`
  margin: 0.5rem 5% 1rem 5%;
  display: flex;
  flex-wrap: nowrap;
  height: 25px;
  width: 90%;
`);

const colorBox = css(`
  display: flex;
  position: relative;
  flex-basis: 100%;
  border-left: 2px solid gainsboro;
  justify-content: end;
  align-items: end;
`);

const tickNums = css(`
  position: absolute;
  bottom: -20px;
  right: 0;
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

const SandboxMapLegend = props => {
  console.log("SandboxMapLegend-props:", props);
  const { data, mapProps } = props;
  const { civicColor, scaleType, dataRange, colorRange, fieldName } = mapProps;

  const { color: colorScaleType } = scaleType;

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

  const colorScaleRange =
    choroplethColorScale.range()[0].length === 4
      ? choroplethColorScale.range()
      : choroplethColorScale.range().map(c => [...c, 255]);
  // console.log("legend--colorScaleRange", mapColorsArr);

  const mapColorsArr = colorScaleRange.map(arr => formatColor(arr));
  // console.log("legend--mapColorsArr", mapColorsArr);

  const bins =
    colorScaleType === "ordinal" || colorScaleType === "threshold"
      ? dataRange
      : choroplethColorScale
          .range()
          .map(d => choroplethColorScale.invertExtent(d));

  const ticks =
    colorScaleType === "ordinal" || colorScaleType === "threshold"
      ? bins
      : bins.reduce((a, c) => (c[1] ? [...a, c[1]] : [...a, ""]), []);

  // const sandboxThousandsFormat = format(".3s");
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
      typeFormat === "numeric"
        ? civicFormat.numeric
        : typeFormat === "numericShort"
        ? civicFormat.numericShort
        : typeFormat === "decimal"
        ? sandboxDecimalFormat
        : typeFormat === "percent"
        ? sandboxPercentFormat
        : typeFormat === "dollars"
        ? sandboxMoneyFormat
        : typeFormat === "year"
        ? civicFormat.year
        : typeFormat === "monthYear"
        ? civicFormat.monthYear
        : typeFormat === "titleCase"
        ? startCase
        : typeFormat === "sentenceCase"
        ? sandboxSentenceCase
        : civicFormat.unformatted;
    return arr.map(d => formatter(d));
  };

  const formatType =
    mapProps.tooltip &&
    mapProps.tooltip.primary &&
    mapProps.tooltip.primary.format
      ? mapProps.tooltip.primary.format
      : "numeric";
  console.log("formatType:", formatType);
  const ticksFormatted = formatTicks(ticks, formatType);
  console.log("ticksFormatted:", ticksFormatted);

  const tickStyle =
    colorScaleType === "threshold"
      ? tickNumsThreshold
      : colorScaleType === "ordinal"
      ? tickNumsOrdinal
      : tickNums;

  const legend = mapColorsArr.map((d, i) => {
    return (
      <div
        key={shortid.generate()}
        css={colorBox}
        style={{ backgroundColor: d }}
      >
        <div css={tickStyle}>
          <span>{ticksFormatted[i]}</span>
        </div>
      </div>
    );
  });

  return <div css={legendContainer}>{legend}</div>;
};

SandboxMapLegend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mapProps: PropTypes.shape({}).isRequired
};

export default SandboxMapLegend;
