import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { PageLayout } from "@hackoregon/component-library";
import CardRegistry from "../card-registry";

const CardDetailPage = ({ params }) => {
  const card = CardRegistry.find(params.slug);

  if (card && card.component) {
    const CardComponent = card.component;
    return (
      <PageLayout>
        <CardComponent />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1>Card not found</h1>
      <p>
        The card you are looking for doesn&apos;t exist.
        <Link to="/cities/portland">View the Portland Collection</Link>
      </p>
    </PageLayout>
  );
};

CardDetailPage.propTypes = {
  params: PropTypes.string
};

CardDetailPage.displayName = "CardDetailPage";

export default CardDetailPage;
