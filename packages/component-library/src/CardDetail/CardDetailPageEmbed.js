import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const CardDetailPageEmbed = ({ params, CardRegistry }) => {
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
  params: PropTypes.shape({ slug: PropTypes.string.isRequired }),
  CardRegistry: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        project: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    )
  })
};

CardDetailPageEmbed.displayName = "CardDetailPageEmbed";

export default CardDetailPageEmbed;
