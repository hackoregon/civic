import React, { PropTypes, Component } from 'react';
import MapGL from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';
import DeckGLOverlay from './../../deckgl-overlay.js';
// import './test.geojson'

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

const colorScale = r => [r * 255, 140, 200 * (1 - r)];

// Source data GeoJSON (currently only Vancouver BC)
const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

export default class MapOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        ...DeckGLOverlay.defaultViewport,
        width: window.innerWidth > 900 ? 898 : window.innerWidth,
        height: 400,
      // portland
        // longitude: -122.6765,
        // latitude: 45.5231,
        zoom: 13,
        minZoom: 1,
        maxZoom: 20,
        pitch: 0,
        bearing: 0,
      },
      data: null
    };

    fetch(DATA_URL)
      .then(resp => resp.json())
      .then(data => this.setState({data}));
    this.onViewportChange = this.onViewportChange.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport},
    });
  }

  resize() {
    this.onViewportChange({
      width: window.innerWidth > 900 ? 898 : window.innerWidth,
      height: 450,
    });
  }

  render() {
    // const { viewport } = this.state;
    const {viewport, data} = this.state;
    const { mapboxStyle, mapboxToken } = this.props;

    return (
      <div className={mapWrapper}>
        <MapGL
          className={'MapGL'}
          {...viewport}
             mapStyle={mapboxStyle}
             onViewportChange={this.onViewportChange.bind(this)}
             mapboxApiAccessToken={mapboxToken}
             onViewportChange={ viewport => this.onViewportChange(viewport)}
        >
          <DeckGLOverlay
            viewport={viewport}
            data={data}
            colorScale={colorScale} />
        </MapGL>
      </div>
    );
  };
};

MapOverlay.propTypes = {
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string.isRequired,
};

MapOverlay.defaultProps = {
  mapboxStyle: "mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq",
};
