/* global window,document */
import React, { Component } from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './hex-deckgl-overlay.js';
import PropTypes from 'prop-types';
import {csv as requestCsv} from 'd3-request';
import { css } from 'emotion';
// import './mapbox-gl.css'; // optional

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;
const colorScale = r => [r * 255, 140, 200 * (1 - r)];

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line

class HexOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      //   width: window.innerWidth > 900 ? 898 : window.innerWidth,
      //   height: 400,
      // // portland
      //   // longitude: -122.6765,
      //   // latitude: 45.5231,
      //   zoom: 13,
      //   minZoom: 1,
      //   maxZoom: 20,
      //   pitch: 0,
      //   bearing: 0,
      },
      data: null
    };

    requestCsv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(d => [Number(d.lng), Number(d.lat)]);
        this.setState({data});
      }
    });

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
    const { mapboxStyle, mapboxToken } = this.props;

    return (
      <div className={mapWrapper}>
        <MapGL
          {...viewport}
          className={'MapGL'}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          // mapStyle={mapboxStyle}
          // onViewportChange={this.onViewportChange.bind(this)} // or
          onViewportChange={ viewport => this.onViewportChange(viewport)}
          mapboxApiAccessToken={mapboxToken}
        >
          <DeckGLOverlay viewport={viewport} data={data || []}
                         colorScale={colorScale}
          />
        </MapGL>
      </div>
    );
  }
}

// if we use these styles it doesn't look as good as if we just hard code the one above, TODO: fix that
HexOverlay.propTypes = {
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string.isRequired,
};

HexOverlay.defaultProps = {
  mapboxStyle: "mapbox://styles/mapbox/dark-v9",
};

export default HexOverlay
