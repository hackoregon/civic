---
to: packages/<%=package%>/src/state/<%=slug%>/index.js
---
import { IMPORT_START, IMPORT_SUCCESS } from "./actions";

const INITIAL_STATE = {
  pending: false,
  data: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMPORT_START:
      return {
        ...state,
        pending: true
      };
    case IMPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
