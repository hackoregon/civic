/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";

import EmptyBadgeSVG from "../../../../assets/badges/empty-badge.svg";
import DarkEmptyBadgeSVG from "../../../../assets/badges/empty-badge-dark.svg";
import { palette } from "../../../constants/style";

const badgeContainer = css`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: start;
`;

const badgeStyle = css`
  height: 75px;
`;

const summaryBadgeStyle = css`
  height: 110px;
`;

const titleStyle = css`
  margin: 0;
  font-family: "Akkurat", sans-serif;
  font-weight: bold;
  font-size: 2em;
  line-height: 1.3em;
  text-align: center;
  color: ${palette.darkGrey};
`;

const Badge = ({ badge, isSummary }) => {
  return (
    <div css={badgeContainer}>
      {badge.shown ? (
        <img
          src={badge.badgeSVG}
          alt={`${badge.title} badge`}
          css={isSummary ? summaryBadgeStyle : badgeStyle}
        />
      ) : (
        <img
          src={isSummary ? DarkEmptyBadgeSVG : EmptyBadgeSVG}
          alt="Badge slot"
          css={isSummary ? summaryBadgeStyle : badgeStyle}
        />
      )}
      {isSummary && <p css={titleStyle}>{badge.title}</p>}
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
  }),
  isSummary: PropTypes.bool
};

export default Badge;
