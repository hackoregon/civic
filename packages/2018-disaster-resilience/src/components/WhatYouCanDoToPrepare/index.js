import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import whatYouCanDoToPrepareMeta from "./whatYouCanDoToPrepareMeta";

const WhatYouCanDoToPrepare = ({ Layout }) => (
  <CivicCard cardMeta={whatYouCanDoToPrepareMeta} Layout={Layout} />
);

WhatYouCanDoToPrepare.displayName = "WhatYouCanDoToPrepare";
WhatYouCanDoToPrepare.tags = whatYouCanDoToPrepareMeta().tags;

WhatYouCanDoToPrepare.propTypes = {
  Layout: PropTypes.func
};

export default WhatYouCanDoToPrepare;
