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

  const defaultProps = {
    data,
    extruded,
    opacity,
  };

  const wrapper = shallow( <MapOverlay {...defaultProps} />);

  it('should render a DeckGL component', () => {
    expect(wrapper.find(DeckGL)).length(1)
  });

  it('should render with the same class name', () => {
    expect(wrapper.find('.MapOverlay')).length(1)
  });

  it('should render without stroked', () => {
    expect(wrapper.props().layers[0].props.stroked).to.equal(false)
  });

  it('should render with autoHighlight', () => {
    expect(wrapper.props().layers[0].props.autoHighlight).to.equal(true)
  });

  it('should render with opacity of 0.8', () => {
    expect(wrapper.props().layers[0].props.opacity).to.equal(0.8)
  });

  it('should render with an extrusion', () => {
    expect(wrapper.props().layers[0].props.extruded).to.equal(true)
  });

  it('should render with an extrusion', () => {
    expect(wrapper.props().layers[0].props.data).to.equal(data)
  });

  it('should render with an type string', () => {
    expect(wrapper.props().layers[0].props.data[0].type).to.equal("Feature")
  });
});
