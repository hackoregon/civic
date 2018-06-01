import React from 'react';
import { shallow } from 'enzyme';
import HexOverlay from './HexOverlay';

describe('HexOverlay', () => {
  const mapboxStyle = 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq';
  const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

  const defaultProps = {
    mapboxStyle,
    mapboxToken,
  };

  it('should render a DeckGLOverlay component', () => {
    const wrapper = shallow(<HexOverlay {...defaultProps} />);
    expect(wrapper.find('.DeckGLOverlay')).to.have.length(0);
  });

  it('should have required prop mapboxApiAccessToken', () => {
    const wrapper = shallow(<HexOverlay {...defaultProps} />);

    expect(wrapper.find('.DeckGLOverlay').children()).to.have.length(0);

    expect(wrapper.find('.DeckGLOverlay')).to.have.length(0);
  });
});
