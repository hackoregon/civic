import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaPanelId, getFmaThunk } from '../../state';

class MapPanel extends Component {
  render() {
    let panelId;
    if (this.props.fmaPanelId) {
      panelId = this.props.fmaPanelId;
    }
    console.log(this.props);
    return (
      <div>
        <h1>{panelId}</h1>
      </div>
    );
  }
}


export default connect(
  state => ({
    fmaPanelId: getFmaPanelId(state),
  }),
  dispatch => ({
    getFmaData: () => dispatch(getFmaThunk()),
  }),
)(MapPanel);
