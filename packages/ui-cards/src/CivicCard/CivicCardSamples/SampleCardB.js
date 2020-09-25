/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../..";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const sampleCardMetaB = data => {
  return {
    ...sampleCardMeta(data),
    tags: ["Housing", "Gentrification", "Portland", "Oregon", "Rail"]
  };
};

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMetaB}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMetaB().tags;

export default SampleCard;
