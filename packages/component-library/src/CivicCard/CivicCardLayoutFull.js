/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { generate } from "shortid";
import PullQuote from "../PullQuote/PullQuote";
import Placeholder from "../Placeholder/Placeholder";
import cardMetaTypes from "./cardMetaTypes";
import {
  Chip,
  Resource,
  MetadataQuestion,
  CollapsableSection
} from "./LayoutComponents";

const sectionMarginSmall = css`
  display: block;
  margin: 12px auto;
`;

const sectionMaxWidthSmall = css`
  max-width: 700px;
`;

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const sectionMaxWidthMedium = css`
  max-width: 900px;
`;

const authorPhoto = css`
  width: 50%;
  filter: grayscale(100%);
  cursor: pointer;
`;

function CivicCardLayoutFull({ isLoading, data, cardMeta }) {
  return (
    <Fragment>
      <article>
        <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
          <header>
            <h1 id="title">{cardMeta.title}</h1>
          </header>
          <hr />
          <section id="tags">
            {cardMeta.tags.map((tag, index) => (
              <Chip tag={tag} index={index} key={generate()} />
            ))}
          </section>
          <hr />
        </div>
        <section>
          <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <div id="introText">{cardMeta.introText}</div>
          </div>
          <figure
            id="visualization"
            css={[sectionMarginMedium, sectionMaxWidthMedium]}
          >
            {cardMeta.selector}
            <cardMeta.visualization isLoading={isLoading} data={data} />
          </figure>
          <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <div id="shareText">
              <PullQuote quoteText={cardMeta.shareText} />
            </div>
            <div id="additionalText">{cardMeta.additionalText}</div>
          </div>
        </section>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
          <div id="analysis">
            <h2>About this analysis</h2>
            {cardMeta.analysis}
          </div>
        </section>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="metadata">
          <h2>About this data</h2>
          {cardMeta.metadata}
          {_.has(cardMeta, "metadataQA") && (
            <CollapsableSection
              items={cardMeta.metadataQA.map(item => (
                <MetadataQuestion item={item} key={generate()} />
              ))}
              collapseAfter={5}
            />
          )}
        </section>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section
          css={[sectionMarginSmall, sectionMaxWidthSmall]}
          id="resources"
        >
          <h2>Links and resources</h2>
          <p>
            Interested in learning more? The following links and resources are
            useful in gaining a greater understanding of the context of this
            data visualization.
          </p>
          <CollapsableSection
            items={cardMeta.resources.map(item => (
              <Resource item={item} key={generate()} />
            ))}
            collapseAfter={7}
          />
        </section>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="authors">
          <h2>Who made this?</h2>
          {cardMeta.authors.map(photo => (
            <img
              css={authorPhoto}
              src={photo}
              alt="Pictures of people who worked on this"
              key={generate()}
            />
          ))}
        </section>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="improve">
          <h2>Help make this better</h2>
          <p>
            CIVIC is an open platform, so you can help make this better! Whether
            you noticed a typo, want to suggest an improvement for our data
            visualization, or have context to add about the dataset, we want you
            to contribute.
          </p>
          <ul>
            <li>
              <a href="https://civicsoftwarefoundation.org/#volunteers">
                Get Started!
              </a>
            </li>
          </ul>
        </section>
      </article>
      <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="explore">
        <h2>Explore related data</h2>
        <Placeholder>
          <h3>
            <a href="https://civicsoftwarefoundation.org/#cities">
              See your data here!
            </a>
          </h3>
        </Placeholder>
      </section>
    </Fragment>
  );
}

CivicCardLayoutFull.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

export default CivicCardLayoutFull;
