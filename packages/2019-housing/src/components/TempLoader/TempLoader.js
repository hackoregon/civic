import { css, jsx } from "@emotion/core";
/** @jsx jsx */
import { BrandColors, Logo } from "@hackoregon/component-library";

const TempLoader = () => {
  const skeletonStyle = css`
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    height: 500px;
    max-height: 500px;
    background-color: ${BrandColors.subdued.hex};
    display: grid;
    justify-items: center;
    align-items: center;
  `;

  return (
    <div css={skeletonStyle}>
      <Logo type="squareLogoAnimated" />
    </div>
  );
};

export default TempLoader;
