import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { get } from "lodash";
import CivicCardLayoutVisualizationOnly from "../CivicCard/CivicCardLayoutVisualizationOnly";
import CivicCardLayoutClassic from "../CivicCard/CivicCardLayoutClassic";
import CivicCardLayoutPreview from "../CivicCard/CivicCardLayoutPreview";
import CivicCardLayoutSideBySide from "../CivicCard/CivicCardLayoutSideBySide";
import CivicCardLayoutVisualizationOnlyNoLink from "../CivicCard/CivicCardLayoutVisualizationOnlyNoLink";

const CardDetailPageEmbed = ({ params, CardRegistry }) => {
  const card = CardRegistry.find(params.slug);
  const layouts = {
    visualization: CivicCardLayoutVisualizationOnly,
    visualizationnolink: CivicCardLayoutVisualizationOnlyNoLink,
    classic: CivicCardLayoutClassic,
    preview: CivicCardLayoutPreview,
    comparison: CivicCardLayoutSideBySide
  };
  const Layout = get(layouts, params.layout) || layouts.classic;

  if (card && card.component) {
    const CardComponent = card.component;
    return <CardComponent Layout={Layout} />;
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
  }).isRequired
};

CardDetailPageEmbed.displayName = "CardDetailPageEmbed";

export default CardDetailPageEmbed;
