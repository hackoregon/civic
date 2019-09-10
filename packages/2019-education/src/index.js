import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import IsThereEvidenceTheProgramWorked from "./components/IsThereEvidenceTheProgramWorked";
import WhatSurprisedYouAboutProgramOutcomes from "./components/WhatSurprisedYouAboutProgramOutcomes";
import WhatElseSurprisedYouAboutProgramOutcomes from "./components/WhatElseSurprisedYouAboutProgramOutcomes";

const CardRegistry = [
  {
    slug: "what-else-surprised-you-about-program-outcomes",
    component: WhatElseSurprisedYouAboutProgramOutcomes
  },
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
