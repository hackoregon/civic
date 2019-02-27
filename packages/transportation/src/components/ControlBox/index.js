import React, { Component } from 'react';
import SELECTOR_META from './selectorMeta';

class ControlBox extends Component {
  // constructor() {
  //   super();
  //   this.buildControlList.bind(this);
  // }

  buildControlList (controls, mapType) {
      // console.log('mappanel', features)
      // console.log('canon', features.canonical_daterange)
      const printOrder = ['address', 'distance', 'days', 'sourceName']
      console.log('controlbbox selctormeta', SELECTOR_META[mapType])
      console.log('conrolbox values', controls);
      var returnValues = [];
      const meta = SELECTOR_META[mapType]
      console.log('conrolbox meta', meta);
      // returnValues[0] = `Start Date: ${controls.startDate} <br />`;
      // returnValues[1] = `End Date: ${controls.endDate} <br />`;

      for (let key of printOrder) {
        console.log('cbox key', key)
        console.log('cbox meta.key', meta[key])
        if (controls[key]) {
          const unitText = meta[key].units || '';
          returnValues.push(`${meta[key].label}: ${controls[key]}`);
          returnValues.push(unitText)
          returnValues.push(<br/>)
        }
      }
      console.log('cbox returns', returnValues)
      const topStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      }
      const divStyle = {
        marginLeft: '3em',
        marginRight: '3em',
      }

      return (
        <div style={topStyle}>
          <div style={divStyle}>
            Start Date: {controls.startDate} <br />
            End Date: {controls.endDate}
          </div>
          <div style={divStyle}>
            {returnValues}
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
    }
    const topStyle = {
      marginBottom: '1em',
      backgroundColor: '#F3F2F3',
      padding: '1em',
    }

    return (
      <div style={topStyle}>
        <div style={headingStyle}>
          <strong>Settings</strong>
        </div>
        {this.buildControlList(this.props.controls, this.props.mapType)}
      </div>
    );
  }
}

export default ControlBox;
