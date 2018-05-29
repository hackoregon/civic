import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';
import DeckGLOverlay from './map-deckgl-overlay.js';
import PropTypes from 'prop-types';

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

const colorScale = r => [r * 255, 140, 200 * (1 - r)];

class MapOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport:{
        width: window.innerWidth > 900 ? 898 : window.innerWidth,
        height: 400,
        pitch: 45,
        bearing: 0,
        latitude: 49.254,   // vancouver bc
        longitude: -123.13, // vancouver bc
        zoom: 11,
      },
      // data: null
    };
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
    const {viewport} = this.state;
    const { data, mapboxStyle, mapboxToken, opacity, filled, wireframe, extruded, elevation } = this.props;

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
