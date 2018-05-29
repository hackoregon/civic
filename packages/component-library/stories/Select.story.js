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
import { SelectMenu } from '../src';

const options = [
  { value: '101', label: 'Sweeps' },
  { value: '102', label: 'Bus Stops' },
  { value: '106', label: 'Bike Lanes' },
];

const SelectMenuDemo = () => (
  <SelectMenu options={options} />
);

// const PackageSelectorModal = () => (
//   <div
//     className={css(`
//       position: fixed;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       width: 100%;

//       `)}
//   >
//     <div
//       className={css(`
//       display:flex;
//       align-items: center;
//       justify-content: space-between;
//       `)}
//     >
//       <div><Logo /></div>
//       <div>Select a Data Collection</div>
//       <div className={css('color: rgb(237, 73, 91);font-size: 1.2rem;')}><Icon className="fa fa-times" /></div>
//     </div>
//     <PackageSelectorDemo />
//   </div>
// );

export default () => storiesOf('Select Menu', module)
.add(
  'Basic select menu',
  // 'This is a basic select menu, with a few example options')(
  SelectMenuDemo);
