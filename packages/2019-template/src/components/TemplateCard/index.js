import React from "react";
import TemplateCard from "./TemplateCard";
import CivicFlexCard from "./CivicFlexCard";

// eslint-disable-next-line react/prop-types
export default ({ layout }) => (
  <CivicFlexCard card={TemplateCard} layout={layout} />
);
