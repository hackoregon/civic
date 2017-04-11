import React, { Component } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup, GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData } from '../../state';

const portland = [45.52, -122.67];

class FmaMap extends Component {
  componentWillMount() {
    this.props.getFmas();
  }
  render() {
    return (
      <LeafletMap center={portland} zoom={11} height={600} width={900}>
        <Marker position={portland}>
          <Popup>
            <span>A pretty CSS3 popup.<br />Easily customizable.</span>
          </Popup>
        </Marker>
        <GeoJSON data={this.props.fmasData} />
      </LeafletMap>
    );
  }
}

export default connect(
  state => ({
    fmasData: getFmasData(state),
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
  }),
)(FmaMap);
