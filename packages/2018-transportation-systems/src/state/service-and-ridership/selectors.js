import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getServiceAndRidershipRequest = createSelector(
  rootState,
  ({ serviceAndRidership }) => serviceAndRidership,
);

export const getServiceAndRidershipData = createSelector(
  getServiceAndRidershipRequest,
  ({ data }) => ((data || {}).data) && data.data.map(yearObj => ({
    type: 'Weekday',
    year: yearObj.year,
    ons: yearObj.weekday_sum_ons / 5 / 52,
  }
  )).concat(data.data.map(yearObj => ({
    type: 'Saturday',
    year: yearObj.year,
    ons: yearObj.saturday_sum_ons / 52,
  }
  ))).concat(data.data.map(yearObj => ({
    type: 'Sunday',
    year: yearObj.year,
    ons: yearObj.sunday_sum_ons / 52,
  }
  )))
);

export const isServiceAndRidershipPending = createSelector(
  getServiceAndRidershipRequest,
  ({ pending }) => !!pending,
);

export const catchServiceAndRidershipErrors = createSelector(
  getServiceAndRidershipRequest,
  ({ error }) => error || error,
);
