/* eslint-disable import/prefer-default-export */
import React from "react";
import PropTypes from "prop-types";
import { CivicStoryCard } from "../CivicStoryCard/CivicStoryCard";
import cardMetaTypes from "./cardMetaTypes";

export function CivicCardLayoutClassic({ isLoading, data, cardMeta }) {
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
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

CivicCardLayoutClassic.displayName = "CivicCardLayoutClassic";
