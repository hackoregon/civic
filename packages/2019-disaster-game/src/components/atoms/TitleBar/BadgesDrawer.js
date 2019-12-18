/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { palette } from "../../../constants/style";
import { getBadges } from "../../../state/tasks";
import Badge from "../Badge";

const drawerContainer = css`
  width: 950px;
  background-color: ${palette.lemon};
  grid-template-columns: auto 700px;
  padding-left: 200px;
  margin-left: -130px;
  z-index: unset;
  transition: all 1s;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.15);
`;

const closedStyle = css`
  transform: translateX(-100%);
`;

const openStyle = css`
  transform: translateX(0%);
`;

const summaryStyle = css`
  top: 90px;
  right: 950px;
  position: absolute;

  z-index: 10;
  transition: all 1s;
  transform: none;

  display: grid;
  grid-template-columns: auto 630px;
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
  justify-self: end;
  height: 130px;
`;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 3.75rem;
  line-height: initial;
  color: ${palette.blue};
  margin: 0;
`;

const badgesContainer = css`
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-content: center;
`;

const BadgesDrawer = ({
  journeyBarContainerStyle,
  isOpen,
  isSummary,
  initialSummaryStyle,
  badges,
  openBadgeDrawer
}) => {
  return (
    <div
      css={css`
        ${journeyBarContainerStyle};
        ${drawerContainer};
        ${isOpen ? openStyle : closedStyle};
        ${isSummary ? summaryStyle : ""};
        ${initialSummaryStyle || ""};
      `}
    >
      <p css={headerStyle}>
        Badges
        <br />
        Earned
      </p>
      <div css={badgesContainer}>
        <Badge
          badgeInfo={badges.preparerBadge}
          openBadgeDrawer={openBadgeDrawer}
          isSummary={isSummary}
        />
        <Badge
          badgeInfo={badges.taskSurvivorBadge}
          openBadgeDrawer={openBadgeDrawer}
          isSummary={isSummary}
        />
        <Badge
          badgeInfo={badges.taskNeighborhoodHeroBadge}
          openBadgeDrawer={openBadgeDrawer}
          isSummary={isSummary}
        />
        <Badge
          badgeInfo={badges.taskCitySuperheroBadge}
          openBadgeDrawer={openBadgeDrawer}
          isSummary={isSummary}
        />
        <Badge
          badgeInfo={badges.earthquakeHeroBadge}
          openBadgeDrawer={openBadgeDrawer}
          isSummary={isSummary}
        />
      </div>
    </div>
  );
};

BadgesDrawer.propTypes = {
  journeyBarContainerStyle: PropTypes.shape({}),
  isSummary: PropTypes.bool,
  initialSummaryStyle: PropTypes.shape({}),
  badges: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  openBadgeDrawer: PropTypes.func
};

const mapStateToProps = state => ({
  badges: getBadges(state)
});

export default connect(mapStateToProps)(BadgesDrawer);
