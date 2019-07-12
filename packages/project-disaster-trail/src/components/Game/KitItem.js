/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";

const ImagesContainer = css`
  position: relative;
  width: 100px;
  height: 100px;
`;

const KitItemStyle = css`
  display: block;
  width: 100px;
  height: 100px;
  position: absolute;
`;

const KitItem = ({ emptySvg, fullSvg }) => {
  const EmptyKitItem = css`
    background-image: url(${emptySvg});
    background-size: cover;
    opacity: 1;
    transition: all 1s ease;

    &:hover {
      opacity: 0;
    }
  `;

  const ColorKitItem = css`
    background-image: url(${fullSvg});
    background-size: cover;
    opacity: 0;
    transition: all 1s ease;

    &:hover {
      opacity: 1;
    }
  `;

  return (
    <div css={ImagesContainer}>
      <div
        css={css`
          ${KitItemStyle};
          ${EmptyKitItem}
        `}
      />
      <div
        css={css`
          ${KitItemStyle};
          ${ColorKitItem}
        `}
      />
    </div>
  );
};

KitItem.propTypes = {
  emptySvg: PropTypes.node,
  fullSvg: PropTypes.node
};

export default KitItem;
