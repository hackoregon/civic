import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import { css } from 'emotion';
import './mapbox-gl.css';
import PropTypes from 'prop-types';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const MapOverlay = (props) => {
  const { viewport, data, mapboxStyle, mapboxToken, opacity, filled, wireframe, extruded, elevation, onLayerClick, getPosition } = props;

  const mapWrapper = css`
    margin: auto;
    max-width: 900px;
  `;

  const colorScale = r => [r * 255, 140, 200 * (1 - r)];

  const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

  const LIGHT_SETTINGS = {
      lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
      ambientRatio: 0.2,
      diffuseRatio: 0.5,
      specularRatio: 0.3,
      lightsStrength: [1.0, 0.0, 2.0, 0.0],
      numberOfLights: 2
    };

  const layer = new GeoJsonLayer({
    id: 'geojson',
    data,
    opacity: opacity,
    stroked: false,
    filled: filled,
    extruded: extruded,
    wireframe: wireframe,
    fp64: true,
    getElevation: f => Math.sqrt(f.properties.Shape_Length) * elevation,
    getFillColor: f => colorScale(f.properties.Shape_Length),
    getLineColor: f => [255, 255, 255],
    lightSettings: LIGHT_SETTINGS,
    pickable: true,
    autoHighlight: true,
    getPosition: getPosition,
    onClick: onLayerClick,
  });

  return (
    <DeckGL {...viewport} layers={[layer]} className={'MapOverlay'} />
  );
};

MapOverlay.propTypes = {
  mapboxStyle: PropTypes.string,
  opacity: PropTypes.number,
  elevation: PropTypes.number,
  filled: PropTypes.bool,
  extruded: PropTypes.bool,
};

MapOverlay.defaultProps = {
  mapboxStyle: "mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq",
};

export default MapOverlay;
