import React, { Fragment } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cx, css } from "emotion";
import _ from "lodash";
import PullQuote from "../PullQuote/PullQuote";
import Placeholder from "../Placeholder/Placeholder";
import CivicVictoryTheme from "../VictoryTheme/CivicVictoryTheme";
import { Collapsable } from "../../dist";

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

function Chip({ tag, index }) {
  return (
    <span
      className={css`
        display: inline-block;
        padding: 0 2em;
        height: 2em;
        line-height: 2em;
        border-radius: 1em;
        background-color: ${CivicVictoryTheme.group.colorScale[
          index % CivicVictoryTheme.group.colorScale.length
        ]};
        margin: 0.5em 0.5em;
        font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
        font-weight: bold;
        color: white;
        cursor: pointer;
      `}
    >{`#${tag}`}</span>
  );
}

Chip.propTypes = {
  tag: PropTypes.string,
  index: PropTypes.number
};

function Resource({ item }) {
  return _.has(item, "section") ? (
    <h3>{item.section}</h3>
  ) : (
    <li>
      <a href={item.link}>{item.description}</a>
    </li>
  );
}

Resource.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    description: PropTypes.string
  })
};

function MetadataQuestion({ item }) {
  return _.has(item, "section") ? (
    <h3>{item.section}</h3>
  ) : (
    item.answer.length > 0 && (
      <Fragment>
        <h4>{item.question}</h4>
        <p>{item.answer}</p>
      </Fragment>
    )
  );
}

MetadataQuestion.propTypes = {
  item: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string
  })
};

function CollapsableSection({ items, collapseAfter }) {
  const beforeFold = _.slice(items, 0, collapseAfter);
  const afterFold = _.slice(items, collapseAfter);
  return (afterFold && afterFold.length) > 0 ? (
    <Collapsable>
      <Collapsable.Section>{beforeFold}</Collapsable.Section>
      <Collapsable.Section hidden>{afterFold}</Collapsable.Section>
    </Collapsable>
  ) : (
    <Fragment>{beforeFold}</Fragment>
  );
}

CollapsableSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  collapseAfter: PropTypes.number
};

function CivicCardLayoutFull({ isLoading, data, cardMeta }) {
  return (
    <React.Fragment>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        <h1>{cardMeta.title}</h1>
        <hr />
        {cardMeta.tags.map((tag, index) => (
          <Chip tag={tag} index={index} />
        ))}
        <hr />
        {cardMeta.introText}
        {cardMeta.selector}
      </div>
      <div className={cx(sectionMarginMedium, sectionMaxWidthMedium)}>
        <cardMeta.visualization isLoading={isLoading} data={data} />
      </div>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        <PullQuote quoteText={cardMeta.shareText} />
        {cardMeta.additionalText}
        <hr />
        <h2>About this analysis</h2>
        {cardMeta.analysis}
        <hr />
        <h2>About this data</h2>
        {cardMeta.metadata}
        {_.has(cardMeta, "metadataQA") && (
          <CollapsableSection
            items={cardMeta.metadataQA.map(item => (
              <MetadataQuestion item={item} />
            ))}
            collapseAfter={5}
          />
        )}
        <hr />
        <h2>Links and resources</h2>
        <p>
          Interested in learning more? The following links and resources are
          useful in gaining a greater understanding of the context of this data
          visualization.
        </p>
        <ul>
          <CollapsableSection
            items={cardMeta.resources.map(item => (
              <Resource item={item} />
            ))}
            collapseAfter={7}
          />
        </ul>
        <hr />
        <h2>Who made this?</h2>
        {cardMeta.authors.map(photo => (
          <img
            className={authorPhoto}
            src={photo}
            alt="Pictures of people who worked on this"
          />
        ))}
        <hr />
        <h2>Help make this better</h2>
        <p>
          CIVIC is an open platform, so you can help make this better! Whether
          you noticed a typo, want to suggest an improvement for our data
          visualization, or have context to add about the dataset, we want you
          to contribute.
          <ul>
            <li>
              <a href="https://civicsoftwarefoundation.org/#volunteers">
                Get Started!
              </a>
            </li>
          </ul>
        </p>
        <hr />
        <h2>Explore related data</h2>
        <Placeholder>
          <h3>
            <a href="https://civicsoftwarefoundation.org/#cities">
              See your data here!
            </a>
          </h3>
        </Placeholder>
      </div>
    </React.Fragment>
  );
}

CivicCardLayoutFull.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  cardMeta: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default CivicCardLayoutFull;
