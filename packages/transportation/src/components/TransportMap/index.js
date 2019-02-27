import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeafletMap } from '@hackoregon/component-library';
import { GeoJSON, LayerGroup } from 'react-leaflet';
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
    const properties = e.target.feature;
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

    const blurb = {
      features: 'This is a comprehensive map of all projects in the Right of Way, of any status. The map currently displays projects for the Grind and Pave group for the next several years.  Any feature can be clicked to display details for that feature.',
      conflicts: 'Projects that appear on this map are potentially close together in time and space.  The default definition of "close" is shown here, which is within 200 meters and 14 days of another project.  In addition, only projects that overlap with the start and end dates show will be displayed. Note that in many cases, the project timelines (which can be viewed below the map by clicking on a marker) are very long, which leads to many potential overlaps with other projects.',
      nearby: 'This map shows projects that are scheduled close to city hall until the end of the year.  With a little bit more development, users will be able to input an address and view nearby development.  Currently, the map shows the default definition of "nearby" for this map, which is projects within 200 meters of Portland City Hall.',
    };

    console.log('RENDERING');
    console.log('GEODATA', this.props.geoData);
    let key = 'tempkey';
    if (this.props.geoData) {
      key = `${this.props.mapType}_${this.props.geoData.features.length}` || 'tempkey';
    }
    // console.log('key', key)

    return (
      <div>
        <div style={{ textAlign: 'left', marginBottom: '1em' }}>
          {blurb[this.props.mapType]}
        </div>
        <LeafletMap center={portland} zoom={11} height={600} width={900}>
          {this.props.geoData && (
            <LayerGroup key={key}>
              <GeoJSON data={this.props.geoData} onEachFeature={this.onEachFeature} />
            </LayerGroup>
          )}
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
  (allState) => {
    const state = allState.transportation || allState;
    return { panelValues: state.app.panelValues };
  },
  dispatch => ({
    setPanelValues: properties => dispatch(setPanelValues(properties)),
  }),
)(TransportMap);

