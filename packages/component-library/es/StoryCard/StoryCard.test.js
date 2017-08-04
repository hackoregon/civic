import React from 'react';
import { shallow } from 'enzyme';
import StoryCard from './StoryCard';

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
    var wrapper = shallow(React.createElement(StoryCard, { cardId: cardId, collectionId: collectionId, title: title }));

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
    var wrapper = shallow(React.createElement(
      StoryCard,
      { cardId: cardId, collectionId: collectionId, title: title },
      React.createElement(
        'div',
        { className: 'Description' },
        'Some content'
      ),
      React.createElement(
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