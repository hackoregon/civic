export const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null,
};

const CALL_START = 'RENT/START';
const CALL_FAIL = 'RENT/FAIL';
const CALL_SUCCESS = 'RENT/SUCCESS';

export const actionTypes = {
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS,
};
