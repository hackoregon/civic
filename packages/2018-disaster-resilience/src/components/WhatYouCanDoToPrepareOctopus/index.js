import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import whatYouCanDoToPrepareOctopusMeta from "./whatYouCanDoToPrepareOctopusMeta";

const WhatYouCanDoToPrepareOctopus = ({ Layout }) => (
  <CivicCard cardMeta={whatYouCanDoToPrepareOctopusMeta} Layout={Layout} />
);

WhatYouCanDoToPrepareOctopus.displayName = "WhatYouCanDoToPrepareOctopus";

WhatYouCanDoToPrepareOctopus.propTypes = {
  Layout: PropTypes.func
};

export default WhatYouCanDoToPrepareOctopus;
