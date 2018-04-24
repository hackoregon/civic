import React from 'react';
import { connect } from 'react-redux';
import Typekit from 'react-typekit';
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
    ],
  },
];

const isRoot = ({ pathname }) => pathname === '/';

export const RootPage = props => (
  <div>
    <Typekit kitId="mbf2sam" />
    <Header title="Civic" menu={menu} />
    {props.children}
  </div>
);

RootPage.displayName = 'Root';

export default connect(() => ({}), () => ({}))(RootPage);
