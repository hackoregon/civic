/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { GradientScale } from '../src';

const displayName = 'GradientScale';

export default () =>
  storiesOf(displayName, module)
    .addDecorator(withKnobs)
    .add('Basic Usage', () => {
      const data = object('Data', [
        {
          id: 178419,
          date: '2015-01-01',
          datapoint: 'Portland-Vancouver-Hillsboro, OR-WA',
          datatype: 'Moderately Burdened Owners',
          source: 'W-13',
          valuetype: 'count',
          value: '86.50000',
          rank: 79,
          total: 101,
        },
        {
          id: 178425,
          date: '2015-01-01',
          datapoint: 'Portland-Vancouver-Hillsboro, OR-WA',
          datatype: 'Moderately Burdened Owners, Share of All Households',
          source: 'W-13',
          valuetype: 'percent',
          value: '15.59000',
          rank: 79,
          total: 101,
        },
        {
          id: 178422,
          date: '2015-01-01',
          datapoint: 'Portland-Vancouver-Hillsboro, OR-WA',
          datatype: 'Moderately Burdened Renters',
          source: 'W-13',
          valuetype: 'count',
          value: '81.20000',
          rank: 79,
          total: 101,
        },
        {
          id: 178428,
          date: '2015-01-01',
          datapoint: 'Portland-Vancouver-Hillsboro, OR-WA',
          datatype: 'Moderately Burdened Renters, Share of All Households',
          source: 'W-13',
          valuetype: 'percent',
          value: '23.23000',
          rank: 58,
          total: 101,
        },
      ]);

      return <GradientScale data={data} />;
    });
