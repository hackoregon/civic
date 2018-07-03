import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';

import { PDF } from '../src';

const displayName = PDF.displayName || 'PDF';
const title = 'Simple usage';

const pdfURL = 'https://www.oregonmetro.gov/sites/default/files/2018/04/19/Equitable-Housing-Initiative-Factsheet-Affordability-201804.pdf';

const demoCode = () => (
  <PDF
    url={pdfURL}
  />
);

export default () => storiesOf(displayName, module)
  .add(title, demoCode);
