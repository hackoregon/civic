/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { generate } from "shortid";

import Collapsable from "../Collapsable/Collapsable";

export function Resource({ section }) {
  return (
    <Fragment>
      <h3>{section.heading}</h3>
      <ul>
        {section.items.map(item => (
          <li key={generate()}>
            <a href={item.link}>{item.description}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

Resource.propTypes = {
  section: PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string,
        description: PropTypes.string
      })
    )
  })
};

export function MetadataQuestion({ question, answer }) {
  return (
    <Fragment>
      <h4>{question}</h4>
      <p>{answer}</p>
    </Fragment>
  );
}

MetadataQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string
};

export function CollapsableSection({ items, collapseAfter, description }) {
  const beforeFold = _.slice(items, 0, collapseAfter);
  const afterFold = _.slice(items, collapseAfter);
  return (afterFold && afterFold.length) > 0 ? (
    <Collapsable description={description}>
      <Collapsable.Section>{beforeFold}</Collapsable.Section>
      <Collapsable.Section hidden>{afterFold}</Collapsable.Section>
    </Collapsable>
  ) : (
    <Fragment>{beforeFold}</Fragment>
  );
}

CollapsableSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  collapseAfter: PropTypes.number,
  description: PropTypes.string
};
