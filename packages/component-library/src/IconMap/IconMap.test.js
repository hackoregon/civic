import React from 'react';
import { shallow } from 'enzyme';
import IconMap from './IconMap';

describe('IconMap', () => {
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
    const wrapper = shallow(<IconMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL')).to.have.length(1);
  });

  it('should render child IconMap component', () => {
    const wrapper = shallow(<IconMap {...defaultProps} />);

    expect(wrapper.find('.DeckGL').children()).to.have.length(1);
    expect(wrapper.find('.IconMap')).to.have.length(1);
  });
});
