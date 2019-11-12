/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./filterSampleCardMeta";
import sampleCardData from "./filterSampleCardData";

const sampleCardMetaJ = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Disaster Resilience", "Portland", "Scatterplot"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaJ}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaJ().tags;

export default SampleCard;
