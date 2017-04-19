import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaPanelId, getFmaThunk } from '../../state';

class MapPanel extends Component {
  componentDidMount() {
    const inputs = {
      id: parseInt(this.props.fmaPanelId),
    };
    console.log('from component', inputs);
    this.props.getFmaData(inputs);
  }

  componentDidUpdate() {
    const inputs = {
      id: parseInt(this.props.fmaPanelId),
    };
    // const incidents = false;
    console.log('from component', inputs);
    this.props.getFmaData(inputs);
  }

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
    getFmaData: inputs => dispatch(getFmaThunk(inputs)),
  }),
)(MapPanel);
