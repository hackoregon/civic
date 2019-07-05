import React from "react";
import { CivicCard } from "@hackoregon/component-library";

import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateCard from "./components/TemplateCard/TemplateCard";

const CardRegistry = [
  {
    slug: "template-card",
    component: <CivicCard card={TemplateCard} />
  }
];

export { App, Routes, Reducers, CardRegistry };
