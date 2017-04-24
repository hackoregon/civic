import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectorButtons from '../SelectorButtons';
import ControlBox from '../ControlBox';
import TransportMap from '../TransportMap';
import { selectMapThunk, getFeatureData, renderFmaPanelId, getFmaPanelId } from '../../state';
import SELECTOR_META from './selectorMeta';


class ConstructionViews extends Component {


  componentWillMount() {
    this.props.selectMap();
  }

  render() {
    console.log('maptype ' + this.props.mapType);
    console.log('feature data');
    console.log(this.props.getFeaturesData);
    return (
      <div>
        <p className="Description">
          Construction Project Exploration
        </p>
        <SelectorButtons />
        <ControlBox />
        <TransportMap featureData={this.props.featureData} />
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
    featureData: getFeatureData(state),
    fmaPanelId: getFmaPanelId(state),
  }),
  dispatch => ({
    selectMap: (mapType) => dispatch(selectMapThunk(mapType)),
    renderPanel: fmaId => dispatch(renderFmaPanelId(fmaId)),
  }),
)(ConstructionViews);
