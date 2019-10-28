/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { palette } from "../../constants/style";
import usePrevious from "../../state/hooks/usePrevious";

const containerStyle = css`
  position: relative;
  height: 120px;
  width: 120px;
`;

const circleStyle = css`
  height: 120px;
  width: 120px;
  border-radius: 100%;
  background-color: ${palette.gold};
  margin-right: 20px;
  transition: all 0.5s 5s;
  position: absolute;
`;

const badgeStyle = css`
  height: 130px;
  opacity: 0;
  transition: all 2s 5s;
  position: absolute;
  transform: scale(3);
  margin-left: -90px;
  margin-top: 90px;
`;

const showBadge = css`
  opacity: 1;
  transform: scale(1);
  margin-left: 0;
  margin-top: -5px;
`;

const hideCircle = css`
  opacity: 0;
`;

const Badge = ({ badgeInfo, openBadgeDrawer, isSummary }) => {
  const prevBadgeInfo = usePrevious(badgeInfo);
  const badgeAcquired = badgeInfo && badgeInfo.acquired;

  useEffect(() => {
    if (!isSummary && badgeInfo !== prevBadgeInfo) {
      openBadgeDrawer();
    }
  });

  return (
    <div css={containerStyle}>
      <div
        css={css`
          ${badgeStyle};
          ${badgeAcquired ? showBadge : ""};
        `}
      >
        {badgeAcquired && (
          <img
            src={badgeInfo.badgeSVG}
            alt="Badge"
            css={css`
              ${badgeStyle};
              ${badgeAcquired ? showBadge : ""};
            `}
          />
        )}
      </div>
      <div
        css={css`
          ${circleStyle};
          ${badgeAcquired ? hideCircle : ""};
        `}
      />
    </div>
  );
};

Badge.propTypes = {
  badgeInfo: PropTypes.shape({
    badgeSVG: PropTypes.string,
    acquired: PropTypes.bool
  }),
  openBadgeDrawer: PropTypes.func,
  isSummary: PropTypes.bool
};

export default Badge;
