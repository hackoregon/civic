import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { GradientScale } from "@hackoregon/component-library";

const emphasis = css`
  color: #000;
`;

const gradientLabel = css`
  ${emphasis};
  position: relative;
  bottom: -10px;
`;

const rightAlign = css`
  display: flex;
  justify-content: flex-end;
`;

const noTransform = x => x;

const IntensityDisplay = ({
  mean,
  min,
  max,
  metric,
  label,
  scale,
  transform,
  domain
}) => (
  <div>
    <h3>
      <strong>
        {transform(min) === transform(max)
          ? `${metric}: `
          : `Range of ${metric}: `}
      </strong>
      {transform(min) === transform(max)
        ? scale[transform(mean)].name
        : `${scale[transform(min)].name} - ${scale[transform(max)].name}`}
    </h3>
    <div css={rightAlign}>
      <strong css={gradientLabel}>{label}</strong>
    </div>
    <GradientScale
      domain={domain}
      primary={mean}
      secondary={[min, max]}
      height={50}
    />
    {transform(min) !== transform(mean) && (
      <p>
        <strong>Best case: </strong>
        {scale[transform(min)].description}
      </p>
    )}
    <p css={emphasis}>
      <strong>Most likely case: </strong>
      {scale[transform(min)].description}
    </p>
    {transform(max) !== transform(mean) && (
      <p>
        <strong>Worst case: </strong>
        {scale[transform(max)].description}
      </p>
    )}
  </div>
);

IntensityDisplay.propTypes = {
  mean: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  metric: PropTypes.string,
  label: PropTypes.string,
  scale: PropTypes.shape({}),
  transform: PropTypes.func,
  domain: PropTypes.arrayOf(PropTypes.number)
};

IntensityDisplay.defaultProps = {
  transform: noTransform
};

export default IntensityDisplay;
