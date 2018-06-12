import React from 'react';
import { shallow } from 'enzyme';
import HexOverlay from './HexOverlay';
import DeckGL from 'deck.gl';

describe('HexOverlay', () => {
  const data = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0,
          0
        ]
      },
      "properties": {
        "name": "Null Island"
      }
    }
  ];
  const extruded = true;
  const opacity = 0.8;
  const radius = 200;

  const defaultProps = {
    data,
    extruded,
    opacity,
    radius,
  };

  const wrapper = shallow( <HexOverlay {...defaultProps} />);

  it('should render a DeckGLOverlay component', () => {
    const wrapper = shallow(<HexOverlay {...defaultProps} />);
    expect(wrapper.find('.HexOverlay')).to.have.length(1);
  });

  it('should render a DeckGL component', () => {
    expect(wrapper.find(DeckGL)).length(1)
  });

  it('should render with the same class name', () => {
    expect(wrapper.find('.HexOverlay')).length(1)
  });
});
