import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cx, css } from "emotion";
import PullQuote from "../PullQuote/PullQuote";
import Placeholder from "../Placeholder/Placeholder";

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

function Chip({ tag }) {
  return <span>{` #${tag} `}</span>;
}

Chip.propTypes = {
  tag: PropTypes.string
};

function Resource({ item }) {
  return (
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

function CivicCardLayoutFull({ isLoading, data, cardMeta }) {
  return (
    <React.Fragment>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        <h1>{cardMeta.title}</h1>
        {cardMeta.tags.map(tag => (
          <Chip tag={tag} />
        ))}
        {cardMeta.introText}
        {cardMeta.selector}
      </div>
      <div className={cx(sectionMarginMedium, sectionMaxWidthMedium)}>
        <cardMeta.visualization isLoading={isLoading} data={data} />
      </div>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        {cardMeta.additionalText}
        <PullQuote quoteText={cardMeta.shareText} />
        <h2>About this analysis</h2>
        <p>{cardMeta.analysis}</p>
        <h2>About this data</h2>
        <p>{cardMeta.metadata}</p>
        <h2>Links and resources</h2>
        <ul>
          {cardMeta.resources.map(item => (
            <Resource item={item} />
          ))}
        </ul>
        <h2>Who made this?</h2>
        <Placeholder>
          <h3>Beautiful team members photos here!</h3>
        </Placeholder>
        <h2>Help make this better</h2>
        <p>
          You can help make this better! Whether you noticed a typo, think you
          have an improvement for our data visualization, or some additional
          context to add about the dataset, we want you to contribute! Get
          started by filling out this form!
        </p>
        <h2>Explore related cards</h2>
        <Placeholder>
          <h3>Thumbnails of other related cards here</h3>
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
