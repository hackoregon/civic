import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import whatElseSurprisedYouAboutProgramOutcomesMeta from "./whatElseSurprisedYouAboutProgramOutcomesMeta";

const WhatElseSurprisedYouAboutProgramOutcomes = ({ Layout }) => (
  <CivicCard
    cardMeta={whatElseSurprisedYouAboutProgramOutcomesMeta}
    Layout={Layout}
  />
);

WhatElseSurprisedYouAboutProgramOutcomes.displayName =
  "WhatElseSurprisedYouAboutProgramOutcomes";

WhatElseSurprisedYouAboutProgramOutcomes.propTypes = {
  Layout: PropTypes.func
};

export default WhatElseSurprisedYouAboutProgramOutcomes;
