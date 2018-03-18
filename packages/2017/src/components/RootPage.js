import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Header } from '@hackoregon/component-library';

export class RootPage extends React.Component {
  render() {
    console.log('Rendering the root app');
    return (
      <div>
        <Header title="Civic" />
        <div>
          Hello?
          <Link to="/housing">Housing</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

RootPage.displayName = 'Root';

export default connect(() => {}, () => {})(RootPage);
