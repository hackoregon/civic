import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@hackoregon/component-library';

const isRoot = ({ pathname }) => pathname === '/';

export const RootPage = props => (
  <div>
    <Header title="Civic" overlay={isRoot(props.location)} />
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(() => ({}), () => ({}))(RootPage);
