import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const wrapper = shallow(
      <NotFound />,
    );
    expect(wrapper.text()).to.eql('Page not found.');
  });
});
