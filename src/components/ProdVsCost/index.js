import React from 'react';
import LineChart from '../LineChart';

import eastData from './east.json';
import northData from './north.json';
import allData from './all.json';

const colors = [undefined, '#a7a7a7', '#99b2ce', '#3b5d85', '#ab070a', '#e3070a'];

const stackUnitGrowth = json => json.map((year) => {
  // eslint-disable-next-line no-param-reassign
  year['Multifamily Unit Growth (Stacked)'] += year['Single Family Unit Growth (Stacked)'];
  return year;
});

const ProdVsCost = () =>
  <div>
    <h2>Production vs Cost</h2>
    <h3>Far East Portland: Centennial, 122, Pleasant Valley, Parkrose</h3>
    <LineChart data={stackUnitGrowth(eastData)} colors={colors} />
    <h3>North and Inner Northeast: Interstate Corridor and MLK/Alberta</h3>
    <LineChart data={stackUnitGrowth(northData)} colors={colors} />
    <h3>All Portland</h3>
    <LineChart data={stackUnitGrowth(allData)} colors={colors} />
  </div>;

export default ProdVsCost;
