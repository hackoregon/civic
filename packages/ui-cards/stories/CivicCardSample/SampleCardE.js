/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const sampleCardMetaE = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Housing"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaE}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaE().tags;

export default SampleCard;
