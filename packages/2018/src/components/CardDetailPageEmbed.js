import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import CardRegistry from "../card-registry";

const CardDetailPageEmbed = ({ params }) => {
  const card = CardRegistry.find(params.slug);

  if (card && card.component) {
    const CardComponent = card.component;
    return <CardComponent />;
  }

  return (
    <div>
      <h1>Card not found</h1>
      <p>The card you are looking for doesn&apos;t exist.</p>
      <Link to="/">Find more on CIVIC</Link>
    </div>
  );
};

CardDetailPageEmbed.propTypes = {
  params: PropTypes.string
};

CardDetailPageEmbed.displayName = "CardDetailPageEmbed";

export default CardDetailPageEmbed;
