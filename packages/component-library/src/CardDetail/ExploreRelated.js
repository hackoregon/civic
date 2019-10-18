/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import shortid from "shortid";
import { Link } from "react-router";
import { ThemeProvider } from "@material-ui/styles";

import { MaterialTheme } from "../_Themes/index";
import { PageLayout } from "../..";
import { CivicCardLayoutPreviewTitleOnly } from "../index";

const sectionMarginSmall = css`
  display: block;
  margin: 12px auto;
`;

const sectionMaxWidthSmall = css`
  max-width: 900px;
`;

const listContainerStyle = css`
  width: 100%;
  display: flex;
  padding: 0;
  justify-content: space-evenly;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const listItemStyle = css`
  width: 45%;
  margin: 5px;
  box-sizing: border-box;
  list-style-type: none;
`;

const matchRelatedCardsByTags = (slug, baseTags, entries) => {
  const relatedCards = entries
    .map(entry => {
      return {
        numOfSimilarTags: entry.component.tags
          ? entry.component.tags.filter(tag => {
              return baseTags.includes(tag);
            }).length
          : 0,
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

  const relatedCardList = relatedCards.map(relatedCard => (
    <li key={shortid.generate()} css={listItemStyle}>
      <relatedCard.component Layout={CivicCardLayoutPreviewTitleOnly} />
    </li>
  ));

  if (card && card.component) {
    return (
      <ThemeProvider theme={MaterialTheme}>
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
          <h2>Explore related data</h2>
          <ul css={listContainerStyle}>{relatedCardList}</ul>
        </section>
      </ThemeProvider>
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
