/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./filterSampleCardMeta";
import sampleCardData from "./filterSampleCardData";

const sampleCardMetaK = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Transportation", "Oregon", "Infographic"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaK}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaK().tags;

export default SampleCard;
