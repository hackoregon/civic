var _templateObject = _taggedTemplateLiteral(['\n  text-align: center;\n  max-width: 1200px;\n  margin: 0 auto;\n'], ['\n  text-align: center;\n  max-width: 1200px;\n  margin: 0 auto;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  margin: 0 auto;\n  text-align: left;\n'], ['\n  margin: 0 auto;\n  text-align: left;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import StoryFooter from './StoryFooter';

var cardClass = css(_templateObject);

var descriptionClass = css(_templateObject2);

var StoryCard = function StoryCard(_ref) {
  var cardId = _ref.cardId,
      collectionId = _ref.collectionId,
      title = _ref.title,
      children = _ref.children;
  return React.createElement(
    'div',
    { className: cardClass },
    React.createElement(
      'h2',
      { className: 'Title FilsonSoft' },
      title
    ),
    React.createElement(
      'div',
      { className: descriptionClass },
      children
    ),
    React.createElement(StoryFooter, { cardId: cardId, collectionId: collectionId })
  );
};

StoryCard.displayName = 'StoryCard';

StoryCard.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  collectionId: PropTypes.string,
  children: PropTypes.node
};

export default StoryCard;