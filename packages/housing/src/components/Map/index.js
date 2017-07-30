import React, { PropTypes } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import Neighborhood from '../Neighborhood';
import CrossHatch from '../CrossHatch';

const portlandBounds = [
  [45.654527, -122.464291],
  [45.431897, -122.836892],
];

const reactLeafletMapProps = {
  bounds: portlandBounds,
  scrollWheelZoom: false,
  url: 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
  attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
  subdomains: 'abcd',
};

const reactLeafletMapStyle = {
  width: '100%',
  height: 'auto',
};

const activePathOptions = {
  fill: false,
  stroke: true,
  color: '#ee495c',
  weight: 3,
};

const Map = ({ neighborhoods, onSelect, activeNeighborhood }) => {
  const activeDatum = neighborhoods && activeNeighborhood && neighborhoods.features.find(
    neighborhood => neighborhood.id === activeNeighborhood,
  );

  return (<div style={reactLeafletMapStyle}>
    {neighborhoods &&
      <LeafletMap {...reactLeafletMapProps}>
        {neighborhoods.features.map(neighborhood =>
          <Neighborhood
            key={neighborhood.id.toString()}
            data={neighborhood}
            onSelect={onSelect}
          />,
        )}
        {activeDatum && (
          <LayerGroup key={activeDatum.id}>
            <GeoJSON data={({ features: [activeDatum], type: 'FeatureCollection' })} {...activePathOptions} />
          </LayerGroup>
        )}
        <CrossHatch />
      </LeafletMap>
    }
  </div>);
};

Map.propTypes = {
  neighborhoods: PropTypes.object,
  onSelect: PropTypes.func,
  activeNeighborhood: PropTypes.number,
};

Map.defaultProps = {
  neighborhoods: null,
  onSelect() {},
  activeNeighborhood: 0,
};

export default Map;
