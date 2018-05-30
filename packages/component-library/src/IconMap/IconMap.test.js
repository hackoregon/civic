import React from 'react';
import { shallow } from 'enzyme';
import IconMap from './IconMap';

describe('IconMap', () => {
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

  const viewport = { zoom: 9.5 };

  const iconSizeScale = zoom => zoom > 9.5 ? 25 : 5;

  const defaultProps = { data, viewport, iconSizeScale };

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
