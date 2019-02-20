import React from 'react';
import { shallow } from 'enzyme';
import ScatterPlotMap from './ScatterPlotMap';

describe('ScatterPlotMap', () => {
  const data = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {
        name: 'Null Island',
      },
    },
  ];

  const defaultProps = { data };

  it('should render a DeckGL component', () => {
    const wrapper = shallow(<ScatterPlotMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL')).to.have.length(1);
  });

  it('should render child ScatterPlotMap component', () => {
    const wrapper = shallow(<ScatterPlotMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL').children()).to.have.length(1);
    expect(wrapper.find('.ScatterPlotMap')).to.have.length(1);
  });
});
