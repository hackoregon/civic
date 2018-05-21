import React, { PropTypes, Component } from 'react';
import MapGL from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';
import DeckGLOverlay from './map-deckgl-overlay.js';
// TODO: use  Use the latest available v15.* prop-types package
// import PropTypes from 'prop-types'

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

const colorScale = r => [r * 255, 140, 200 * (1 - r)];

const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

class MapOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        ...DeckGLOverlay.defaultViewport,
        width: window.innerWidth > 900 ? 898 : window.innerWidth,
        height: 400,
        pitch: 45,
        bearing: 0,
        latitude: 49.254,   // vancouver bc
        longitude: -123.13, // vancouver bc
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
    const {viewport, data} = this.state;
    const { mapboxStyle, mapboxToken, opacity, filled, wireframe, extruded, elevation } = this.props;

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
            colorScale={colorScale}
            opacity={opacity}
            filled={filled}
            wireframe={wireframe}
            extruded={extruded}
            elevation={elevation}
          />
        </MapGL>
      </div>
    );
  };
};

MapOverlay.propTypes = {
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  elevation: PropTypes.number,
  filled: PropTypes.bool,
  extruded: PropTypes.bool,
};

MapOverlay.defaultProps = {
  mapboxStyle: "mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq",
};

export default MapOverlay
