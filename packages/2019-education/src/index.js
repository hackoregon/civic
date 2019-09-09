import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import IsThereEvidenceTheProgramWorked from "./components/IsThereEvidenceTheProgramWorked";
import WhatSurprisedYouAboutProgramOutcomes from "./components/WhatSurprisedYouAboutProgramOutcomes";

const CardRegistry = [
  {
    slug: "what-surprised-you-about-program-outcomes",
    component: WhatSurprisedYouAboutProgramOutcomes
  },
  {
    slug: "is-there-evidence-the-program-worked",
    component: IsThereEvidenceTheProgramWorked
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
