/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Palette from "../../../constants/style";
import Badge from "./Badge";
import { getBadges, getSavedMetrics } from "../../../state/tasks";

const containerStyle = css`
  position: relative;
  display: inline-grid;
  justify-content: end;
  padding-top: 20px;
`;

const statsContainer = css`
  text-align: center;

  > p {
    display: inline-block;
    color: ${Palette.lightGrey};
    font-family: "Luckiest Guy", sans-serif;
  }
`;

const leftStatGroup = css`
  margin-right: 20px;
  display: inline-block;

  > p {
    display: inline-block;
    color: ${Palette.lightGrey};
    font-family: "Luckiest Guy", sans-serif;
  }
`;

const statText = css`
  font-size: 50px;
  margin: 0 10px 0 0;
`;

const statNumber = css`
  font-size: 65px;
  margin: 0;
`;

const badgesContainer = css`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  max-width: 390px;
`;

const PlayerStats = ({ badges, savedMetrics }) => {
  return (
    <div css={containerStyle}>
      <div css={statsContainer}>
        <div css={leftStatGroup}>
          <p css={statText}>PEOPLE</p>
          <p css={statNumber}>{savedMetrics.people}</p>
        </div>
        <p css={statText}>PETS</p>
        <p css={statNumber}>{savedMetrics.pets}</p>
      </div>
      <div css={badgesContainer}>
        <Badge badge={badges.preparerBadge} />
        <Badge badge={badges.taskSurvivorBadge} />
        <Badge badge={badges.taskNeighborhoodHeroBadge} />
        <Badge badge={badges.taskCitySuperheroBadge} />
        <Badge badge={badges.earthquakeHeroBadge} />
      </div>
    </div>
  );
};

PlayerStats.propTypes = {
  badges: PropTypes.shape({
    preparerBadge: PropTypes.shape({}),
    taskSurvivorBadge: PropTypes.shape({}),
    taskNeighborhoodHeroBadge: PropTypes.shape({}),
    taskCitySuperheroBadge: PropTypes.shape({}),
    earthquakeHeroBadge: PropTypes.shape({})
  }),
  savedMetrics: PropTypes.shape({
    people: PropTypes.number,
    pets: PropTypes.number
  })
};

const mapStateToProps = state => ({
  badges: getBadges(state),
  savedMetrics: getSavedMetrics(state)
});

export default connect(mapStateToProps)(PlayerStats);
