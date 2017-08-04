'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StoryFooter = require('./StoryFooter');

var _StoryFooter2 = _interopRequireDefault(_StoryFooter);

require('./StoryCard.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryCard = function StoryCard(_ref) {
  var cardId = _ref.cardId,
      collectionId = _ref.collectionId,
      title = _ref.title,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'Card' },
    _react2.default.createElement(
      'h2',
      { className: 'Title FilsonSoft' },
      title
    ),
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      children
    ),
    _react2.default.createElement(_StoryFooter2.default, { cardId: cardId, collectionId: collectionId })
  );
};

StoryCard.displayName = 'StoryCard';

StoryCard.propTypes = {
  title: _react.PropTypes.string,
  cardId: _react.PropTypes.string,
  collectionId: _react.PropTypes.string,
  children: _react.PropTypes.node
};

exports.default = StoryCard;