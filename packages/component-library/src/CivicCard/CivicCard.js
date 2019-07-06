import React from "react";
import PropTypes from "prop-types";
import CivicCardLayoutFull from "./CivicCardLayoutClassic";

const CivicCard = ({ card, layout }) => React.createElement(card, {}, layout);

CivicCard.propTypes = {
  card: PropTypes.node.isRequired,
  layout: PropTypes.node
};

CivicCard.defaultProps = {
  layout: CivicCardLayoutFull
};

export default CivicCard;
