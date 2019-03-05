import React, { Component } from 'react';
import { LeafletMap } from '@hackoregon/component-library';
import { LayerGroup, GeoJSON } from 'react-leaflet';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import {
  getFmasThunk,
  getFmasData,
  renderFmaPanelProperties,
  getFmaPanelData,
} from '../../state';
import MapPanel from '../MapPanel/index';

const portland = [45.52, -122.67];

class FmaMap extends Component {
  constructor() {
    super();
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentWillMount() {
    this.props.getFmas();
  }

  openPanel(e) {
    const layer = e.target;
    const fmaProperties = layer.feature.properties;
    this.props.renderPanel(fmaProperties);
  }

  setOpacity(e) {
    const layer = e.target;
    layer.setStyle({
      color: '#EE495C',
      fillColor: '#EE495C',
      fillOpacity: '1',
    });
  }

  clearOpacity(e) {
    const layer = e.target;
    layer.setStyle({
      color: '#EE495C',
      fillColor: '#EE495C',
      fillOpacity: '0.15',
    });
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.openPanel.bind(this),
      mouseover: this.setOpacity.bind(this),
      mouseout: this.clearOpacity.bind(this),
    });
  }

  render() {
    return (
      <div>
        {!isEmpty(this.props.fmasData) ? (
          <LeafletMap
            center={portland}
            zoom={11}
            height={'75vh'}
            width={'100%'}
          >
            <LayerGroup>
              <GeoJSON
                style={{
                  color: '#EE495C',
                  fillColor: '#EE495C',
                  fillOpacity: '0.15',
                }}
                data={this.props.fmasData}
                onEachFeature={this.onEachFeature}
              />
            </LayerGroup>
          </LeafletMap>
        ) : (
          <h1>Waiting for map to load...</h1>
        )}

        {this.props.fmaPanelData && !isEmpty(this.props.fmaPanelData) ? (
          <MapPanel />
        ) : (
          <h6>Click on an FMA to view some statistics</h6>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    fmasData: getFmasData(state.emergency || state),
    fmaPanelData: getFmaPanelData(state.emergency || state),
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
    renderPanel: fmaProperties =>
      dispatch(renderFmaPanelProperties(fmaProperties)),
  })
)(FmaMap);
