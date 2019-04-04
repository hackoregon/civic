import React from 'react';
import PropTypes from 'prop-types';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { css } from 'emotion';

const crosshair = css`
  cursor: crosshair;
`;

const MapOverlay = props => {
  const {
    id,
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
    pickable,
    getElevation,
    getFillColor,
    getLineColor,
    getLineWidth,
    stroked,
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
    id,
    data,
    visible,
    extruded,
    opacity,
    filled,
    onHover,
    wireframe,
    getRadius,
    getLineWidth,
    stroked,
    pickable,
    lineWidthScale: 20,
    lineWidthMinPixels: strokeWidth,
    autoHighlight: true,
    fp64: true,
    lightSettings: LIGHT_SETTINGS,
    onClick: onLayerClick,
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
  id: PropTypes.string,
  mapboxStyle: PropTypes.string,
  opacity: PropTypes.number,
  elevation: PropTypes.number,
  filled: PropTypes.bool,
  extruded: PropTypes.bool,
  stroked: PropTypes.bool,
  strokeWidth: PropTypes.number,
  visible: PropTypes.bool,
  pickable: PropTypes.bool,
};

MapOverlay.defaultProps = {
  id: 'geojson',
  stroked: false,
  strokeWidth: 1,
  visible: true,
  pickable: true,
}

export default MapOverlay;
