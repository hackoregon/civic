/* eslint-disable no-console */
import React from 'react';
import { css } from 'emotion';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text, number, object, array,
} from '@storybook/addon-knobs';
import { PackageSelectorBox, Icon, Logo } from '../src';


const packageSelectorList = array('Data', [
{ title: 'Schools', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
{ title: 'Crimes', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
{ title: 'Demolitions', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
{ title: 'TriMet Ridership', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
{ title: 'Collisions', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
{ title: 'Mega-Quake', description: 'A short description of the sorts of things you can explore with this package. Data Sources?' },
]);


const PackageSelectorDemo = () => (
  <div
    className={css(`
  @media (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
  }
`)}
  >
    {packageSelectorList.map(selector => (
      <div
        className={css(`
        @media (min-width: 600px) {
          width: 33%;
        }
      `)}
      >
        <PackageSelectorBox title={selector.title} description={selector.description} />
      </div>
    )
  )}
  </div>
);

const PackageSelectorCollection = () => (
  <div>
    <div>Select a Data Collection</div>
    <PackageSelectorDemo />
  </div>
);

export default () => storiesOf('CIVIC Platform Components/Package Selector Box', module)
.add(
  'Basic List of selection Options',
  // 'This is a basic list of selection options for the
  // package Selector with just a title and descriptions')(
  PackageSelectorDemo)
.add('Collection of packages', PackageSelectorCollection);
