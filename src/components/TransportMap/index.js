import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { MapPanel } from '../index';
import { isEmpty } from 'ramda';
import { setPanelValues } from '../../state';

// import { GeoJSON, Marker, Popup } from 'react-leaflet';

const portland = [45.52, -122.67];

class TransportMap extends Component {
  constructor(props) {
    super(props);

    // this.renderMap = this.renderMap.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  
  openPanel(e) {
    // console.log('e', e)
    const properties = e.target.feature.properties;
    // const fmaId = layer.feature.properties.id;
    // this.renderPanel(fmaId);
    this.props.setPanelValues(properties);
    
  }

  onEachFeature(feature, layer) {
    // console.log("trans this", this)
    layer.on({
      click: this.openPanel.bind(this),
    });
  }

  
  render() {
    // console.log('transport map render');
    // console.log(this.props.appData)
    // const mapType = this.props.appData.mapType;
    // const featureData = this.props.appData[`${mapType}Data`] || {};
    // console.log('transport featureData')
    // console.log('mapType', mapType);
    // console.log(this.state.appData)
    // console.log(this.state.appData[`${mapType}Data`]);
    console.log('RENDERING')
    console.log('GEODATA',this.props.geoData)
    let key = 'tempkey';
    if (this.props.geoData) {
      key = `${this.props.mapType}_${this.props.geoData.features.length}` || 'tempkey';
    }
    console.log('key', key)
    
    return (
      <div>
        <LeafletMap key={key} center={portland} zoom={11} height={600} width={900}>
          {this.props.geoData ?
            <GeoJSON data={this.props.geoData} onEachFeature={this.onEachFeature}/> :
            null
          }
        </LeafletMap>
        { this.props.panelValues ?
          <MapPanel panelValues={this.props.panelValues} /> :
          null
        }
          
        
      </div>
    );
  }
}

TransportMap.defaultProps = {
  appData: {},
};

TransportMap.propTypes = {
  appData: React.PropTypes.object,
};

export default connect(
  state => ({
    panelValues: state.app.panelValues,
  }),
  dispatch => ({
    setPanelValues: properties => dispatch(setPanelValues(properties)),
  }),
)(TransportMap);

