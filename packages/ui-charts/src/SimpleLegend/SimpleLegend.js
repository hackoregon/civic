import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { nanoid } from "nanoid";
import { VictoryTheme } from "@hackoregon/ui-themes";

const SimpleLegend = ({ colorScale, legendData, theme }) => {
  const legendStyle = css`
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0 0;

    @media (max-width: 640px) {
      text-align: left;
    }
  `;

  const colorMap = colorScale || theme.group.colorScale;

  if (legendData.length) {
    return (
      <div css={legendStyle}>
        {legendData.map((group, idx) => (
          <span
            key={nanoid()}
            css={css`
              margin-left: 10px;
            `}
          >
            <svg viewBox="0 0 10 10" width="10px">
              <circle cx="5" cy="5" r="5" fill={colorMap[idx]} />
            </svg>
            <span
              css={css`
                margin-left: 5px;
              `}
            >
              {group.name}
            </span>
          </span>
        ))}
      </div>
    );
  }
  return null;
};

SimpleLegend.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.string),
  legendData: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  theme: PropTypes.shape({})
};

SimpleLegend.defaultProps = {
  colorScale: null,
  legendData: null,
  theme: VictoryTheme
};

export default SimpleLegend;
