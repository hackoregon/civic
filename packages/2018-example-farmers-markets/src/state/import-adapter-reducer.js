// Factory for creating a reducer to match the file import pattern
const importAdapterReducer = ({
  INITIAL_STATE,
  IMPORT_START,
  IMPORT_SUCCESS
}) => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMPORT_START:
      return {
        ...state,
        pending: true
      };
    case IMPORT_SUCCESS:
      return {
        pending: false,
        data: action.payload
      };
    default:
      return state;
  }
};

export default importAdapterReducer;
