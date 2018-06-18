import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const mapWrapper = css`
  margin: auto;
  max-width: 900px;
`;

const elevationScale = {min: 1, max: 50};

const MapOverlay = (props) => {
  const {
    data,
    onHover,
    children,
    viewport,
    autoHighlight,
    extruded,
    elevation,
    filled,
    getColor,
    getRadius,
    opacity,
    outline,
    pickable,
    radiusScale,
    strokeWidth,
    stroked,
    tooltipInfo,
    visible,
    wireframe,
    x,
    y,
  } = props;

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo: tooltipInfo,
      x: x,
      y: y,
    });
  });

  const tooltipRender = tooltipInfo ? tooltip : null;

  const colorScale = r => [r * 255, 140, 200 * (1 - r)];

  const LIGHT_SETTINGS = {
      lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
      ambientRatio: 0.2,
      diffuseRatio: 0.5,
      specularRatio: 0.3,
      lightsStrength: [1.0, 0.0, 2.0, 0.0],
      numberOfLights: 2
    };

  const layer = new GeoJsonLayer({
    data,
    onHover,
    extruded,
    filled,
    opacity,
    pickable,
    radiusScale,
    strokeWidth,
    stroked,
    wireframe,
    autoHighlight: true,
    fp64: true,
    id: 'geojson',
    lightSettings: LIGHT_SETTINGS,
    outline: true,
    elevationRange: [0, 3000],
    elevationScale: elevation,
    getElevation: f => Math.sqrt(f.properties.Shape_Length) * elevation/10,
    getFillColor: f => colorScale(f.properties.Shape_Length),
    getLineColor: f => [255, 255, 255],
  });

  return (
    <div className={crosshair}>
      <DeckGL {...viewport} layers={[layer]} className={'MapOverlay'} >
        { tooltipRender }
      </DeckGL>
    </div>
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
