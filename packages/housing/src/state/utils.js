export const actionEmitter = type => payload => {
  const ret = { type };
  if (payload != null) {
    ret.payload = payload;
  }
  return ret;
};

/*
 * Function that makes a api reducer for managing api data given intiial state and
 * action types. Put here becuase this pattern will be reused in at least 3 places
 */
export const apiReducer = ({
  INITIAL_STATE,
  CALL_START,
  CALL_FAIL,
  CALL_SUCCESS
}) => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CALL_START:
      return {
        ...state,
        pending: true,
        error: null
      };
    case CALL_FAIL:
      return {
        pending: false,
        error: action.payload,
        data: null
      };
    case CALL_SUCCESS:
      return {
        pending: false,
        error: null,
        data: action.payload
      };
    default:
      return state;
  }
};
