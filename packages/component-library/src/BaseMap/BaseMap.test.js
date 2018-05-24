import React from 'react';
import { shallow } from 'enzyme';
import BaseMap from './BaseMap';
import ScatterPlotMap from '../ScatterPlotMap/ScatterPlotMap';

describe('BaseMap', () => {
  const mapboxToken = 'pk.testmapboxtoken.sjTrNKLW9daDBIGvP3_W0w';
  const defaultProps = { mapboxToken };

  it('should render a MapGL component', () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find('.MapGL')).to.have.length(1);
  });

  it('should include required prop mapboxApiAccessToken', () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find('.MapGL').prop('mapboxApiAccessToken')).to.eql(defaultProps.mapboxToken);
  });

  it('should render child NavigationControl component', () => {
    const wrapper = shallow(<BaseMap {...defaultProps} />);

    expect(wrapper.find('.MapGL').children()).to.have.length(1);
  });

  it('should render child deck.gl layer component', () => {
    const data = [
      {
        "geometry": {
          "type": "Point",
          "coordinates": [0, 0],
        },
      },
    ];

    const wrapper = shallow(
      <BaseMap {...defaultProps}>
        <ScatterPlotMap data={data} />
      </BaseMap>
    );

    expect(wrapper.find('.MapGL').children()).to.have.length(2);
  });
});
