/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../../src";
import sampleCardMeta from "./filterSampleCardMeta";
import sampleCardData from "./filterSampleCardData";

const sampleCardMetaM = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Race", "Portland"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaM}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaM().tags;

export default SampleCard;
