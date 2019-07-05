// To be moved to component library
import React from "react";
import PropTypes from "prop-types";
import FullCard from "./FullCard";

const CivicFlexCard = ({ card, layout }) =>
  React.createElement(card, {}, layout);

CivicFlexCard.propTypes = {
  card: PropTypes.node.isRequired,
  layout: PropTypes.node
};

CivicFlexCard.defaultProps = {
  layout: FullCard
};

export default CivicFlexCard;
