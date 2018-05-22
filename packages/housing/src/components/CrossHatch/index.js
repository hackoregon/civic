import { Component } from 'react';
import PropTypes from 'prop-types';
import L, { Map } from 'leaflet';
import './leafletCrosshatch';

/**
 * Make new raw-leaflet crosshatch pattern with default settings.
 * Needs to be exported so that the object itself can be used when specifying
 * fillPattern in leaflet Path options (I guess it selects it by some internal id system?)
 */
export const crossHatch = new L.CrossHatch({
  width: 20,
  height: 20,
});

/**
 * React-Leaflet exposes the raw-leaflet map object as context to all child components
 * The entire purpose of this component is to access this object and register
 * the crossHatch pattern. Hence, it renders nothing. In order for crosshatch pattern to be
 * used, this should be included within leaflet map component
 */
class CrossHatch extends Component {
  componentWillMount() {
    crossHatch.addTo(this.context.map);
  }

  render() {
    return null;
  }
}

CrossHatch.contextTypes = {
  map: PropTypes.instanceOf(Map),
};

export default CrossHatch;
