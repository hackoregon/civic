/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../..";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const sampleCardMetaD = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Housing", "Oregon"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaD}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaD().tags;

export default SampleCard;
