import React from 'react';
import { shallow } from 'enzyme';
import CivicStoryCard from './CivicStoryCard';

describe('CivicStoryCard', () => {
  const { title, slug } = {
    title: 'Test Story Card Title',
    slug: 'card1',
  };

  describe('common properties', () => {
    const wrapper = shallow(<CivicStoryCard slug={slug} title={title} />);

    it('should render the title as an h2', () => {
      const h2 = wrapper.find('h2');

      expect(h2.text()).to.contain(title);
    });

    it('should include a StoryFooter that references this CivicStoryCard', () => {
      const footer = wrapper.find('StoryFooter');

      expect(footer.props().slug).to.equal(slug);
    });
  });

  describe('loading state', () => {
    const wrapper = shallow(
      <CivicStoryCard loading>
        <h1>blah</h1>
      </CivicStoryCard>
    );

    it('should render loading message', () => {
      expect(wrapper.text().indexOf('Loading...')).to.eql(0);
    });

    it('should not render children', () => {
      expect(wrapper.find('h1').length).to.eql(0);
    });
  });

  describe('error state', () => {
    const wrapper = shallow(
      <CivicStoryCard error="Could not load data">
        <h1>blah</h1>
      </CivicStoryCard>
    );

    it('should render loading message', () => {
      expect(wrapper.text().indexOf('Could not load data')).to.eql(0);
    });

    it('should not render children', () => {
      expect(wrapper.find('h1').length).to.eql(0);
    });
  });

  describe('card children', () => {
    const wrapper = shallow(
      <CivicStoryCard slug={slug} title={title}>
        <div className="Description">Some content</div>
        <div>Some other stuff</div>
      </CivicStoryCard>
    );

    it('should render children into a container div under the title', () => {
      expect(wrapper.children()).to.have.length(4);
      expect(wrapper.find('h2 + div').children()).to.have.length(2);
    });
  });
});
