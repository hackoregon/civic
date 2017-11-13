import React, { Component } from 'react';
import { Button } from '@hackoregon/component-library';
import { connect } from 'react-redux';
import { selectMapThunk } from '../../state';

class SelectorButtons extends Component {

  render() {
    const styles = {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      marginBottom: '2em',
    };

    console.log('button props');
    console.log(this.props);
    return (
      <div style={styles}>
        <div style={{ padding: '10px' }}>
          <Button onClick={() => this.props.selectMap('features')}>
            Projects by Source
          </Button>
        </div>
        <div style={{ padding: '10px' }}>
          <Button onClick={() => this.props.selectMap('nearby')}>
            Nearby Projects
          </Button>
        </div>
        <div style={{ padding: '10px' }}>
          <Button onClick={() => this.props.selectMap('conflicts')}>
            Project Conflicts
          </Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMap: mapTypes => dispatch(selectMapThunk(mapTypes)),
  };
}

export default connect(null, mapDispatchToProps)(SelectorButtons);

