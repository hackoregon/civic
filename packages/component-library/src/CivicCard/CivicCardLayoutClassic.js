import React from "react";
import PropTypes from "prop-types";
import CivicStoryCard from "../CivicStoryCard/CivicStoryCard";

function CivicCardLayoutClassic({ isLoading, data, cardMeta }) {
  return (
    <CivicStoryCard title={cardMeta.title} slug={cardMeta.slug}>
      <React.Fragment>
        {cardMeta.introText}
        {cardMeta.selector}
        <cardMeta.visualization isLoading={isLoading} data={data} />
      </React.Fragment>
    </CivicStoryCard>
  );
}

CivicCardLayoutClassic.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  cardMeta: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutClassic;
