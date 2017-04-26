import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaThunk, getFmaData, getFmaPanelData } from '../../state';

class MapPanel extends Component {
  render() {
    const stats = this.props.fmaPanelData.stats;
    return (
      <div>
        <h1>Fire Management Area {stats.fma}</h1>
      </div>
    );
  }
}


export default connect(
  state => ({
    fmaData: getFmaData(state),
    fmaPanelData: getFmaPanelData(state),
  }),
  dispatch => ({
    getFmaData: inputs => dispatch(getFmaThunk(inputs)),
  }),
)(MapPanel);
