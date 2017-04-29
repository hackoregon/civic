import '!style-loader!css-loader!@hackoregon/component-library/assets/leaflet.css';
import React, { Component } from 'react';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { LayerGroup, GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { isEmpty } from 'ramda';
import { getFmasThunk, getFmasData, renderFmaPanelProperties, getFmaPanelData, getFmasFeatures } from '../../state';
import { MapPanel } from '../index';

const portland = [45.52, -122.67];


const Fma = ({ data, onClick, onEachFeature }) => (
  <LayerGroup>
    <GeoJSON style={{ color: '#EE495C', fillColor: '#EE495C', fillOpacity: '0' }} data={data} onClick={onClick} onEachFeature={onEachFeature} />
  </LayerGroup>
);

// Neighborhood.propTypes = {
//   data: PropTypes.object.isRequired,
//   onClick: PropTypes.func.isRequired,
// };
//
// Neighborhood.defaultProps = {
//   onClick: () => {},
// };

// export default Neighborhood;


class FmaMap extends Component {
  constructor() {
    super();
    // this.fmaId = 0;
    this.onEachFeature = this.onEachFeature.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    this.clearOpacity = this.clearOpacity.bind(this);
  }

  componentWillMount() {
    this.props.getFmas();
  }
  //
  openPanel(e) {
    const idKey = e.target._leaflet_id - 1;
    const layer = e.target._layers[idKey];
    console.log(layer);

    // this.props.renderPanel(layer.feature.properties.fma_id);
  }

  setOpacity(e) {
    const layer = e.target;
    // console.log(layer);
    layer.setStyle({ color: '#EE495C', fillColor: '#EE495C', fillOpacity: '1' });
  }
  clearOpacity(e) {
    const layer = e.target;
    layer.setStyle({ color: '#EE495C', fillColor: '#EE495C', fillOpacity: '0' });
  }

  onEachFeature(feature, layer) {
    console.log(feature.properties.fma_id);
    layer.on({
      mouseover: this.setOpacity,
      mouseout: this.clearOpacity,
    });
  }


  render() {
    // console.log('fma data', this.props.fmaData);
    // console.log('id', this.props.fmaId);
    // console.log('this.props.features',  this.props.features);
    console.log(this.props.fmasData.features.length);
    return (
      <div>
        <LeafletMap url="http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png" center={portland} zoom={11} height={600} width={900}>
          {
            !isEmpty(this.props.fmasData) &&
            this.props.fmasData.features.map((feature) => {
              const fmaId = feature.properties.fma_id;
              console.log(`fmap-${fmaId}`);
              return (
                <Fma
                  key={`fmap-${fmaId}`} data={feature} onClick={(e, v, d) => {
                    console.log(e);
                    this.props.renderPanel(e.layer.feature.properties);
                  }} onEachFeature={this.onEachFeature}
                />
              );
            })
          }
        </LeafletMap>
        {this.props.fmaPanelData && <MapPanel />}
      </div>
    );
  }
}

export default connect(
  state => ({
    fmasData: getFmasData(state),
    fmaPanelData: getFmaPanelData(state),
    features: getFmasFeatures(state),
    // fmaId: getFmasData(state).fma_id,
    // property: getFmasFeaturesByPropertiesId(state),
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
    renderPanel: fmaProperties => dispatch(renderFmaPanelProperties(fmaProperties)),
  }),
)(FmaMap);
