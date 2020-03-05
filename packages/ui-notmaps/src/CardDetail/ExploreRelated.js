/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import shortid from "shortid";
import { ThemeProvider } from "@material-ui/styles";

import { MaterialTheme } from "../_Themes/index";
import { CivicCardLayoutPreviewTitleOnly, Placeholder } from "../index";

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

const matchRelatedCardsByTags = (
  slug,
  baseTags,
  entries,
  numOfRelatedCards
) => {
  const relatedCards =
    baseTags && baseTags.length
      ? entries
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
          .slice(0, numOfRelatedCards)
      : [];

  return relatedCards;
};

const ExploreRelated = ({ slug, CardRegistry, numOfRelatedCards = 4 }) => {
  const card = CardRegistry.find(slug);
  const relatedCards = matchRelatedCardsByTags(
    slug,
    card.component.tags,
    CardRegistry.entries,
    numOfRelatedCards
  );

  const relatedCardList =
    relatedCards.length > 0 ? (
      relatedCards.map(relatedCard => (
        <li key={shortid.generate()} css={listItemStyle}>
          <relatedCard.component Layout={CivicCardLayoutPreviewTitleOnly} />
        </li>
      ))
    ) : (
      <Placeholder>
        <h3>
          <a href="https://civicsoftwarefoundation.org/#cities">
            See your data here!
          </a>
        </h3>
      </Placeholder>
    );

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

  return null;
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
  }).isRequired,
  numOfRelatedCards: PropTypes.number
};

ExploreRelated.displayName = "ExploreRelated";

export default ExploreRelated;
