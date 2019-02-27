import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('<App />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const wrapper = shallow(
      <App>
        {children}
      </App>,
    );
    expect(wrapper.contains(children)).to.eql(true);
  });
});
