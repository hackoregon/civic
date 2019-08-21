/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Collapsable from "../Collapsable/Collapsable";
import VisualizationColors from "../_Themes/VisualizationColors";

const { victoryColors } = VisualizationColors;

const chipStyle = index => css`
  display: inline-block;
  padding: 0 2em;
  height: 2em;
  line-height: 2em;
  border-radius: 1em;
  background-color: ${victoryColors[index % victoryColors.length]};
  margin: 0.5em 0.5em;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export function Chip({ tag, index }) {
  return <span css={chipStyle(index)}>{`#${tag}`}</span>;
}

Chip.propTypes = {
  tag: PropTypes.string,
  index: PropTypes.number
};

export function Resource({ item }) {
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

export function MetadataQuestion({ item }) {
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

export function CollapsableSection({ items, collapseAfter }) {
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
