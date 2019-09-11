/** @jsx jsx */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { getPlayerKit } from "../../../state/kit";

const ImagesContainer = css`
  position: relative;
  width: 300px;
  height: 300px;
`;

const KitItemStyle = css`
  display: block;
  width: 300px;
  height: 300px;
  position: absolute;
`;

const KitItem = ({ emptySvg, fullSvg, playerKit, itemType }) => {
  const [filledItem, setFilledItem] = useState(false);

  useEffect(() => {
    if (playerKit[itemType] && !filledItem) {
      setFilledItem(true);
    }
  }, [playerKit, itemType, filledItem]);

  const EmptyKitItem = css`
    background-image: url(${emptySvg});
    background-size: cover;
    opacity: 1;
    transition: all 1s ease;

    &.filled-item {
      opacity: 0;
    }
  `;

  const ColorKitItem = css`
    background-image: url(${fullSvg});
    background-size: cover;
    opacity: 0;
    transition: all 1s ease;

    &.filled-item {
      opacity: 1;
    }
  `;

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div css={ImagesContainer}>
      <div
        css={css`
          ${KitItemStyle};
          ${EmptyKitItem}
        `}
        className={filledItem ? "filled-item" : ""}
      />
      <div
        css={css`
          ${KitItemStyle};
          ${ColorKitItem}
        `}
        className={filledItem ? "filled-item" : ""}
      />
    </div>
  );
  /* eslint-enable jsx-a11y/click-events-have-key-events */
  /* eslint-enable jsx-a11y/no-static-element-interactions */
};

KitItem.propTypes = {
  emptySvg: PropTypes.node,
  fullSvg: PropTypes.node,
  playerKit: PropTypes.shape({}),
  itemType: PropTypes.string
};

const mapStateToProps = state => ({
  playerKit: getPlayerKit(state)
});

export default connect(mapStateToProps)(KitItem);
