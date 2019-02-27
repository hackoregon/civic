import React from 'react';
import PropTypes from 'prop-types';
import { HOUSING_TEAM_PRIMARY_COLOR } from '../../utils/data-constants';

const legendStyles = {
  display: 'flex',
  marginLeft: '15px',
  marginBottom: '15px',
};

const tileContainer = {
  textAlign: 'left',
};

const secondLegendItem = {
  borderLeft: '3px solid #CCC',
  paddingLeft: '15px',
  marginLeft: '15px',
  paddingBottom: '15px',
};

const hatchWidth = 5;
const strokeWidth = 1;

const cssCrossHatch = [
  `repeating-linear-gradient(
    45deg,
    transparent,
    transparent ${hatchWidth}px,
    #FFF ${hatchWidth}px,
    #FFF ${hatchWidth + strokeWidth}px,
    transparent ${hatchWidth + strokeWidth}px,
    transparent ${hatchWidth * 2}px
  )`,
  `repeating-linear-gradient(
    -45deg,
    transparent,
    transparent ${hatchWidth}px,
    #FFF ${hatchWidth}px,
    #FFF ${hatchWidth + strokeWidth}px,
    transparent ${hatchWidth + strokeWidth}px,
    transparent ${hatchWidth * 2}px
  )`,
];

const tileStyles = {
  display: 'inline-block',
  height: '20px',
  width: '30px',
  border: '1px solid #999',
  background: '#000',
  marginBottom: '-2px',
  marginRight: '5px',
};

const youAffordableTile = { ...tileStyles, background: HOUSING_TEAM_PRIMARY_COLOR };
const youNotAffordableTile = { ...tileStyles, marginLeft: '15px', background: '#c2e0ff' };
const otherAffordableTile = { ...tileStyles, background: cssCrossHatch.join(', '), backgroundColor: '#CCC' };
const otherNotAffordableTile = { ...tileStyles, marginLeft: '15px', background: 'transparent' };

const MapLegend = ({ otherDemographicLabel }) => (
  <div style={legendStyles}>
    <div>
      <p>Your Affordability</p>
      <div style={tileContainer}>
        <span style={youAffordableTile} /> Yes
        <span style={youNotAffordableTile} /> No
      </div>
    </div>
    <div style={secondLegendItem}>
      <p>{otherDemographicLabel} Affordability</p>
      <div style={tileContainer}>
        <span style={otherAffordableTile} /> Yes
        <span style={otherNotAffordableTile} /> No
      </div>
    </div>
  </div>
);

MapLegend.propTypes = {
  otherDemographicLabel: PropTypes.string,
};

MapLegend.defaultProps = {
  otherDemographicLabel: '',
};

export default MapLegend;
