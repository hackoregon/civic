import { NAME } from './constants';

/**
 * Direct selector to the definition state
 */
const root = state => state[NAME] || {};

/**
 * Other specific selectors from substate
 */
const combineAdultChild = data => data.reduce((acc, cur) => {
  const multiple = acc.filter(element => (
    element.year === cur.year && element.name === cur.sheltertype
  ));

  multiple.length 
  ? acc[acc.indexOf(multiple[0])].value += cur.count
  : acc.push({
    name: cur.sheltertype,
    value: cur.count,
    year: cur.year,
  });

  return acc;
}, []);

export const shelterType = state => combineAdultChild(
  root(state).shelterTypeData || [],
);

