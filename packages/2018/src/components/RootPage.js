import React from 'react';
import { connect } from 'react-redux';
import Typekit from 'react-typekit';
import { Header } from '@hackoregon/component-library';

const isRoot = ({ pathname }) => pathname === '/';

export const RootPage = props => (
  <div>
    <Typekit kitId="mbf2sam" />
    <Header title="Civic" />
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(() => ({}), () => ({}))(RootPage);
