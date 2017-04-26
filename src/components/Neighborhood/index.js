import React, { PropTypes } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';

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
