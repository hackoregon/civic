import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Skeleton from "@material-ui/lab/Skeleton";

import ChartTitle from "../ChartTitle";

const chartError = css`
  text-align: center;
  background: #fdd;
  height: 100%;
`;

const defaultVictoryAspectRatio = 650 / 350;

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
  className,
  aspectRatio
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
  const fullHeight = css`
    padding-top: ${100 / aspectRatio}%;
  `;

  let content = <div css={wrapperStyle}>{children}</div>;

  if (loading) {
    content = <Skeleton css={[wrapperStyle, fullHeight]} />;
  } else if (error) {
    content = <div css={[wrapperStyle, fullHeight, chartError]}>{error}</div>;
  }

  return (
    <figure css={figureWrapper}>
      <ChartTitle title={title} subtitle={subtitle} />
      {content}
    </figure>
  );
};

ChartContainer.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  aspectRatio: PropTypes.number
};

ChartContainer.defaultProps = {
  aspectRatio: defaultVictoryAspectRatio
};

export default ChartContainer;
