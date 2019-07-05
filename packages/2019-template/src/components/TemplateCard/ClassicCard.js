import React from "react";
import PropTypes from "prop-types";
import { CivicStoryCard } from "@hackoregon/component-library";

function ClassicCard({ isLoading, templateData, templateCardFull }) {
  return (
    <CivicStoryCard title={templateCardFull.title} slug={templateCardFull.slug}>
      <React.Fragment>
        {templateCardFull.introText}
        {templateCardFull.selector}
        <templateCardFull.visualization
          isLoading={isLoading}
          templateData={templateData}
        />
      </React.Fragment>
    </CivicStoryCard>
  );
}

ClassicCard.propTypes = {
  isLoading: PropTypes.bool,
  templateData: PropTypes.arrayOf(PropTypes.object),
  templateCardFull: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default ClassicCard;
