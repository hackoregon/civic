import { NAME } from './constants';

/**
 * Direct selector to the population state
 */
const root = state => state[NAME] || {};

/**
 * Other specific selectors from substate
 */
const formatForChart = data =>
    data.map(element => ({
        data: [
            { label: 'Homeless', value: element.homeless },
            { label: 'General', value: element.general },
        ],
        title: element.name,
    }));

const filterByName = (data, keys) =>
  formatForChart(data.filter(element => keys.includes(element.name)));
export const ethnicity = state =>
  filterByName(root(state).ethnicityData || [], ['White', 'People of Color']);
export const veteranStatus = state =>
  filterByName(root(state).ageGenderData || [], ['Veterans']);
export const disability = state =>
  filterByName(root(state).ageGenderData || [], ['Disability']);
export const age = state =>
  filterByName(root(state).ageGenderData || [], [
    'Under 18',
    '18 to 25',
    'Over 25',
  ]);
export const gender = state =>
  filterByName(root(state).ageGenderData || [], ['Male', 'Female']);
