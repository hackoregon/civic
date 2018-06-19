import { createSelector } from 'reselect';
import { path } from 'ramda';

import { rootState } from '../selectors';

const getSchools = path(['data']);

export const getStudentEnrollmentTrendsRequest = createSelector(
  rootState,
  ({ studentEnrollmentTrends }) => studentEnrollmentTrends,
);

export const getStudentEnrollmentTrendsSchools = createSelector(
  getStudentEnrollmentTrendsRequest,
  ({ data }) => getSchools(data),
);

export const isStudentEnrollmentTrendsPending = createSelector(
  getStudentEnrollmentTrendsRequest,
  ({ pending }) => !!pending,
);

export const catchStudentEnrollmentTrendsErrors = createSelector(
  getStudentEnrollmentTrendsRequest,
  ({ error }) => error || error,
);