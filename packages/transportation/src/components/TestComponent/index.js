import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAgencyData, getAgenciesThunk } from '../../state';

class TestComponent extends Component {
  componentWillMount() {
    this.props.getAgencies();
  }

  renderData() {
    console.log('agencyData', this.props.agencyData);
  }

  render() {
    return (
      <div>
        <h3>Test Component</h3>
        {this.renderData()}
      </div>
    );
  }

}

export default connect(
  state => ({
    agencyData: getAgencyData(state.transportation || state),
  }),
  dispatch => ({
    getAgencies: () => dispatch(getAgenciesThunk()),
  }),
)(TestComponent);
