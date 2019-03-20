import React from 'react';
import PropTypes from 'prop-types';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const MapOverlay = props => {
  const {
    children,
    data,
    viewport,
    autoHighlight,
    extruded,
    elevation,
    filled,
    getColor,
    getRadius,
    onHover,
    onLayerClick,
    opacity,
    outline,
    radiusScale,
    strokeWidth,
    tooltipInfo,
    visible,
    wireframe,
    x,
    y,
    getElevation,
    getFillColor,
    getLineColor
  } = props;

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo,
      x,
      y,
    });
  });

  const tooltipRender = tooltipInfo ? tooltip : null;

  const LIGHT_SETTINGS = {
    lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [1.0, 0.0, 2.0, 0.0],
    numberOfLights: 2,
  };

  const layer = new GeoJsonLayer({
    data,
    extruded,
    opacity,
    filled,
    onHover,
    wireframe,
    autoHighlight: true,
    fp64: true,
    id: 'geojson',
    lightSettings: LIGHT_SETTINGS,
    onClick: onLayerClick,
    pickable: true,
    stroked: false,
    getElevation: getElevation,
    getFillColor: getFillColor,
    getLineColor: getLineColor,
  });

  return (
    <div className={crosshair}>
      <DeckGL {...viewport} layers={[layer]} className="MapOverlay">
        {tooltipRender}
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

export default MapOverlay;
