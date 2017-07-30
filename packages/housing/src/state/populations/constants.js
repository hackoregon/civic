export const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const CALL_START = 'POPULATIONS/START';
const CALL_FAIL = 'POPULATIONS/FAIL';
const CALL_SUCCESS = 'POPULATIONS/SUCCESS';

export const actionTypes = {
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS,
};
