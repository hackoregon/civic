import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaThunk, getFmaData, getFmaPanelData } from '../../state';

class MapPanel extends Component {
  render() {
    console.log('rendered map panel');
    const stats = this.props.fmaPanelData.stats;
    return (
      <div style={{ backgroundColor: '#DEDCDC', padding: '50px 25px 50px 25px', textAlign: 'left' }}>
        <h1>Fire Management Area {stats.fma}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="panel-column-1" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h3>Area Demographics</h3>
            <div style={{ display: 'flex' }}>
              <ul style={{ listStyleType: 'none', margin: '0 15px 0 0', padding: '0', textAlign: 'left', color: '#D5135F' }}>
                <li>{stats.fma_population_total}</li>
                <li>{stats.median_hh_income}</li>
                <li>{(stats.percent_non_white * 100).toFixed(2)}%</li>
                <li>{(stats.percent_total_lesh * 100).toFixed(2)}%</li>
                <li>{(stats.percent_below_pov * 100).toFixed(2)}%</li>
                <li>{(stats.percent_member_65plus * 100).toFixed(2)}%</li>
              </ul>
              <ul style={{ listStyleType: 'none', margin: '0', padding: '0', textAlign: 'left' }}>
                <li>population</li>
                <li>median income</li>
                <li>non-white</li>
                <li>limited english proficiency</li>
                <li>households below poverty line</li>
                <li>households with someone over 65</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div className="panel-column-2" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <h3>Area Demographics</h3>
              <div style={{ display: 'flex' }}>
                <ul style={{ listStyleType: 'none', margin: '0 15px 0 0', padding: '0', textAlign: 'left', color: '#D5135F' }}>
                  <li>{stats.total_incidents_2016}</li>
                </ul>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0', textAlign: 'left' }}>
                  <li>emergencies</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div className="panel-column-3" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <h3>Area Demographics</h3>
              <div style={{ display: 'flex' }}>
                <ul style={{ listStyleType: 'none', margin: '0 15px 0 0', padding: '0', textAlign: 'left', color: '#D5135F' }}>
                  <li>{stats.median_response_time.toFixed(2)} min</li>
                  <li>{stats.median_resp_time_med.toFixed(2)} min</li>
                  <li>{stats.median_resp_time_fire.toFixed(2)} min</li>
                </ul>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0', textAlign: 'left' }}>
                  <li>total</li>
                  <li>medical</li>
                  <li>fire</li>
                </ul>
              </div>
            </div>
          </div>
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
