import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import doProgramsLikeThisMatterAtPolicyLevelMeta from "./doProgramsLikeThisMatterAtPolicyLevelMeta";

const DoProgramsLikeThisMatterAtPolicyLevel = ({ Layout }) => (
  <CivicCard
    cardMeta={doProgramsLikeThisMatterAtPolicyLevelMeta}
    Layout={Layout}
  />
);

DoProgramsLikeThisMatterAtPolicyLevel.displayName =
  "DoProgramsLikeThisMatterAtPolicyLevel";

DoProgramsLikeThisMatterAtPolicyLevel.propTypes = {
  Layout: PropTypes.func
};

export default DoProgramsLikeThisMatterAtPolicyLevel;
