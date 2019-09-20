import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { PageLayout } from "../..";

const matchRelatedCardsByTags = (slug, baseTags, entries) => {
  // console.log(entries[0].component.tags);
  const relatedCards = entries
    .map(entry => {
      // console.log("TAGS", entry.component.tags);
      return {
        numOfSimilarTags: entry.component.tags.filter(tag => {
          return baseTags.includes(tag);
        }).length,
        ...entry
      };
    })
    .filter(entry => {
      return entry.slug !== slug;
    })
    .sort((a, b) => {
      return b.numOfSimilarTags - a.numOfSimilarTags;
    })
    .slice(0, 4);

  return relatedCards;
};

const ExploreRelated = ({ slug, CardRegistry }) => {
  const card = CardRegistry.find(slug);
  const relatedCards = matchRelatedCardsByTags(
    slug,
    card.component.tags,
    CardRegistry.entries
  );
  console.log("RELATED CARDS", relatedCards);

  if (card && card.component) {
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
