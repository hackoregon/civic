import React, { Component } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData } from '../../state';

const portland = [45.52, -122.67];

class FmaMap extends Component {
  componentWillMount() {
    this.props.getFmas();
  }
  onEachFeature(feature, layer) {
    console.log('layer', layer);
    console.log('feature', feature);
    console.log(this);
    if (feature.properties && feature.properties.fireblocks) {
      layer.bindPopup(`<span>${feature.properties.fireblocks[0].gid}</span>`);
    }
  }
  render() {
    console.log('fmas', this.props.fmasData);
    return (
      <LeafletMap center={portland} zoom={11} height={600} width={900}>
        {
          this.props.fmasData ?
            <GeoJSON data={this.props.fmasData} onEachFeature={this.onEachFeature} /> :
            null
        }
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
