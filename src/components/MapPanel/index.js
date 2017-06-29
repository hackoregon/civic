import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFmaThunk, getFmaData, getFmaPanelData, renderFmaPanelProperties } from '../../state';

class MapPanel extends Component {
  render() {
    console.log('rendered map panel');
    const stats = this.props.fmaPanelData.stats;
    return (
      <div style={{ backgroundColor: '#DEDCDC', padding: '25px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1 style={{ margin: '0' }}>Fire Management Area {stats.fma}</h1>
          <button style={{ border: '2px solid #001732', color: '#001732', width: '20px', margin: '5px 0', padding: '0', textAlign: 'center', backgroundColor: 'none', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => this.props.closePanel({})}>X</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="panel-column-1" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '33%' }}>
            <h3 style={{ marginLeft: '10px' }}>Area Demographics</h3>
            <table style={{ borderSpacing: '10px' }}>
              <tr>
                <td style={{ color: '#D5135F' }}>{stats.fma_population_total}</td>
                <td>population</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>${stats.median_hh_income}</td>
                <td>median income</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{(stats.percent_non_white * 100).toFixed(2)}%</td>
                <td>non-white</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{(stats.percent_total_lesh * 100).toFixed(2)}%</td>
                <td>limited english proficiency</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{(stats.percent_below_pov * 100).toFixed(2)}%</td>
                <td>households below poverty line</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{(stats.percent_renter_occ_hh * 100).toFixed(2)}%</td>
                <td>percent renters</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{(stats.percent_owner_occ_hh * 100).toFixed(2)}%</td>
                <td>percent owners</td>
              </tr>
            </table>
          </div>

          <div className="panel-column-2" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '33%' }}>
            <h3 style={{ marginLeft: '10px' }}>Incidents Per Month</h3>
            <table style={{ borderSpacing: '10px' }}>
              <tr>
                <td style={{ color: '#D5135F' }}>{stats.weekly_total_incs.toFixed(2)}</td>
                <td>overall</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{stats.weekly_med_incs.toFixed(2)}</td>
                <td>medical</td>
              </tr>
              <tr>
                <td style={{ color: '#D5135F' }}>{stats.weekly_fire_incs.toFixed(2)}</td>
                <td>fire</td>
              </tr>
            </table>
          </div>

          <div className="panel-column-3" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '33%' }}>
            <h3 style={{ marginLeft: '10px' }}>Median Response Times</h3>
            <div style={{ display: 'flex' }}>
              <table style={{ borderSpacing: '10px' }}>
                <tr>
                  <td style={{ color: '#D5135F' }}>{stats.median_response_time.toFixed(2)} min</td>
                  <td>overall</td>
                </tr>
                <tr>
                  <td style={{ color: '#D5135F' }}>{stats.median_resp_time_med.toFixed(2)} min</td>
                  <td>medical</td>
                </tr>
                <tr>
                  <td style={{ color: '#D5135F' }}>{stats.median_resp_time_fire.toFixed(2)} min</td>
                  <td>fire</td>
                </tr>
              </table>
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
    closePanel: fmaProperties => dispatch(renderFmaPanelProperties(fmaProperties)),
  }),
)(MapPanel);
