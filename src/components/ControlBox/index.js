import React, { Component } from 'react';
import Button from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData, renderFmaPanelId, getFmaPanelId } from '../../state';
import { MapPanel } from '../index';

const portland = [45.52, -122.67];

class ControlBox extends Component {

  render() {
    return (
      <div>
        Control Buttons Here
      </div>
    );
  }
}

export default ControlBox;