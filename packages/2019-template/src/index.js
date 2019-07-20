import React from "react";
import { CivicCardLayoutFull } from "@hackoregon/component-library";

import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";

// TODO: Update me before commiting a new card
import TemplateCard from "./components/TemplateCard";
import DemoCard from "./components/DemoCard";

const CardRegistry = [
  {
    slug: "template-card",
    // this reflects the odd way that these components are composed
    component: () => <TemplateCard Layout={CivicCardLayoutFull} />
  },
  {
    slug: "demo-card",
    // this reflects the odd way that these components are composed
    component: () => <DemoCard Layout={CivicCardLayoutFull} />
  }
];

export { App, Routes, Reducers, CardRegistry };
