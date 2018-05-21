import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      longitude: -122.6765,  // portland
      latitude: 45.5231,     // portland
      zoom: 11,
      minZoom: 1,
      maxZoom: 20,
      pitch: 45,
      bearing: 0,
    };
  }

  render() {
    const {viewport, data, colorScale, opacity, filled, wireframe, extruded, elevation } = this.props;
    if (!data) {
      return null;
    }

    const layer = new GeoJsonLayer({
      id: 'geojson',
      data,
      opacity: opacity,
      stroked: false,
      filled: filled,
      extruded: extruded,
      wireframe: wireframe,
      fp64: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * elevation,
      getFillColor: f => colorScale(f.properties.growth),
      getLineColor: f => [255, 255, 255],
      lightSettings: LIGHT_SETTINGS,
      pickable: Boolean(this.props.onHover),
      onHover: this.props.onHover
    });

    return <DeckGL {...viewport} layers={[layer]} />;
  }
}
