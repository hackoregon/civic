import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { PageLayout } from "../..";

const ExploreRelated = ({ slug, CardRegistry }) => {
  const card = CardRegistry.find(slug);
  // const card = {
  //   component: true
  // }

  if (card && card.component) {
    // const CardComponent = card.component;
    return <h1>Hello World</h1>;
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

ExploreRelated.propTypes = {
  slug: PropTypes.string.isRequired,
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

ExploreRelated.displayName = "ExploreRelated";

export default ExploreRelated;
