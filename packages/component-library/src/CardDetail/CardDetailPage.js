import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { PageLayout } from "../..";

const CardDetailPage = ({ params, CardRegistry }) => {
  const card = CardRegistry.find(entry => entry.slug === params.slug);

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
  params: PropTypes.shape({ slug: PropTypes.string.isRequired }),
  CardRegistry: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func.isRequired,
        project: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

CardDetailPage.displayName = "CardDetailPage";

export default CardDetailPage;
