/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./filterSampleCardMeta";
import sampleCardData from "./filterSampleCardData";

const sampleCardMetaG = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Infographic"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaG}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaG().tags;

export default SampleCard;
