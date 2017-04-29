import React, { Component } from 'react';
import { connect } from 'react-redux'
import SELECTOR_META from './selectorMeta';

class ControlBox extends Component {
  // constructor() {
  //   super();
  //   this.buildControlList.bind(this);
  // }

  buildControlList (controls, mapType) {
      // console.log('mappanel', features)
      // console.log('canon', features.canonical_daterange)
      const printOrder = ['startDate', 'endDate', 'address', 'distance', 'days', 'sourceName']
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
      
      return (
        <p>
          {returnValues}
        </p>
      )

  }

  render() {
    return (
      <div>
        Settings
        {this.buildControlList(this.props.controls, this.props.mapType)}      
      </div>
    );
  }
}

export default ControlBox;
