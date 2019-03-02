import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getServiceAndRidershipRequest = createSelector(
  rootState,
  ({ serviceAndRidership }) => serviceAndRidership
);

const getCalculatedData = (data, divisor) =>
  data.data.map(yearObj => ({
    type: 'TriMet Ridership',
    year: yearObj.year,
    value: yearObj.total_sum_ons / divisor - 1,
  }));

const getData = data =>
  data.data.map(yearObj => ({
    type: 'TriMet Ridership',
    year: yearObj.year,
    value: yearObj.total_sum_ons,
  }));

const filterData = data => data.filter(obj => obj.year > 2001);
const getOriginYear = data => data.filter(obj => obj.year === 2002);
const getValue = data => data[0].value;
const getOrigin = data => getValue(getOriginYear(getData(data)));

export const getServiceAndRidershipData = createSelector(
  getServiceAndRidershipRequest,
  ({ data }) =>
    (data || {}).data && filterData(getCalculatedData(data, getOrigin(data)))
);

export const isServiceAndRidershipPending = createSelector(
  getServiceAndRidershipRequest,
  ({ pending }) => !!pending
);

export const catchServiceAndRidershipErrors = createSelector(
  getServiceAndRidershipRequest,
  ({ error }) => error || error
);
