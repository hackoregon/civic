/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { BrandColors } from "@hackoregon/ui-themes";
import { Logo } from "@hackoregon/ui-brand";
import { ChartTitle } from "../ChartTitle/ChartTitle";

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

export const ChartContainer = ({
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
    position: relative;
    padding-top: ${100 / aspectRatio}%;
    height: 100%;
  `;

  const skeletonStyle = css`
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    height: calc(100vw / ${aspectRatio});
    max-height: ${900 / aspectRatio}px;
    background-color: ${BrandColors.subdued.hex};
    display: grid;
    justify-items: center;
    align-items: center;
  `;

  let content = (
    <div css={skeletonStyle}>
      <Logo type="squareLogoAnimated" />
    </div>
  );

  if (!loading) {
    content = <div css={wrapperStyle}>{children}</div>;
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

ChartContainer.displayName = "ChartContainer";
