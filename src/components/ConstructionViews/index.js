import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectorButtons from '../SelectorButtons';
import ControlBox from '../ControlBox';
import TransportMap from '../TransportMap';
import { selectMapThunk, getFeatureData, renderFmaPanelId, getFmaPanelId } from '../../state';
import SELECTOR_META from './selectorMeta';


class ConstructionViews extends Component {
  componentDidMount() {
    this.props.selectMap('features');
  }

  render() {
    console.log('rendering Construction', this.props.appData)
    // let features = this.props.appData[`${this.props.appData.mapType}Data`];
    // console.log('cv features');
    // console.log(features);
    // console.log('cv appdata');
    // console.log(this.props.appData);
    const mapType = this.props.appData.mapType
    console.log('cv maptype', mapType)
    const geoData = this.props.appData[`${this.props.appData.mapType}Data`]
    console.log('cv geodata', geoData)
    return (
      
      <div>
        <p className="Description">
          Construction Project Exploration
        </p>
        <SelectorButtons />
        <ControlBox />
        <TransportMap geoData={geoData} mapType={this.props.appData.mapType} />
      </div>
    );
  }
}

ConstructionViews.defaultProps = {
  children: <div />,
};

ConstructionViews.propTypes = {
  children: React.PropTypes.node,
};

export default connect(
  state => ({
    // featureData: getFeatureData(state),
    appData: state.app,
    // mapType: state.app.mapType,
    fmaPanelId: getFmaPanelId(state),
  }),
  dispatch => ({
    selectMap: (mapType) => dispatch(selectMapThunk(mapType)),
    renderPanel: fmaId => dispatch(renderFmaPanelId(fmaId)),
  }),
)(ConstructionViews);
