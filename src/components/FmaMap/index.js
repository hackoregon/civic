import React, { Component } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData } from '../../state';
import { MapPanel } from '../index';

const portland = [45.52, -122.67];

class FmaMap extends Component {
  constructor() {
    super();
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentWillMount() {
    this.props.getFmas();
  }

  renderPanel(fmaId) {
    console.log('renderPanel');
    return (
      <MapPanel id={fmaId} />
    );
  }

  openPanel(e) {
    const layer = e.target;
    const fmaId = layer.feature.properties.fma_id;
    // console.log('hi', layer.feature.properties.fma_id);
    this.renderPanel(fmaId);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.openPanel.bind(this),
    });
  }

  render() {
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
