import React from 'react';
import { mount } from 'enzyme';
// import { Map, TileLayer } from 'react-leaflet';
// import LeafletMap from './LeafletMap';

// Leaflet expects to be run in a browser and it kills mocha
// when executed via node.
describe.skip('LeafletMap', () => {
  // const props = {
  //   width: 600,
  //   height: 400,
  //   zoom: 5,
  //   center: [20, 10],
  //   scrollWheelZoom: true,
  // };

  // const wrapper = mount(
  //   <LeafletMap {...props} >
  //     <div />
  //     <span />
  //   </LeafletMap>,
  // );

  // /**
  //  * shorthand getter function to find react-leaflet map
  //  */
  // const getMap = () => wrapper.find(Map).at(0);

  // it('should render a react-leaflet map', () => {
  //   expect(wrapper.find(Map)).to.have.length(1);
  // });

  // it('should pass all "extra" props to react-leaflet map', () => {
  //   const { zoom, center, scrollWheelZoom } = props;
  //   expect(getMap()).to.have.props({ zoom, center, scrollWheelZoom });
  // });

  // it('should render at least one tile-layer inside react-leaflet map', () => {
  //   expect(getMap().find(TileLayer)).to.have.length.above(0);
  // });

  // it('should create a map of specified width and height', () => {
  //   expect(getMap()).to.have.style('width', '600px');
  //   expect(getMap()).to.have.style('height', '400px');
  // });

  // it('should pass children to react-leaflet map', () => {
  //   expect(getMap().children().find('div')).to.have.length(1);
  //   expect(getMap().children().find('span')).to.have.length(1);
  // });
});
