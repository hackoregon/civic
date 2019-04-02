import React from 'react';
import * as d3 from 'd3';
import { css } from 'emotion';
import { numeric } from '../utils/formatters';

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
  font-size: small;
`);

const tickNumsThreshold = css(`
  position: absolute;
  bottom: -20px;
  right: -7px;
  font-size: small;
`);

const SandboxMapLegend = (props) => {
  const {
    data,
    mapProps
  } = props;

  const createEqualBins = (data, color, getPropValue) => {
    const scale = d3.scaleQuantize()
      .domain(d3.extent(data.slide_data.features, getPropValue))
      .range(color)
      .nice();
    return scale;
  };

  const colorScale = mapProps.scaleType === 'ordinal' || mapProps.scaleType === 'threshold'
    ? mapProps.categories
    : createEqualBins(data, mapProps.color, mapProps.getPropValue);

  const formatColor = arr => arr.reduce((acc,cur,i) => i < 3 ? acc + cur +',' : acc +'1)', 'rgba(');

  const mapColorsArr = mapProps.scaleType === 'ordinal' || mapProps.scaleType === 'threshold'
    ? mapProps.color.map(arr => formatColor(arr))
    : colorScale.range().map(arr => formatColor(arr));

  const bins = mapProps.scaleType === 'ordinal' || mapProps.scaleType === 'threshold'
    ? colorScale
    : colorScale.range().map(d => colorScale.invertExtent(d));

  const ticks = mapProps.scaleType === 'ordinal' || mapProps.scaleType === 'threshold'
    ? bins
    : bins.reduce((a, c, i, arr) => c[1] ? [...a, c[1]] : [...a, ''], []);

  const thousandsFormat = d3.format('.3s');
  const percentFormat = d3.format('.1%');

  const ticksFormatted = ticks.map(d => {
    return d === ''
      ? ''
      : d >= 1000000 || d <= -1000000
      ? numeric(d)
      : d >= 1000 || d <= -1000
      ? thousandsFormat(d)
      : d > 1 || d < -1
      ? numeric(d)
      : d === 0
      ? '0  '
      : d <= 1 && d >= -1
      ? percentFormat(d)
      : d && typeof d === 'string'
      ? d
      : numeric(d);
  });

  const tickStyle = mapProps.scaleType === 'threshold' ? tickNumsThreshold : tickNums;
  const legend = mapColorsArr.map((d, i) => {
    return (
      <div
        key={'legend-pt-' + i}
        className={colorBox}
        style={{ backgroundColor: d }}
      >
        <div className={tickStyle}>
          <span>{ticksFormatted[i]}</span>
        </div>
      </div>
    );
  });

  return (
    <div className={legendContainer}>
      { legend }
    </div>
  );
};

export default SandboxMapLegend;
