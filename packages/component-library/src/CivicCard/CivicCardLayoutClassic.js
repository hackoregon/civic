// To be moved to component library
import React from "react";
import PropTypes from "prop-types";
import CivicStoryCard from "../CivicStoryCard/CivicStoryCard";

function CivicCardLayoutClassic({ isLoading, data, card }) {
  return (
    <CivicStoryCard title={card.title} slug={card.slug}>
      <React.Fragment>
        {card.introText}
        {card.selector}
        <card.visualization isLoading={isLoading} data={data} />
      </React.Fragment>
    </CivicStoryCard>
  );
}

CivicCardLayoutClassic.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  card: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutClassic;
