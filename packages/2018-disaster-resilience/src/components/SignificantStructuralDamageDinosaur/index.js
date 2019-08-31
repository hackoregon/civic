import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import significantStructuralDamageDinosaurMeta from "./significantStructuralDamageDinosaurMeta";

const SignificantStructuralDamageDinosaur = ({ Layout }) => (
  <CivicCard
    cardMeta={significantStructuralDamageDinosaurMeta}
    Layout={Layout}
  />
);

SignificantStructuralDamageDinosaur.displayName =
  "SignificantStructuralDamageDinosaur";

SignificantStructuralDamageDinosaur.propTypes = {
  Layout: PropTypes.func
};

export default SignificantStructuralDamageDinosaur;
