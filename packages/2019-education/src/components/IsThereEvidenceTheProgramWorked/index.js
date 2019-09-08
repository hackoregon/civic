import React from "react";
import PropTypes from "prop-types";
import { CivicCard } from "@hackoregon/component-library";

import isThereEvidenceTheProgramWorkedMeta from "./isThereEvidenceTheProgramWorkedMeta";

const IsThereEvidenceTheProgramWorked = ({ Layout }) => (
  <CivicCard cardMeta={isThereEvidenceTheProgramWorkedMeta} Layout={Layout} />
);

IsThereEvidenceTheProgramWorked.displayName = "IsThereEvidenceTheProgramWorked";

IsThereEvidenceTheProgramWorked.propTypes = {
  Layout: PropTypes.func
};

export default IsThereEvidenceTheProgramWorked;
