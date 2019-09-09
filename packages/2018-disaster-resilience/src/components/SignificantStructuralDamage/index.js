import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import significantStructuralDamageMeta from "./significantStructuralDamageMeta";

const SignificantStructuralDamage = ({ Layout }) => (
  <CivicCard cardMeta={significantStructuralDamageMeta} Layout={Layout} />
);

SignificantStructuralDamage.displayName = "SignificantStructuralDamage";
SignificantStructuralDamage.tags = significantStructuralDamageMeta().tags;

SignificantStructuralDamage.propTypes = {
  Layout: PropTypes.func
};

export default SignificantStructuralDamage;
