// Factory for creating a reducer to match the api pattern

const apiAdapterReducer = ({
  INITIAL_STATE,
  API_START,
  API_SUCCESS,
  API_ERROR
}) => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        pending: true
      };
    case API_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case API_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default apiAdapterReducer;
