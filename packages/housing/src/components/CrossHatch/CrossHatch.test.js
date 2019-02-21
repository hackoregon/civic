import React from 'react';
import { shallow } from 'enzyme';
import L from 'leaflet';
import './leafletCrosshatch';

import CrossHatch from './index';

describe('<CrossHatch />', () => {
  let map;
  let wrapper;

  beforeEach(() => {
    map = {
      addPattern: sinon.spy(),
    };

    wrapper = shallow(<CrossHatch />, { context: { map } });
  });

  it('should render nothing', () => {
    expect(wrapper.type()).to.be.null;
  });

  it('should register a CrossHatch pattern with the map provided as context', () => {
    expect(map.addPattern).to.have.been.called;
    expect(map.addPattern.args[0][0]).to.be.an.instanceOf(L.CrossHatch);
  });
});
