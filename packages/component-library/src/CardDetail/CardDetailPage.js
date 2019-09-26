import React from "react";
import PropTypes from "prop-types";
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

  return null;
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
