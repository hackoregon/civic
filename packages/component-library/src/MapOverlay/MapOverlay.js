import React from "react";
import PropTypes from "prop-types";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { css } from "emotion";

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
    filled,
    getRadius,
    onHover,
    onLayerClick,
    opacity,
    strokeWidth,
    tooltipInfo,
    x,
    y,
    visible,
    wireframe,
    pickable,
    getElevation,
    getFillColor,
    getLineColor,
    getLineWidth,
    stroked
  } = props;

  const tooltip = React.Children.map(children, child => {
    return React.cloneElement(child, {
      tooltipInfo,
      x,
      y
    });
  });

  const tooltipRender = tooltipInfo ? tooltip : null;

  const LIGHT_SETTINGS = {
    lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [1.0, 0.0, 2.0, 0.0],
    numberOfLights: 2
  };

  const layer = new GeoJsonLayer({
    id,
    data,
    visible,
    autoHighlight,
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
    fp64: true,
    lightSettings: LIGHT_SETTINGS,
    onClick: onLayerClick,
    getElevation,
    getFillColor,
    getLineColor
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
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  viewport: PropTypes.shape({}),
  autoHighlight: PropTypes.bool,
  extruded: PropTypes.bool,
  elevation: PropTypes.number,
  filled: PropTypes.bool,
  getColor: PropTypes.func,
  getRadius: PropTypes.func,
  onHover: PropTypes.func,
  onLayerClick: PropTypes.func,
  opacity: PropTypes.number,
  strokeWidth: PropTypes.number,
  tooltipInfo: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  visible: PropTypes.bool,
  wireframe: PropTypes.bool,
  pickable: PropTypes.bool,
  getElevation: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  getFillColor: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.func
  ]),
  getLineColor: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  getLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  stroked: PropTypes.bool
};

MapOverlay.defaultProps = {
  id: "geojson",
  stroked: false,
  strokeWidth: 1,
  visible: true,
  pickable: true
};

export default MapOverlay;
