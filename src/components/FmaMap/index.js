import React, { Component } from 'react';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData } from '../../state';

const portland = [45.52, -122.67];

class FmaMap extends Component {
  componentWillMount() {
    this.props.getFmas();
  }
  componentDidUpdate() {
    console.log('fmasFeatures', this.props.fmasData.features);
  }
  render() {
    return (
      <StoryCard title="Have a Map" collectionId="emergency-response" cardId="er-map">
        <p className="Description">
            Here&apos;s a map!
        </p>
        <LeafletMap center={portland} zoom={11} height={600} width={900}>
          <Marker position={portland}>
            <Popup>
              <span>A pretty CSS3 popup.<br />Easily customizable.</span>
            </Popup>
          </Marker>
        </LeafletMap>
      </StoryCard>
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
