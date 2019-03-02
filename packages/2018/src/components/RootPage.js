import React from 'react';
import { connect } from 'react-redux';

const isRoot = ({ pathname }) => pathname === '/';

export const RootPage = props => <div>{props.children}</div>;

RootPage.displayName = 'Root';

export default connect(
  () => ({}),
  () => ({})
)(RootPage);
