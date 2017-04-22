import React, { Component } from 'react';
import Button from '@hackoregon/component-library/lib/Button/Button';
import { connect } from 'react-redux';
import { getFmasThunk, getFmasData, renderFmaPanelId, getFmaPanelId } from '../../state';

class SelectorButtons extends Component {
  
  render() {
    return (
      <div>
        <Button>
          Nearby Projects 
        </Button>
        <Button>
          Project Conflicts
        </Button>
        <Button>
          Projects by Source
        </Button>
      </div>
    );
  }
}

export default SelectorButtons;
