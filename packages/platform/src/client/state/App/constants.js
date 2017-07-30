/*
 *
 * App constants
 *
 */

export const NAME = 'app';
export const NON_ACTION_TYPE = '30px';

export const INITIAL_STATE = {
  data: null,
  error: null,
};

const DEFAULT_ACTION = 'CIVIC-PLATFORM/APP/DEFAULT_ACTION';
const GET_DATA = 'CIVIC-PLATFORM/APP/DATA/GET';
const GET_DATA_SUCCESS = 'CIVIC-PLATFORM/APP/DATA/GET/SUCCESS';
const GET_DATA_FAILURE = 'CIVIC-PLATFORM/APP/DATA/GET/FAILURE';

export const actionTypes = {
  DEFAULT_ACTION,
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
};
