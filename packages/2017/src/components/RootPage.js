import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@hackoregon/component-library';

export const RootPage = props => (
  <div>
    <Header title="Civic" />
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(() => ({}), () => ({}))(RootPage);
