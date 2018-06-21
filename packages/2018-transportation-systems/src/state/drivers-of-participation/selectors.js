import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getDriversOfParticipationRequest = createSelector(
  rootState,
  ({ driversOfParticipation }) => driversOfParticipation,
);

export const getDriversOfParticipationData = createSelector(
  getDriversOfParticipationRequest,
  ({ data }) => data && data.data.results.filter(obj => obj.year > 2012),
  // ({ data }) => ((data || {}).data) && data.data.map(yearObj => ({
  //   type: 'Weekday',
  //   year: yearObj.year,
  //   ons: yearObj.weekday_sum_ons / 5 / 52,
  // }
  // )).concat(data.data.map(yearObj => ({
  //   type: 'Saturday',
  //   year: yearObj.year,
  //   ons: yearObj.saturday_sum_ons / 52,
  // }
  // ))).concat(data.data.map(yearObj => ({
  //   type: 'Sunday',
  //   year: yearObj.year,
  //   ons: yearObj.sunday_sum_ons / 52,
  // }
  // )))
);

export const isDriversOfParticipationPending = createSelector(
  getDriversOfParticipationRequest,
  ({ pending }) => !!pending,
);

export const catchDriversOfParticipationErrors = createSelector(
  getDriversOfParticipationRequest,
  ({ error }) => error || error,
);
