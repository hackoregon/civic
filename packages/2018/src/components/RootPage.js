import React from 'react';
import { connect } from 'react-redux';
import { Header } from '@hackoregon/component-library';

const menu = [
  {
    name: 'Collections',
    path: '/',
    nestedMenu: [
      { name: 'Disaster Resilience', path: '/disaster' },
      { name: 'Housing Affordability', path: '/housing' },
      { name: 'Local Elections', path: '/elections' },
      { name: 'Neighborhood Development', path: '/neighborhood' },
      { name: 'Transportation Systems', path: '/transportation' },
      { name: 'EXAMPLE Farmers Markets', path: '/farmers-markets' },
    ],
  },
  {
    name: 'Sandbox',
    path: '/sandbox',
  },
];

const isRoot = ({ pathname }) => pathname === '/';

export const RootPage = props => (
  <div>
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(() => ({}), () => ({}))(RootPage);
