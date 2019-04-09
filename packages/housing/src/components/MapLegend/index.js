import React from 'react';
import PropTypes from 'prop-types';
import {
  AFFORDABLE_YOU_COLOR,
  AFFORDABLE_OTHER_COLOR,
  AFFORDABLE_NEITHER_COLOR,
  AFFORDABLE_BOTH_COLOR
} from '../../utils/data-constants';

const legendStyles = {
  display: 'flex',
  marginLeft: '15px',
  marginBottom: '15px',
};

const tileContainer = {
  textAlign: 'left',
};

const tileStyles = {
  display: 'inline-block',
  height: '20px',
  width: '30px',
  border: '1px solid #999',
  background: '#000',
  marginBottom: '-2px',
  marginRight: '5px',
};

const formatColor = color => `rgb(${color.join(',')})`;

const neitherTile = {
  ...tileStyles,
  background: formatColor(AFFORDABLE_NEITHER_COLOR),
};
const bothTile = {
  ...tileStyles,
  marginLeft: '15px',
  background: formatColor(AFFORDABLE_BOTH_COLOR),
};
const youTile = {
  ...tileStyles,
  marginLeft: '15px',
  background: formatColor(AFFORDABLE_YOU_COLOR),
};
const otherTile = {
  ...tileStyles,
  marginLeft: '15px',
  background: formatColor(AFFORDABLE_OTHER_COLOR),
};

const MapLegend = ({ otherDemographicLabel }) => (
  <div style={legendStyles}>
    <div>
      <p>Who can afford it?</p>
      <div style={tileContainer}>
        <span style={neitherTile} /> Neither
        <span style={bothTile} /> Both
        <span style={youTile} /> Only You
        <span style={otherTile} /> Only {otherDemographicLabel}
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
