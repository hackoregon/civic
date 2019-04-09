import React from 'react';
import { PieChart } from '@hackoregon/component-library';
import { budgetPieDataArray } from './budgetPieData';

const BudgetPie = () => (
    <PieChart width={500} height={400} data={budgetPieDataArray} dataLabel='name' dataValue='value' />
  );

export default BudgetPie;
