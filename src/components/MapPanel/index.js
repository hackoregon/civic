import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapPanel extends Component {
  
  buildPanelList (features) {
      // console.log('mappanel', features)
      // console.log('canon', features.canonical_daterange)
      const dates = JSON.parse(features.properties.canonical_daterange)
      let status = features.properties.canonical_status || 'N/A'
      
      const topStyle = { 
        display: 'flex', 
        flexFlow: 'row wrap',   
        justifyContent: 'center',
        paddingBottom: '.5em',
      };
      const divStyle = { 
        marginLeft: '3em',
        marginRight: '3em',
      };
      return (
        <div style={topStyle}>
          <div style={divStyle}>
            Start Date: {dates.lower}<br />
            End Date: {dates.upper}<br />
          </div>
          <div style={divStyle}>
            Status: {status}<br />
            Data Source: {features.properties.source_name}<br />
            System ID: {features.id}<br />
          </div>
        </div>
      )
      
        

  }

  render() {
    const headingStyle = { 
      display: 'flex', 
      flexFlow: 'row wrap', 
      justifyContent: 'center',
      marginBottom: '1em',
      paddingTop: '.5em',
    }
    // console.log('mappanel ', this.props);
    return (
      <div style={{backgroundColor: '#F3F2F3'}}>
        <div style={headingStyle}>
          <strong>Project Details</strong>
        </div>
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
