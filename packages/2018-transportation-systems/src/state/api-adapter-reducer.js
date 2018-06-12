// Factory for creating a reducer to match the file import pattern
const apiAdapterReducer = ({ INITIAL_STATE, API_START, API_SUCCESS }) =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case API_START:
        return {
          ...state,
          pending: true,
        };
      case API_SUCCESS:
        return {
          pending: false,
          data: action.payload,
        };
      default:
        return state;
    }
  };

export default apiAdapterReducer;
