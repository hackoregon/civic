import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

/**
 * Simple Map Legend for use with d3 color scales
 * (If a color scale using scaleQuantize() is passed in, the legend will be a range)
 * @method filterNode
 * @param  {Function}       colorScale Currently works for scaleOrdinal() & scaleQuantize()
 * @param  {Function}       formatValues Formatting function for value labels
 * @param  {String}         label Label for the MapLegend
 * @param  {Boolean}        vertical Determines if legend is vertical or horizontal
 */
const MapLegend = props => {
  const { colorScale, formatValues, label, vertical } = props;

  const verticalContainer = css`
    display: block;
  `;
  const horizontalContainer = css`
    display: flex;
  `;
  const labelContainer = css`
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  `;

  const formatColor = colorArray => {
    const rgba = colorArray.length === 3 ? [...colorArray, 1] : colorArray;
    return rgba.reduce(
      (acc, cur, i) => (i < 3 ? `${acc + cur},` : `${acc}1)`),
      "rgba("
    );
  };

  let colors = colorScale.range().map(color => formatColor(color));
  let bins = colorScale.domain().map(arr => formatValues(arr));

  if (vertical) {
    // Swap the order for vertical colors so that higher values are on top
    colors = colors.reverse();
    bins = bins.reverse();
  }

  const getBinLabel = i => {
    if (bins[i] === null) return "No data available";
    // Add manual label option
    return bins[i];
  };
  const getRangeLabel = i => {
    if (i === 0) return bins[0];
    if (i === colors.length - 1) return bins[1];
    return null;
  };

  const rangeOnly = bins.length === 2;

  const horizontalRangeBin = (color, i) => {
    const partialBorder = i < colors.length - 1;
    return (
      <div
        key={color}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {i === 0 && ( // Beginning of range label
          <span
            css={css`
              font-family: "Roboto Condensed", "Helvetica Neue", Helvetica,
                sans-serif;
              font-size: 14px;
              white-space: nowrap;
              margin-right: 5px;
            `}
          >
            {getBinLabel(0)}
          </span>
        )}
        <div
          css={css`
            background-color: ${color};
            border: 1px solid gray;
            border-right: ${partialBorder ? "none" : "1px solid gray"};
            width: 20px;
            height: 20px;
          `}
        />
        {i === colors.length - 1 && ( // End of range label
          <span
            css={css`
              font-family: "Roboto Condensed", "Helvetica Neue", Helvetica,
                sans-serif;
              font-size: 14px;
              white-space: nowrap;
              margin-left: 5px;
            `}
          >
            {getBinLabel(1)}
          </span>
        )}
      </div>
    );
  };

  const colorBin = (color, i) => {
    if (rangeOnly && !vertical) return horizontalRangeBin(color, i);
    const partialBorder = vertical && i < colors.length - 1;
    return (
      <div
        key={color}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            background-color: ${color};
            border: 1px solid gray;
            border-bottom: ${partialBorder ? "none" : "1px solid gray"};
            width: 15px;
            height: 20px;
          `}
        />
        <span
          css={css`
            font-family: "Roboto Condensed", "Helvetica Neue", Helvetica,
              sans-serif;
            font-size: 14px;
            white-space: nowrap;
            margin: 0 5px;
          `}
        >
          {rangeOnly ? getRangeLabel(i) : getBinLabel(i)}
        </span>
      </div>
    );
  };

  return (
    <div
      css={css`
        width: fit-content;
        text-align: ${vertical ? "left" : "center"};
      `}
    >
      <div css={labelContainer}>{label}</div>
      <div css={vertical ? verticalContainer : horizontalContainer}>
        {colors.map((color, i) => colorBin(color, i))}
      </div>
    </div>
  );
};

MapLegend.propTypes = {
  colorScale: PropTypes.func.isRequired,
  formatValues: PropTypes.func,
  label: PropTypes.string,
  vertical: PropTypes.bool
};

MapLegend.defaultProps = {
  formatValues: value => value,
  label: "",
  vertical: true
};

export default MapLegend;
