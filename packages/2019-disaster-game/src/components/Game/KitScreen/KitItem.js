/** @jsx jsx */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { getPlayerKit } from "../../../state/kit";
// import { food, water, firstAidKit } from "../../../constants/items";
import Gauge from "./Gauge";

const ImagesContainer = css`
  position: relative;
  width: 350px;
  height: 350px;
`;

const KitItemStyle = css`
  display: block;
  width: 300px;
  height: 300px;
  position: absolute;
`;

const absoluteStyle = css`
  display: block;
  width: 250px;
  height: 250px;
  position: absolute;
  transition: transform 1s;
  right: 75px;
  top: 15px;
`;

const scaleUpStyle = css`
  left: 25px;
  top: 25px;
  right: 0;
  transform: scale(1.4);
`;

// const matchLockItems = [food, water, firstAidKit];

const KitItem = ({ emptySvg, fullSvg, playerKit, itemType }) => {
  // const isMatchLockItem = matchLockItems.indexOf(itemType) > -1;
  const [filledItem, setFilledItem] = useState(false);
  const [animateGauge, setAnimateGauge] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [halfFill, setHalfFill] = useState(isMatchLockItem);

  useEffect(() => {
    if (playerKit[itemType] && !filledItem) {
      // if (isMatchLockItem) {
      // setAnimateGauge(true);
      // } else {
      setFilledItem(true);
      setAnimateGauge(true);
      // }
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
    <div css={ImagesContainer} className="kit-item">
      <div
        css={css`
          ${absoluteStyle}
          ${animateGauge && scaleUpStyle}
        `}
      >
        <Gauge
          duration={2}
          repeat={false}
          makeAnimate={animateGauge}
          halfFill={false}
        />
      </div>
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
