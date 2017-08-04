'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _StoryCard = require('./StoryCard');

var _StoryCard2 = _interopRequireDefault(_StoryCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('StoryCard', function () {
  var _title$cardId$collect = {
    title: 'Test Story Card Title',
    cardId: 'card1',
    collectionId: 'collection1'
  },
      title = _title$cardId$collect.title,
      cardId = _title$cardId$collect.cardId,
      collectionId = _title$cardId$collect.collectionId;


  describe('common properties', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_StoryCard2.default, { cardId: cardId, collectionId: collectionId, title: title }));

    it('should render the title as an h2', function () {
      var h2 = wrapper.find('h2');

      expect(h2.text()).to.contain(title);
      expect(h2.props().className).to.contain('Title');
      expect(h2.props().className).to.contain('FilsonSoft');
    });

    it('should include a StoryFooter that references this StoryCard', function () {
      var footer = wrapper.find('StoryFooter');

      expect(footer.props().cardId).to.equal(cardId);
      expect(footer.props().collectionId).to.equal(collectionId);
    });
  });

  describe('card children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _StoryCard2.default,
      { cardId: cardId, collectionId: collectionId, title: title },
      _react2.default.createElement(
        'div',
        { className: 'Description' },
        'Some content'
      ),
      _react2.default.createElement(
        'div',
        null,
        'Some other stuff'
      )
    ));

    it('should render children into a container div under the title', function () {
      expect(wrapper.children()).to.have.length(3);
      expect(wrapper.find('h2 + div').children()).to.have.length(2);
    });
  });
});