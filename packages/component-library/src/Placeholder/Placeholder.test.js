import React from 'react';
import { render } from 'enzyme';
import Placeholder from './Placeholder';

describe('Placeholder', () => {
  it('should render a placeholder with a default message', () => {
    const placeholder = render(<Placeholder />);
    expect(placeholder.find('h1').text()).to.contain('Content Placeholder');
    expect(placeholder.find('p')).to.exist;
  });

  it('should render a placeholder with a custom message when the placeholder has children', () => {
    const customMessage = 'A customized message';
    const placeholder = render(<Placeholder>{customMessage}</Placeholder>);
    expect(placeholder.text()).to.eql(customMessage);
    expect(placeholder.find('h1')).not.to.exist;
    expect(placeholder.find('p')).not.to.exist;
  });
});
