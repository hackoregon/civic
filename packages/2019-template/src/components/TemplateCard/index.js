import React from "react";
import { CivicCard } from "@hackoregon/component-library";
import TemplateCard from "./TemplateCard";

// eslint-disable-next-line react/prop-types
export default ({ layout }) => (
  <CivicCard card={TemplateCard} layout={layout} />
);
