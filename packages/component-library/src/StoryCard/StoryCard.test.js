import React from 'react';
import { shallow } from 'enzyme';
import StoryCard from './StoryCard';

describe('StoryCard', () => {
  const { title, cardId, collectionId } = {
    title: 'Test Story Card Title',
    cardId: 'card1',
    collectionId: 'collection1',
  };

  describe('common properties', () => {
    const wrapper = shallow(
      <StoryCard cardId={cardId} collectionId={collectionId} title={title} />,
    );

    it('should render the title as an h2', () => {
      const h2 = wrapper.find('h2');

      expect(h2.text()).to.contain(title);
      expect(h2.props().className).to.contain('Title');
      expect(h2.props().className).to.contain('FilsonSoft');
    });

    it('should include a StoryFooter that references this StoryCard', () => {
      const footer = wrapper.find('StoryFooter');

      expect(footer.props().cardId).to.equal(cardId);
      expect(footer.props().collectionId).to.equal(collectionId);
    });
  });

  describe('card children', () => {
    const wrapper = shallow(
      <StoryCard cardId={cardId} collectionId={collectionId} title={title}>
        <div className="Description">Some content</div>
        <div>
          Some other stuff
        </div>
      </StoryCard>,
    );

    it('should render children into a container div under the title', () => {
      expect(wrapper.children()).to.have.length(3);
      expect(wrapper.find('h2 + div').children()).to.have.length(2);
    });
  });
});
