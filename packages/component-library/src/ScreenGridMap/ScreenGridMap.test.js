import React from 'react';
import { shallow } from 'enzyme';
import ScreenGridMap from './ScreenGridMap';

describe('ScreenGridMap', () => {
  const data = [
    {
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0],
      },
      "property": {
        "name": "Null Island",
      },
    },
  ];

  const defaultProps = { data };

  it('should render a DeckGL component', () => {
    const wrapper = shallow(<ScreenGridMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL')).to.have.length(1);
  });

  it('should render child ScreenGridMap component', () => {
    const wrapper = shallow(<ScreenGridMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL').children()).to.have.length(1);
    expect(wrapper.find('.ScreenGridMap')).to.have.length(1);
  });
});
