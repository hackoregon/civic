import React, { PropTypes } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import Neighborhood from '../Neighborhood';

const portlandBounds = [
  [45.654527, -122.464291],
  [45.431897, -122.836892],
];

const reactLeafletMapProps = {
  bounds: portlandBounds,
  scrollWheelZoom: false,
  url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
  subdomains: 'abcd',
};

const reactLeafletMapStyle = {
  width: '100%',
  height: 'auto',
};

const Map = ({ neighborhoods }) => (
  <div style={reactLeafletMapStyle}>
    {neighborhoods &&
      <LeafletMap {...reactLeafletMapProps}>
        {neighborhoods.features.map(neighborhood =>
          <Neighborhood
            key={neighborhood.id.toString()}
            data={neighborhood}
          />,
        )}
      </LeafletMap>
    }
  </div>
);

Map.propTypes = {
  neighborhoods: PropTypes.object,
};

Map.defaultProps = {
  neighborhoods: null,
};

export default Map;
