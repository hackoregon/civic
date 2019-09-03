/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import { format } from "d3";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import civicFormat from "../utils/civicFormat";
import {
  createColorScale,
  updateQuantileScale,
  updateEqualScale,
  createRange
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
  const { data, mapProps } = props;
  const { civicColor, scaleType, dataRange, colorRange, fieldName } = mapProps;
  
  const { color: colorScaleType} = scaleType;

  // const createEqualBins = (slide, color, getPropValue) => {
  //   const scale = scaleQuantize()
  //     .domain(extent(slide.features, getPropValue))
  //     .range(color)
  //     .nice();
  //   return scale;
  // };

  // const colorScale =
  //   colorScaleType === "ordinal" || colorScaleType === "threshold"
  //     ? colorRange
  //     : createEqualBins(data, mapProps.color, mapProps.getPropValue);

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
  
  /* global console */
  // console.log("legend-choroplethColorScale", choroplethColorScale);
  console.log("legend-choroplethColorScale-domain", choroplethColorScale.domain());
  console.log("legend-choroplethColorScale-range", choroplethColorScale.range());

  const formatColor = arr =>
    arr.reduce(
      (acc, cur, i) => (i < 3 ? `${acc + cur},` : `${acc}1)`),
      "rgba("
    );

  const colorScaleRange = choroplethColorScale.range()[0].length === 4
    ? choroplethColorScale.range()
    : choroplethColorScale.range().map(c => [...c, 255]);
  console.log("legend--colorScaleRange", mapColorsArr);

  const mapColorsArr = colorScaleRange.map(arr => formatColor(arr));
  console.log("legend--mapColorsArr", mapColorsArr);

  const bins =
    colorScaleType === "ordinal" || colorScaleType === "threshold"
      ? dataRange
      : choroplethColorScale.range().map(d => choroplethColorScale.invertExtent(d));

  const ticks =
    colorScaleType === "ordinal" || colorScaleType === "threshold"
      ? bins
      : bins.reduce((a, c) => (c[1] ? [...a, c[1]] : [...a, ""]), []);

  const thousandsFormat = format(".3s");
  const percentFormat = format(".1%");

  const ticksFormatted = ticks.map(d => {
    return d === ""
      ? ""
      : d >= 1000000 || d <= -1000000
      ? civicFormat.numeric(d)
      : d >= 1000 || d <= -1000
      ? thousandsFormat(d)
      : d > 1 || d < -1
      ? civicFormat.numeric(d)
      : d === 0
      ? "0  "
      : d <= 1 && d >= -1
      ? percentFormat(d)
      : d && typeof d === "string"
      ? d
      : civicFormat.numeric(d);
  });

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
  data: PropTypes.shape({}).isRequired,
  mapProps: PropTypes.shape({}).isRequired
};

export default SandboxMapLegend;
