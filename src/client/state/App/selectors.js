import { createSelector } from 'reselect';

/**
 * Direct selector to the app  state
 */
const selectApp = () => state => state.app;

/**
 * Other specific selectors
 */

/**
 * Default selector used by App
 */

const makeSelectApp = () => createSelector(
  selectApp(),
  substate => substate,
);

export default makeSelectApp;
export {
  selectApp,
};
