import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaThunk, getFmaData, getFmaPanelData } from '../../state';

class MapPanel extends Component {
  render() {
    const stats = this.props.fmaPanelData.stats;
    return (
      <div>
        <h1>Fire Management Area {stats.fma}</h1>
        <div className="panel-column-1">
          <h3>Area Demographics</h3>
          <ul>
            <li><span>{stats.fma_population_total}</span> population</li>
            <li><span>{stats.median_hh_income}</span> median household income</li>
            <li><span>{stats.percent_non_white}</span> percent non-white</li>
            <li><span>{stats.percent_non_white}</span> percent non-white</li>
            <li><span>{stats.percent_total_lesh}</span> percent limited english proficiency</li>
          </ul>
        </div>
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
