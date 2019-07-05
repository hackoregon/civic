// To be moved to component library
import React from "react";
import PropTypes from "prop-types";
import CivicCardLayoutClassic from "./CivicCardLayoutClassic";

const CivicCard = ({ card, layout }) => React.createElement(card, {}, layout);

CivicCard.propTypes = {
  card: PropTypes.node.isRequired,
  layout: PropTypes.node
};

CivicCard.defaultProps = {
  layout: CivicCardLayoutClassic
};

export default CivicCard;
