import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaPanelId, getFmaThunk, getFmaData } from '../../state';

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
    const panelId = this.props.fmaPanelId;
    let fmaStats;
    if (this.props.fmaData.stats) {
      fmaStats = this.props.fmaData.stats.map((item, idx) => (
        <li key={idx}>{item}</li>
      ));
    }

    return (
      <div>
        <h1>{panelId}</h1>
        <ul>
          {fmaStats}
        </ul>
      </div>
    );
  }
}


export default connect(
  state => ({
    fmaPanelId: getFmaPanelId(state),
    fmaData: getFmaData(state),
  }),
  dispatch => ({
    getFmaData: inputs => dispatch(getFmaThunk(inputs)),
  }),
)(MapPanel);
