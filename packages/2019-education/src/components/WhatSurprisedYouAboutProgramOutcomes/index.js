import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import whatSurprisedYouAboutProgramOutcomesMeta from "./whatSurprisedYouAboutProgramOutcomesMeta";

const WhatSurprisedYouAboutProgramOutcomes = ({ Layout }) => (
  <CivicCard
    cardMeta={whatSurprisedYouAboutProgramOutcomesMeta}
    Layout={Layout}
  />
);

WhatSurprisedYouAboutProgramOutcomes.displayName =
  "WhatSurprisedYouAboutProgramOutcomes";

WhatSurprisedYouAboutProgramOutcomes.propTypes = {
  Layout: PropTypes.func
};

export default WhatSurprisedYouAboutProgramOutcomes;
