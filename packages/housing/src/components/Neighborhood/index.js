import React, { PropTypes } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import { crossHatch } from '../CrossHatch';
import { HOUSING_TEAM_PRIMARY_COLOR } from '../../utils/data-constants';

const NEIGHBORHOOD_OPACITY = 0.6;

/**
 * The goal is to get affordable to appear like the primary color, but since the layers are
 * translucent, the colors need to be project to counteract that lightening effect.
 */
const NOT_AFFORDABLE_COLOR = HOUSING_TEAM_PRIMARY_COLOR;
const AFFORDABLE_COLOR = '#05478A';

/**
 * These functions are where we can style the geoJson based on data.
 * We have available the properties described here: http://leafletjs.com/reference.html#path-options
 */
const setOtherPathOptions = ({ affordableOther }) => ({
  fillOpacity: affordableOther ? 1 : 0,
  fillPattern: crossHatch,
  weight: 2,
  color: '#FFFFFF',
});

const setYouPathOptions = ({ affordableYou }) => ({
  weight: 2,
  color: '#FFFFFF',
  fillOpacity: NEIGHBORHOOD_OPACITY * (affordableYou ? 1 : 0.5),
  fillColor: affordableYou ? AFFORDABLE_COLOR : NOT_AFFORDABLE_COLOR,
});

/**
 * Neighborhood component now renders two geojson layers superimposed on one another
 * CrossHatch 'affordableOther' representation is rendered second, therefore it has precedence
 * and will receive mouse events. Click event is propagated up
 */
const Neighborhood = ({ data, onSelect }) => (
  <LayerGroup>
    <GeoJSON data={data} {...setYouPathOptions(data)} />
    <GeoJSON data={data} {...setOtherPathOptions(data)} onClick={e => onSelect(e.layer.feature)} />
  </LayerGroup>
);

Neighborhood.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};

Neighborhood.defaultProps = {
  onSelect() {},
};

export default Neighborhood;
