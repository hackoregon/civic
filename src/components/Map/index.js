import React, { PropTypes } from 'react';
import { Map as ReactLeafletMap, TileLayer } from 'react-leaflet';
import Neighborhood from '../Neighborhood';

const portlandBounds = [
  [45.654527, -122.464291],
  [45.431897, -122.836892],
];

const reactLeafletMapProps = {
  bounds: portlandBounds,
  scrollWheelZoom: false,
};

const reactLeafletMapStyle = {
  width: '100%',
  height: '70vh',
};

const Map = ({ neighborhoods }) => (
  <ReactLeafletMap {...reactLeafletMapProps} style={reactLeafletMapStyle}>
    <TileLayer
      url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>"
      subdomains="abcd"
      maxZoom={19}
    />
    {neighborhoods && neighborhoods.features.map(neighborhood =>
      <Neighborhood
        key={neighborhood.id.toString()}
        data={neighborhood}
      />,
    )}
  </ReactLeafletMap>
);

Map.propTypes = {
  neighborhoods: PropTypes.object,
};

Map.defaultProps = {
  neighborhoods: null,
};

export default Map;
