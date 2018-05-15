import React from 'react';
import { shallow } from 'enzyme';
import BaseMap from './BaseMap';

describe('BaseMap', () => {
  const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

  const defaultProps = {
    mapboxToken,
  };

  it('should render a MapGL component', () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find('.MapGL')).to.have.length(1);
  });

  it('should have required prop mapboxApiAccessToken', () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find('.MapGL').prop('mapboxApiAccessToken')).to.eql(defaultProps.mapboxToken);
  });
});
