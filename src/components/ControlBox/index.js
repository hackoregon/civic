import React, { Component } from 'react';
import Button from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData, renderFmaPanelId, getFmaPanelId } from '../../state';
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

  // renderPanel(fmaId) {
  //   console.log('renderPanel');
  //   return (
  //     <MapPanel id={fmaId} />
  //   );
  // }

  openPanel(e) {
    const layer = e.target;
    const fmaId = layer.feature.properties.fma_id;
    this.props.renderPanel(fmaId);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.openPanel.bind(this),
    });
  }

  render() {
    return (
      <div>
        <LeafletMap center={portland} zoom={11} height={600} width={900}>
          {
            this.props.fmasData ?
              <GeoJSON data={this.props.fmasData} onEachFeature={this.onEachFeature} /> :
              null
          }
        </LeafletMap>
        { this.props.fmaPanelId ?
          <MapPanel id={this.props.fmaPanelId} /> :
          null
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    fmasData: getFmasData(state),
    fmaPanelId: getFmaPanelId(state),
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
    renderPanel: fmaId => dispatch(renderFmaPanelId(fmaId)),
  }),
)(FmaMap);
