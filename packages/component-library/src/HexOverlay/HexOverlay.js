/* global window,document */
import React, { Component } from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './hex-deckgl-overlay.js';
import PropTypes from 'prop-types';
import {csv as requestCsv} from 'd3-request';
import { css } from 'emotion';
// import './mapbox-gl.css'; // optional


const HexOverlay = (props) => {
  const { data, viewport, mapboxStyle, mapboxToken } = props;

  const mapWrapper = css`
  margin: auto;
  max-width: 900px;
  `;
  const colorScale = r => [r * 255, 140, 200 * (1 - r)];

  return (
    <div className={mapWrapper}>
      <MapGL
        {...viewport}
        className={'MapGL'}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={mapboxToken}
      >
        <DeckGLOverlay viewport={viewport} data={data || []}
        colorScale={colorScale}
        />
      </MapGL>
    </div>
  );
}

// if we use these styles it doesn't look as good as if we just hard code the one above, TODO: fix that
HexOverlay.propTypes = {
  mapboxStyle: PropTypes.string,
  mapboxToken: PropTypes.string.isRequired,
};

HexOverlay.defaultProps = {
  mapboxStyle: "mapbox://styles/mapbox/dark-v9",
};

export default HexOverlay;