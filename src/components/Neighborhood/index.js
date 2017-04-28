import React, { PropTypes } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import { crossHatch } from '../CrossHatch';

const NEIGHBORHOOD_OPACITY = 0.7;
const NOT_AFFORDABLE_COLOR = '#A5B8C7';
const AFFORDABLE_COLOR = '#386598';

/**
 * These functions are where we can style the geoJson based on data.
 * We have available the properties described here: http://leafletjs.com/reference.html#path-options
 */
const setOtherPathOptions = ({ affordableOther }) => ({
  fillOpacity: affordableOther ? 1 : 0,
  opacity: 0,
  fillPattern: crossHatch,
});

const setYouPathOptions = ({ affordableYou }) => ({
  opacity: NEIGHBORHOOD_OPACITY,
  weight: 1,
  fillOpacity: NEIGHBORHOOD_OPACITY,
  fillColor: affordableYou ? AFFORDABLE_COLOR : NOT_AFFORDABLE_COLOR,
  color: affordableYou ? AFFORDABLE_COLOR : NOT_AFFORDABLE_COLOR,
});

/**
 * Neighborhood component now renders two geojson layers superimposed on one another
 * CrossHatch 'affordableOther' representation is rendered second, therefore it has precedence
 * and will receive mouse events. Click event is propagated up
 */
const Neighborhood = ({ data, onClick }) => (
  <LayerGroup>
    <GeoJSON data={data} {...setYouPathOptions(data)} />
    <GeoJSON data={data} {...setOtherPathOptions(data)} onClick={onClick} />
  </LayerGroup>
);

Neighborhood.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

Neighborhood.defaultProps = {
  onClick: () => {},
};

export default Neighborhood;
