export const INITIAL_STATE = {
  pending: false,
  data: null,
  error: null
};

const CALL_START = "AFFORDABILITY/START";
const CALL_FAIL = "AFFORDABILITY/FAIL";
const CALL_SUCCESS = "AFFORDABILITY/SUCCESS";

export const actionTypes = {
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS
};
