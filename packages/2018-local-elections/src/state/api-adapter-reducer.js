// Factory for creating a reducer to match the api pattern
export default ({ INITIAL_STATE, API_START, API_SUCCESS, API_ERROR }) => (
  state = INITIAL_STATE,
  action
) => {
  // TODO: This feels a little overly clever. Is there a better way to go
  // about this?
  const type = action.type.split('/')[0];
  const subtype = action.type.split('/')[1];

  switch (subtype) {
    case API_START:
      return {
        ...state,
        [type]: {
          data: {},
          pending: true,
        },
      };
    case API_ERROR:
      return {
        ...state,
        [type]: {
          pending: false,
          data: {},
          error: action.payload,
        },
      };
    case API_SUCCESS:
      return {
        ...state,
        [type]: {
          pending: false,
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
};
