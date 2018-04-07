// import { NAME } from './constants';
//
// /**
//  * Direct selector to the population state
//  */
// const root = state => state[NAME] || {};
//
// /**
//  * Other specific selectors from substate
//  */
// const filterByName = (data, keys) => data.filter(
//    element => keys.includes(element.name),
//  );
// export const ethnicity = state => filterByName(
//   root(state).ethnicityData || [],
//   ['white', 'pop_of_color'],
// );
// export const veteranStatus = state => filterByName(
//   root(state).ageGenderData || [],
//   ['veterans'],
// );
// export const disability = state => filterByName(
//   root(state).ageGenderData || [],
//   ['disablity'],
// );
// export const age = state => filterByName(
//   root(state).ageGenderData || [],
//   ['agehousesub18', 'agehouse25plus', 'agehouse18to25'],
// );
// export const gender = state => filterByName(
//   root(state).ageGenderData || [],
//   ['gendermale', 'genderfemale'],
// );
