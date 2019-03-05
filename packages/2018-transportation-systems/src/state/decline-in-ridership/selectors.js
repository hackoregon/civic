import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getRidershipOverTimeRequest = createSelector(
  rootState,
  ({ ridershipOverTime }) => ridershipOverTime
);

export const getRidershipOverTimeData = createSelector(
  getRidershipOverTimeRequest,
  ({ data }) =>
    (data || {}).data &&
    data.data
      .map(yearObj => ({
        type: 'Weekday',
        year: yearObj.year,
        ons: yearObj.weekday_sum_ons,
      }))
      .concat(
        data.data.map(yearObj => ({
          type: 'Saturday',
          year: yearObj.year,
          ons: yearObj.saturday_sum_ons,
        }))
      )
      .concat(
        data.data.map(yearObj => ({
          type: 'Sunday',
          year: yearObj.year,
          ons: yearObj.sunday_sum_ons,
        }))
      )
);

export const isRidershipOverTimePending = createSelector(
  getRidershipOverTimeRequest,
  ({ pending }) => !!pending
);

export const catchRidershipOverTimeErrors = createSelector(
  getRidershipOverTimeRequest,
  ({ error }) => error || error
);
