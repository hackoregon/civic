import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapPanel extends Component {
  
  buildPanelList (features) {
      // console.log('mappanel', features)
      // console.log('canon', features.canonical_daterange)
      const dates = JSON.parse(features.canonical_daterange)
      let status = features.canonical_status || 'N/A'
      
      return (
        <p>
          Start Date: {dates.lower}<br />
          End Date: {dates.upper}<br />
          Status: {status}<br />
          Data Source: {features.source_name}<br />
        </p>
      )
      
        

  }

  render() {
    // console.log('mappanel ', this.props);
    return (
      <div>
        Project Details
        {this.buildPanelList(this.props.panelValues)}
      </div>
    );
  };
};


export default connect(
  store => ({
    panelValues: store.app.panelValues,
  }),
)(MapPanel);
