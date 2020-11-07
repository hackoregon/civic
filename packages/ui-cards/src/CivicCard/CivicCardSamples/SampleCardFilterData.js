/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../..";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const tagsList = [
  ["Race", "Transportation", "Portland", "Oregon", "Chart", "Infographic"],
  ["Race"],
  ["Transportation"],
  ["Portland"],
  ["Oregon"],
  ["Chart"],
  ["Infographic"],
  ["Race", "Nationwide", "Scatterplot"],
  ["Disaster Resilience", "Portland", "Scatterplot"],
  ["Transportation", "Oregon", "Infographic"],
  ["Race", "Portland", "Chart"],
  ["Race", "Portland"],
  ["Transportation", "Portland"]
];

const sampleFilterCardsWithTags = tagsList.map(tags => {
  const sampleCardMetaWithTags = data => {
    return {
      ...sampleCardMeta(data),
      tags
    };
  };

  const SampleCard = ({ isLoading, Layout }) => (
    <CivicCard
      cardMeta={sampleCardMetaWithTags}
      data={sampleCardData}
      isLoading={isLoading}
      Layout={Layout}
    />
  );

  SampleCard.tags = tags;
  return SampleCard;
});

export default sampleFilterCardsWithTags;
