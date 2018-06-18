import React from 'react';
import { css } from 'emotion';

import { Dropdown, BaseMap, CivicSandboxMap } from '../../src';
import { kebabCase, isArray } from 'lodash';

const foundations = data => ({
  neighborhoods: {
    mapType: 'ChoroplethMap',
    id: 'polygon-layer-foundation-neighborhoods',
    pickable: true,
    data: data.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [255, 255, 255, 255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [30, 144, 255, 50],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'voter precincts': {
    mapType: 'ChoroplethMap',
    id: 'polygon-layer-foundation-voter-precincts',
    pickable: true,
    data: data.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [255, 255, 255, 255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [255, 144, 30, 50],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'zip codes': {
    mapType: 'ChoroplethMap',
    id: 'polygon-layer-foundation-zip-codes',
    pickable: true,
    data: data.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [255, 255, 255, 255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [30, 255, 255, 50],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
  'Property Value': {
    mapType: 'ChoroplethMap',
    id: 'polygon-layer-foundation-property-values',
    pickable: true,
    data: data.slide_data.features,
    opacity: 1,
    getPolygon: f => f.geometry.coordinates,
    getLineColor: f => [255, 255, 255, 255],
    getLineWidth: f => 50,
    lineWidthMinPixels: 1,
    stroked: true,
    getFillColor: f => [255, 55, 255, 50],
    filled: true,
    autoHighlight: true,
    highlightColor: [200, 200, 200, 150],
  },
});

 // Bike Lanes Color Function
const colors = [[255, 120, 1], [255, 210, 159], [255, 255, 255], [147, 207, 210], [30, 130, 135]];
const getPathColor = (f) => {
  const speedString = f.properties.avg_bike_speed.split('m')[0];
  const speed = parseFloat(speedString);
  return speed < 8 ? colors[0] :
    speed < 9 ? colors[1] :
    speed < 10 ? colors[2] :
    speed < 11 ? colors[3] : colors[4];
};

const slides = data => ({
  'bike lanes': {
    map: {
      mapType: 'PathMap',
      id: 'path-layer-bike-lanes',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: getPathColor,
      getPath: f => f.geometry.coordinates,
      getWidth: f => 75,
      widthScale: 1,
      widthMinPixels: 1,
      rounded: true,
      autoHighlight: true,
      highlightColor: [200, 200, 200, 100],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-bike-lanes-boundary',
      data: [data.slide_meta.boundary],
      opacity: 0.75,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 165, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  parks: {
    map: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-parks-slide',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [0, 255, 0, 255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [0, 255, 0, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-parks-boundary',
      data: data.slide_meta.boundary,
      opacity: 0.5,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [0, 255, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  'community gardens': {
    map: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-gardens-slide',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getPolygon: f => f.geometry.coordinates,
      getLineColor: f => [0, 255, 0, 255],
      getLineWidth: f => 50,
      lineWidthMinPixels: 1,
      stroked: true,
      getFillColor: f => [0, 255, 0, 255],
      filled: true,
      autoHighlight: true,
      highlightColor: [100, 100, 100, 255],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-gardens-slide-boundary',
      data: data.slide_meta.boundary,
      opacity: 0.5,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [0, 255, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  'bike parking': {
    map: {
      mapType: 'ScreenGridMap',
      id: 'screengrid-layer-bike-parrking',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.33,
      colorRange: [[237, 248, 251], [178, 226, 226], [102, 194, 164], [35, 139, 69]],
      cellSizePixels: 40,
      autoHighlight: true,
      highlightColor: [200, 200, 200, 150],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'points-layer-bike-parrking',
      data: data.slide_meta.boundary,
      opacity: 0.9,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 255, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  'multi-use trails': {
    map: {
      mapType: 'PathMap',
      id: 'path-layer-multi-trails',
      pickable: true,
      data: data.slide_data.features,
      opacity: 1,
      getColor: f => [255, 0, 0, 255],
      getPath: f => f.geometry.coordinates,
      getWidth: f => 50,
      widthScale: 1,
      widthMinPixels: 1,
      rounded: false,
      autoHighlight: true,
      highlightColor: [200, 200, 200, 255],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'polygon-layer-multi-trails-boundary',
      data: data.slide_meta.boundary,
      opacity: 0.5,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 0, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  sweeps: {
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-sweeps',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.33,
      getColor: f => [255, 128, 0, 255],
      getRadius: f => 75,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      parameters: { depthTest: false },
      highlightColor: [200, 200, 200, 150],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'points-layer-sweeps-boundary',
      data: data.slide_meta.boundary,
      opacity: 0.9,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [255, 128, 0, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
  'bus stops': {
    map: {
      mapType: 'ScatterPlotMap',
      id: 'scatterplot-layer-bus-stops',
      pickable: true,
      data: data.slide_data.features,
      getPosition: f => f.geometry.coordinates,
      opacity: 0.9,
      getColor: f => [138, 43, 226, 255],
      getRadius: f => 75,
      radiusScale: 1,
      radiusMinPixels: 1,
      autoHighlight: true,
      parameters: { depthTest: false },
      highlightColor: [200, 200, 200, 255],
    },
    boundary: {
      mapType: 'ChoroplethMap',
      id: 'points-layer-bus-stops-boundary',
      data: data.slide_meta.boundary,
      opacity: 0.5,
      filled: false,
      getPolygon: f => f.coordinates,
      getLineColor: f => [138, 43, 226, 255],
      getLineWidth: f => 25,
      lineWidthScale: 1,
      lineJointRounded: false,
    },
  },
});

const SandboxDrawer = ({ data, onChange, selectedSlide, selectedPackage, toggleDrawer, drawerVisible, selectedSlides }) => {
  const options = data.packages[selectedPackage].slides.map(slide => ({
    value: slide,
    label: data.slides[slide].name,
  }));

  return (
    <div style={{ flexGrow: 0 }}>
      <div onClick={toggleDrawer}>
        {drawerVisible ? 'data overlays arrow left' : 'data overlays arrow right'}
      </div>
      {drawerVisible && <div
        className={css(`
        position: absolute;
        display: block;
        height: 100vh;
        width: 20%;
        z-index: 100;
        right: 0;
        top: 60px;
      `)}
      >
        <Dropdown
          value={selectedSlide}
          options={options}
          onChange={onChange}
          multi
          simpleValue
        />
        {selectedSlides.map((slide) => {
          return (
            <div>
              <div className={css('background: gray;')}>{slide.name}</div>
              Default date data (Date granularity = null)
              Date info driven by dropdown
              <Dropdown
                value={'2018'}
                options={['2018', '2017', '2016']}
                simpleValue
                onChange={e => console.log(e)}
              />
            </div>);
        }) }
      </div>
      }
    </div>
  );
};

class Sandbox extends React.Component {
  constructor(props) {
    super(props);
    const selectedPackage = props.data.packages[this.props.selectedPackage];
    const defaultFoundation = selectedPackage ? selectedPackage.default_foundation : '';
    const defaultSlide = selectedPackage ? selectedPackage.default_slide : [];
    const foundationData = defaultFoundation && props.data.foundations[defaultFoundation];
    const slideData = defaultSlide && defaultSlide.map(slide => props.data.slides[slide]);
    this.state = {
      selectedPackage,
      selectedFoundation: defaultFoundation,
      selectedSlide: defaultSlide,
      foundationData,
      slideData,
      drawerVisible: false,
      slideJSON: [],
      foundationJSON: {
      },
    };

    this.updateFoundation = this.updateFoundation.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.fetchSlideData = this.fetchSlideData.bind(this);
    this.fetchFoundationData = this.fetchFoundationData.bind(this);
  }
  componentDidMount() {
    this.updateFoundation(this.state.selectedFoundation);
    this.updateSlide(this.state.selectedSlide);
  }
  updateFoundation = (selectedFoundation) => {
    const foundationData = this.props.data.foundations[selectedFoundation];
    this.fetchFoundationData(foundationData);
    this.setState({ selectedFoundation, foundationData });
  }
  updateSlide = (selectedSlide) => {
    const selectedSlides = isArray(selectedSlide) ? selectedSlide : selectedSlide.split(',');
    const slideData = selectedSlides.map(slide => this.props.data.slides[slide]);
    this.fetchSlideData(slideData);
    this.setState({ selectedSlide, slideData });
  }
  fetchFoundationData = (foundationData) => {
    fetch(`${foundationData.endpoint}`).then(res => res).then(res => res.json()).then(data => this.setState({ foundationJSON: data }));
  }
  fetchSlideData = (slideData) => {
    Promise.all(
      slideData.map(
        s => fetch(`${s.endpoint}`).then(
          res => res).then(res => res.json())
          .then(data => ({ [s.name]: data }))
      )
    ).then((data) => {
      this.setState({ slideJSON: data });
    });
  }
  updatePackage = (selectedPackage) => {
    const packageData = this.props.data.packages[selectedPackage];
    const selectedFoundation = packageData.default_foundation;
    const selectedSlide = packageData.default_slide;
    const foundationData = this.props.data.foundations[selectedFoundation];
    const slideData = [this.props.data.slides[selectedSlide]];
    this.setState({ selectedPackage, selectedFoundation, selectedSlide, foundationData, slideData });
  }
  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }
  formatData = (foundationData, slideData) => {
    const formatSlideData = slideData.map((slide) => {
      let data = {
        slide_meta: {}, slide_data: {} };

      if (this.state.slideJSON.length) {
        data = this.state.slideJSON.find((slideJSON) => {
          return slideJSON[slide.name];
        });
      }
      console.log(data);
      console.log(slide.name);
      const slideObj = slides(data)[slide.name];

      return [{
        data: slideObj ? slideObj.boundary : {},
      }, {
        data: slideObj ? slideObj.map : {},
      }];
    }).reduce((a, b) => a.concat(b), []);
    console.log(foundations);
    console.log(foundationData.name);
    return [{
      data: this.state.foundationJSON.slide_data ? foundations(this.state.foundationJSON)[foundationData.name] : {},
    },
      ...formatSlideData,
    ];
  }
  render() {
    console.log(this.formatData(this.state.foundationData, this.state.slideData));
    return (
      <div
        className={css(`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
    
          `)}
      >
        <div
          className={css(`
          display:flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          `)}
        >
          <div style={{ flexGrow: 1 }}>
            <Dropdown
              value={this.props.selectedPackage}
              options={Object.keys(this.props.data.packages).map(p => ({
                value: p,
                label: p,
              }))}
              onChange={this.updatePackage}
              simpleValue
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Dropdown
              value={this.state.selectedFoundation}
              options={this.props.data.packages[this.props.selectedPackage].foundations.map(foundation => ({
                value: foundation,
                label: this.props.data.foundations[foundation].name,
              }))}
              onChange={this.updateFoundation}
              simpleValue
            />
          </div>
          <SandboxDrawer
            data={this.props.data}
            selectedSlide={this.state.selectedSlide}
            onChange={this.updateSlide}
            selectedPackage={this.props.selectedPackage}
            toggleDrawer={this.toggleDrawer}
            drawerVisible={this.state.drawerVisible}
            selectedSlides={this.state.slideData}
          />

        </div>
        <div>
          <BaseMap
            mapboxToken={this.props.mapboxToken}
            mapboxStyle={'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7'}
            initialZoom={10.5}
          >
            <CivicSandboxMap
              mapLayers={this.formatData(this.state.foundationData, this.state.slideData)}
            >
              {/* <CivicSandboxTooltip /> */}
            </CivicSandboxMap>
          </BaseMap>
        </div>
      </div>
    );
  }
}

export default Sandbox;
