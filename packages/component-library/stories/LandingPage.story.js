import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { LandingPage } from '../src';

const displayName = LandingPage.displayName || 'LandingPage';
const title = 'Simple usage';
const description = `
  A landing page.`;

const demoCode = () => (
  <LandingPage>Hello LandingPage</LandingPage>
);

export default () => storiesOf('CIVIC Platform Components/Landing Page', module)
  .addDecorator(checkA11y)
  .add(
    title,
    demoCode
  );
