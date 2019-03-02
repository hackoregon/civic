import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@hackoregon/component-library';

const isRoot = ({ pathname }) => pathname === '/';

const menu = [
  {
    name: 'Collections',
    path: '/',
    nestedMenu: [
      { name: 'Budget', path: '/budget' },
      { name: 'Emergency Response', path: '/emergency' },
      { name: 'Housing', path: '/housing' },
      { name: 'Homelessness', path: '/homelessness' },
      { name: 'Transportation', path: '/transportation' },
    ],
  },
  {
    name: 'About',
    path: '/about',
  },
];

export const RootPage = props => (
  <div>
    <Header title="Civic" menu={menu} overlay={isRoot(props.location)} />
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(
  () => ({}),
  () => ({})
)(RootPage);
