/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { scaleQuantize, extent, format } from "d3";
import { css } from "emotion";
import civicFormat from "../utils/civicFormat";

const legendContainer = css(`
  border-top: 2px solid gainsboro;
  border-bottom: 2px solid gainsboro;
  margin: 2% 0 8% 2%;
  display: flex;
  flex-wrap: nowrap;
  height: 25px;
  width: 96%;
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

  const createEqualBins = (slide, color, getPropValue) => {
    const scale = scaleQuantize()
      .domain(extent(slide.slide_data.features, getPropValue))
      .range(color)
      .nice();
    return scale;
  };

  const colorScale =
    mapProps.scaleType === "ordinal" || mapProps.scaleType === "threshold"
      ? mapProps.categories
      : createEqualBins(data, mapProps.color, mapProps.getPropValue);

  const formatColor = arr =>
    arr.reduce(
      (acc, cur, i) => (i < 3 ? `${acc + cur},` : `${acc}1)`),
      "rgba("
    );

  const mapColorsArr =
    mapProps.scaleType === "ordinal" || mapProps.scaleType === "threshold"
      ? mapProps.color.map(arr => formatColor(arr))
      : colorScale.range().map(arr => formatColor(arr));

  const bins =
    mapProps.scaleType === "ordinal" || mapProps.scaleType === "threshold"
      ? colorScale
      : colorScale.range().map(d => colorScale.invertExtent(d));

  const ticks =
    mapProps.scaleType === "ordinal" || mapProps.scaleType === "threshold"
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
    mapProps.scaleType === "threshold"
      ? tickNumsThreshold
      : mapProps.scaleType === "ordinal"
      ? tickNumsOrdinal
      : tickNums;

  const legend = mapColorsArr.map((d, i) => {
    return (
      <div
        key={`legend-pt-${d.id}`}
        className={colorBox}
        style={{ backgroundColor: d }}
      >
        <div className={tickStyle}>
          <span>{ticksFormatted[i]}</span>
        </div>
      </div>
    );
  });

  return <div className={legendContainer}>{legend}</div>;
};

SandboxMapLegend.propTypes = {
  data: PropTypes.shape({}).isRequired,
  mapProps: PropTypes.shape({}).isRequired
};

export default SandboxMapLegend;
