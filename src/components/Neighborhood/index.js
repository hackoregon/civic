import React, { PropTypes } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import { crossHatch } from '../CrossHatch';

/**
 * This function is where we can style the geoJson based on data.
 * We have available the properties described here: http://leafletjs.com/reference.html#path-options
 */
const setOtherPathOptions = () => ({
  fillPattern: crossHatch,
});

const Neighborhood = ({ data }) => (
  <GeoJSON data={data} {...setOtherPathOptions(data)}>
    <Popup>{data.name}</Popup>
  </GeoJSON>
);

Neighborhood.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Neighborhood;
