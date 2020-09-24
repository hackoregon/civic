/* eslint-disable react/prop-types */
import React from "react";
import { CivicCard } from "../..";
import sampleCardMeta from "./sampleCardMeta";
import sampleCardData from "./sampleCardData";

const SampleCard = ({ isLoading, Layout }) => (
  <CivicCard
    cardMeta={sampleCardMeta}
    data={sampleCardData}
    isLoading={isLoading}
    Layout={Layout}
  />
);

SampleCard.tags = sampleCardMeta().tags;

export default SampleCard;
