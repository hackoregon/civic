// To be moved to component library
import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cx, css } from "emotion";
import { PullQuote, Placeholder } from "@hackoregon/component-library";

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

function FullCard({ isLoading, templateData, templateCardFull }) {
  return (
    <React.Fragment>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        <h1>{templateCardFull.title}</h1>
        {templateCardFull.tags.map(tag => (
          <Chip tag={tag} />
        ))}
        {templateCardFull.introText}
        {templateCardFull.selector}
      </div>
      <div className={cx(sectionMarginMedium, sectionMaxWidthMedium)}>
        <templateCardFull.visualization
          isLoading={isLoading}
          templateData={templateData}
        />
      </div>
      <div className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
        {templateCardFull.additionalText}
        <PullQuote quoteText={templateCardFull.shareText} />
        <h2>About this analysis</h2>
        <p>{templateCardFull.analysis}</p>
        <h2>About this data</h2>
        <p>{templateCardFull.metadata}</p>
        <h2>Links and resources</h2>
        <ul>
          {templateCardFull.resources.map(item => (
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

FullCard.propTypes = {
  isLoading: PropTypes.bool,
  templateData: PropTypes.arrayOf(PropTypes.object),
  templateCardFull: PropTypes.shape({
    /* TODO: Add shape */
  })
};

export default FullCard;
