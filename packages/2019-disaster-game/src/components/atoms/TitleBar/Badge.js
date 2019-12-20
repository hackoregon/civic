/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";

import EmptyBadgeSVG from "../../../../assets/badges/empty-badge.svg";

const badgeContainer = css`
  display: grid;
  justify-content: center;
`;

const badgeStyle = css`
  height: 75px;
`;

const Badge = ({ badge }) => {
  return (
    <div css={badgeContainer}>
      {badge.shown ? (
        <img
          src={badge.badgeSVG}
          alt={`${badge.title} badge`}
          css={badgeStyle}
        />
      ) : (
        <img src={EmptyBadgeSVG} alt="Badge slot" css={badgeStyle} />
      )}
    </div>
  );
};

Badge.propTypes = {
  badge: PropTypes.shape({
    badgeSVG: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    shown: PropTypes.bool,
    activeTaskIndexWhenEarned: PropTypes.oneOfType([null, PropTypes.number])
  })
};

export default Badge;
