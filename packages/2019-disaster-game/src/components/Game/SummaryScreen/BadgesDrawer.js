/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBadges } from "../../../state/tasks";
import Badge from "../../atoms/TitleBar/Badge";

const container = css`
  width: 885px;
  top: 90px;
  right: 800px;
  position: absolute;
  z-index: 10;
  transition: all 1s;
  transform: none;
  display: grid;
  grid-template-columns: auto 630px;
  padding: 0 80px;
  border-radius: 20px;
  align-content: center;
  justify-content: space-between;
  justify-self: end;
  transform: translateX(-5%);
`;

const badgesContainer = css`
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-content: center;
  grid-column-gap: 40px;
  justify-items: center;
`;

const BadgesDrawer = ({ initialSummaryStyle, badges }) => {
  return (
    <div
      css={css`
        ${container};
        ${initialSummaryStyle || ""};
      `}
    >
      <div css={badgesContainer}>
        <Badge isSummary badge={badges.preparerBadge} />
        <Badge isSummary badge={badges.taskSurvivorBadge} />
        <Badge isSummary badge={badges.taskNeighborhoodHeroBadge} />
        <Badge isSummary badge={badges.taskCitySuperheroBadge} />
        <Badge isSummary badge={badges.earthquakeHeroBadge} />
      </div>
    </div>
  );
};

BadgesDrawer.propTypes = {
  journeyBarContainerStyle: PropTypes.shape({}),
  initialSummaryStyle: PropTypes.shape({}),
  badges: PropTypes.shape({})
};

const mapStateToProps = state => ({
  badges: getBadges(state)
});

export default connect(mapStateToProps)(BadgesDrawer);
