import React, { Component } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { GeoJSON } from 'react-leaflet';
import { MapPanel } from '../index';
// import { GeoJSON, Marker, Popup } from 'react-leaflet';

const portland = [45.52, -122.67];

class TransportMap extends Component {
  constructor() {
    super();
    this.onEachFeature = this.onEachFeature.bind(this);
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
    console.log('transport map render');
    return (
      <div>
        <LeafletMap center={portland} zoom={11} height={600} width={900}>
          {
            this.props.featureData ?
              <GeoJSON data={this.props.featureData} onEachFeature={this.onEachFeature} /> :
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

TransportMap.defaultProps = {
  children: <div />,
};

// TransportMap.propTypes = {
//   children: React.PropTypes.node,
// };

export default TransportMap

