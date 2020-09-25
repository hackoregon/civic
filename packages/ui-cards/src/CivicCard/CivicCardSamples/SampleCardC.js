/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../..";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const sampleCardMetaC = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Housing", "Portland", "Oregon"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaC}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaC().tags;

export default SampleCard;
