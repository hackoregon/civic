import React, { PropTypes } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';

/**
 * This function is where we can style the geoJson based on data.
 * We have available the properties described here: http://leafletjs.com/reference.html#path-options
 */
const setPathOptions = ({ affordableYou, affordableOther }) => ({
  opacity: affordableOther ? '1' : '0',
  fillOpacity: 0.7,
  fillColor: affordableYou ? '#386598' : '#CFE7F9',
  color: 'black',
});

const Neighborhood = ({ data }) => (
  <GeoJSON data={data} {...setPathOptions(data)} >
    <Popup><div>{data.name}</div></Popup>
  </GeoJSON>
);

Neighborhood.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Neighborhood;
