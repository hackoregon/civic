import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { PageLayout, ExploreRelated } from "../..";

const CardDetailPage = ({ params, CardRegistry }) => {
  const card = CardRegistry.find(params.slug);

  if (card && card.component) {
    const CardComponent = card.component;
    return (
      <PageLayout>
        <CardComponent />
        <ExploreRelated slug={params.slug} CardRegistry={CardRegistry} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section>
        <h1>Card not found</h1>
        <p>The card you are looking for doesn&apos;t exist.</p>
        <Link to="/cards">Other cards</Link>
      </section>
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
