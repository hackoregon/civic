import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import ChartTitle from "../ChartTitle";

const chartLoading = css`
  text-align: center;
  background: #eee;
  height: 100%;
`;

const chartError = css`
  text-align: center;
  background: #fdd;
  height: 100%;
`;

/**
  ChartContainer renders titles, subtitles, and provides some default styling for charts.
  It is designed to render a VictoryChart as children.

  Eventually you'll be able to pass it legends and tooltips to render as well.
*/

const ChartContainer = ({
  title,
  error,
  loading,
  subtitle,
  children,
  className
}) => {
  const figureWrapper = css`
    margin: 0;
  `;
  const wrapperStyle = css`
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
    ${className};
  `;

  let content = (
    <figure css={figureWrapper}>
      <ChartTitle title={title} subtitle={subtitle} />
      <div css={wrapperStyle}>{children}</div>
    </figure>
  );

  if (loading) {
    content = <div css={chartLoading}>Loading...</div>;
  } else if (error) {
    content = <div css={chartError}>{error}</div>;
  }

  return content;
};

ChartContainer.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

ChartContainer.defaultProps = {};

export default ChartContainer;
