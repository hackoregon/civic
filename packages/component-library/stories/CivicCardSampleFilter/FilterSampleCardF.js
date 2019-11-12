/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./filterSampleCardMeta";
import sampleCardData from "./filterSampleCardData";

const sampleCardMetaF = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Chart"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaF}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaF().tags;

export default SampleCard;
