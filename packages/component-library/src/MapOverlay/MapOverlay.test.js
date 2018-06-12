import React from 'react';
import { shallow } from 'enzyme';
import MapOverlay from './MapOverlay';
import DeckGL from 'deck.gl';

describe('MapOverlay', () => {
  const data = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0]
      },
      "properties": {
        "name": "Null Island"
      }
    }
  ];
  const extruded = true;
  const opacity = 0.8;

  const defaultProps = {
    data,
    opacity,
    extruded
  };

  const wrapper = shallow(<MapOverlay {...defaultProps}/>);

  it('should render a div wrapper', () => {
    expect(wrapper.find('div')).length(1)
  });

  it('should render with the same class name', () => {
    expect(wrapper.find('.MapOverlay')).length(1)
  });

  it('should render a DeckGL component', () => {
    expect(wrapper.find(DeckGL)).length(1)
  });

  it('should render without stroked', () => {
    expect(wrapper.props().layers)
  });

  it('should render without stroked', () => {
    expect(wrapper.props().filled)
  });
});
