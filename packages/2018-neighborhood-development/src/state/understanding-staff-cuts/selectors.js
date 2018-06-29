import { createSelector } from 'reselect';
import { rootState } from '../selectors';

export const getUnderstandingStaffCutsRequest = createSelector(
  rootState,
  ({ understandingStaffCuts }) => understandingStaffCuts,
);

const formatData = data => data.map(obj => ({
  school: obj.school,
  students: obj.students.toFixed(1),
  predictions: obj.predictions.toFixed(1),
  variation: obj.variation.toFixed(1),
  historically_underserved_pct: (obj.historically_underserved_pct * 100).toFixed(1),
  changes_in_enrollment_pct: (obj.changes_in_enrollment_pct * 100).toFixed(1),
  free_meals_direct_cert_pct: (obj.free_meals_direct_cert_pct * 100).toFixed(1),
}));

export const getUnderstandingStaffCutsData = createSelector(
  getUnderstandingStaffCutsRequest,
  ({ data }) => data && formatData(data.results),
);

export const isUnderstandingStaffCutsPending = createSelector(
  getUnderstandingStaffCutsRequest,
  ({ pending }) => !!pending,
);

export const catchUnderstandingStaffCutsErrors = createSelector(
  getUnderstandingStaffCutsRequest,
  ({ error }) => error || error,
);
