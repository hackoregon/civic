import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { MapPanel } from '../index';
import { isEmpty } from 'ramda';
// import { GeoJSON, Marker, Popup } from 'react-leaflet';

const portland = [45.52, -122.67];

class TransportMap extends Component {
  constructor(props) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
    // this.onEachFeature = this.onEachFeature.bind(this);
  }

  // componentWillMount() {
  //   this.props.getFmas();
  // }

  // renderPanel(fmaId) {
  //   console.log('renderPanel');
  //   return (
  //     <MapPanel id={fmaId} />
  //   );
  // }

  // openPanel(e) {
  //   const layer = e.target;
  //   const fmaId = layer.feature.properties.id;
  //   this.renderPanel(fmaId);
  // }


  // onEachFeature(feature, layer) {
  //   console.log('here')
  //   if (feature.properties && feature.properties.id) {
  //       console.log('there')
  //       layer.bindPopup(feature.properties.id);
  //   }
  // }
  
  // openPopup(feature) {
  //   console.log('transportmap here')
  //   console.log('transport map feature')
  //   console.log(feature.target.feature.properties)
  //   console.log(this)
  //   this.bindPopup(feature.target.feature.properties);
    
  // }
  

  // onEachFeature(feature, layer) {
  //   console.log('transport map feature')
  //   console.log(feature)
  //   layer.on({
  //     click: layer.bindPopup(feature.properties)
  //   });
  // }


  // onEachFeature(feature, layer) {
  //   layer.on({
  //     click: this.openPanel.bind(this),
  //   });
  // }

  // componentWillReceiveProps(np) {
  //   console.log('COMP((ONENT GOT PROPS', np);
  //   if (np.appData !== this.props.appData) {
  //    console.log('appData changed', this.props.appData);
  //    this.setState({ appData: this.props.appData });
  //   }
  // }
  renderMap(geoData)  {
     console.log('rendering with', geoData);
    return (
      <LeafletMap center={portland} zoom={11} height={600} width={900}>
        <GeoJSON data={geoData} />
      </LeafletMap>
    );
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
    return (
      <div>
        {this.renderMap(this.props.geoData)}
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

export default connect(state => ({ geoData: state.app.geoData }))(TransportMap)

