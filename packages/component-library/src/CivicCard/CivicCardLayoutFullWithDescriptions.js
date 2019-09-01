/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import _ from "lodash";
import { generate } from "shortid";
import PullQuote from "../PullQuote/PullQuote";
import Placeholder from "../Placeholder/Placeholder";
import cardMetaTypes from "./cardMetaTypes";
import cardMetaDescription from "./cardMetaDescriptions";
import { Chip } from "../index";
import {
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

const cardMetaItem = css`
  border: 1px solid red;
`;

const platformItem = css`
  border: 1px solid blue;
`;

const description = css`
  max-width: 700px;
  margin: auto;
`;

const demoAuthorPhotos = [
  "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
  "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
];

function Desc({ id }) {
  return (
    <div css={description}>
      <b>{_.get(cardMetaDescription, [id, "title"])}</b>
      <code>{` (${id}) `}</code>
      <p>{_.get(cardMetaDescription, [id, "description"])}</p>
    </div>
  );
}

Desc.propTypes = {
  id: PropTypes.string
};

function CivicCardLayoutFullWithDescriptions({ isLoading, data, cardMeta }) {
  return (
    <div>
      <div>
        <article>
          <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <header>
              <h1 css={cardMetaItem} id="title">
                {cardMeta.title}
              </h1>
              <Desc id="title" />
            </header>
            <hr />
            <section css={cardMetaItem} id="tags">
              {cardMeta.tags.map((tag, index) => (
                <Chip tag={tag} index={index} key={generate()} />
              ))}
            </section>
            <Desc id="tags" />
            <hr />
          </div>
          <section>
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div css={cardMetaItem} id="introText">
                {cardMeta.introText}
              </div>
              <Desc id="introText" />
            </div>
            <div
              id="visualization"
              css={[sectionMarginMedium, sectionMaxWidthMedium, cardMetaItem]}
            >
              {cardMeta.selector}
              <cardMeta.visualization isLoading={isLoading} data={data} />
            </div>
            <Desc id="visualization" />
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div css={cardMetaItem} id="shareText">
                <PullQuote quoteText={cardMeta.shareText} />
              </div>
              <Desc id="shareText" />
              <div css={cardMetaItem} id="additionalText">
                {cardMeta.additionalText}
              </div>
              <Desc id="additionalText" />
            </div>
          </section>
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <div css={cardMetaItem} id="analysis">
              <h2>About this analysis</h2>
              {cardMeta.analysis}
            </div>
          </section>
          <Desc id="analysis" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, cardMetaItem]}
            id="metadata"
          >
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
          <Desc id="metadataQA" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, cardMetaItem]}
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
                <Resource section={item} key={generate()} />
              ))}
              collapseAfter={7}
            />
          </section>
          <Desc id="resources" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall]}
            id="authors"
          >
            <h2>Who made this?</h2>
            {cardMeta.authors.length
              ? cardMeta.authors.map(authorEmail => (
                  <p key={authorEmail}>
                    <a href={`mailto:${authorEmail}`}>{authorEmail}</a>
                  </p>
                ))
              : demoAuthorPhotos.map(photo => (
                  <img
                    css={authorPhoto}
                    src={photo}
                    alt="Pictures of people who worked on this"
                    key={generate()}
                  />
                ))}
          </section>
          <Desc id="authors" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, platformItem]}
            id="improve"
          >
            <h2>Help make this better</h2>
            <p>
              CIVIC is an open platform, so you can help make this better!
              Whether you noticed a typo, want to suggest an improvement for our
              data visualization, or have context to add about the dataset, we
              want you to contribute.
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
        <section
          css={[sectionMarginSmall, sectionMaxWidthSmall, platformItem]}
          id="explore"
        >
          <h2>Explore related data</h2>
          <Placeholder>
            <h3>
              <a href="https://civicsoftwarefoundation.org/#cities">
                See your data here!
              </a>
            </h3>
          </Placeholder>
        </section>
      </div>
    </div>
  );
}

CivicCardLayoutFullWithDescriptions.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

export default CivicCardLayoutFullWithDescriptions;
