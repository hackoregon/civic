import React, { Component } from 'react';
import Button from '@hackoregon/component-library/lib/Button/Button';
import { connect } from 'react-redux';
import { selectMapThunk } from '../../state';

class SelectorButtons extends Component {

  render() {
    console.log('button props')
    console.log(this.props)
    return (
      <div>
        <Button onClick={() => this.props.selectMap('features')}>
          Projects by Source
        </Button>
        <Button onClick={() => this.props.selectMap('conflicts')}>
          Project Conflicts
        </Button>
        <Button onClick={() => this.props.selectMap('nearby')}>
          Nearby Projects
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectMap: (mapTypes) => dispatch(selectMapThunk(mapTypes)) 
  }
}

export default connect(null, mapDispatchToProps)(SelectorButtons);

