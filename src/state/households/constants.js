export const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const CALL_START = 'HOUSEHOLDS/START';
const CALL_FAIL = 'HOUSEHOLDS/FAIL';
const CALL_SUCCESS = 'HOUSEHOLDS/SUCCESS';

export const actionTypes = {
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS,
};
